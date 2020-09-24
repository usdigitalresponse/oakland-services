const fs = require("fs");
const csv = require("csv-parser");
const he = require("he");
const sanitizeHtml = require("sanitize-html");

function writeFile(fileName, arr, resolve) {
  fs.writeFile(fileName, JSON.stringify(arr), (err) => {
    if (err) {
      console.log("error writing to json file", err);
    } else {
      console.log(`saved as ${fileName}`);
    }
    resolve();
  });
}

function sanitizeText(str) {
  const sanitizedHtml = sanitizeHtml(str, {
    allowedTags: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "table",
      "tbody",
      "tr",
      "td",
      "ul",
      "li",
      "ol",
      "br",
    ],
    allowedAttributes: {
      a: ["href"],
    },
    allowedIframeHostnames: ["www.youtube.com"],
  });

  return he.decode(sanitizedHtml.trim());
}

async function generateCategories() {
  const categories = [];
  const featuredCategories = [];

  return new Promise((resolve) => {
    fs.createReadStream("./csv/categories.csv")
      .pipe(csv())
      .on("data", (row) => {
        if (row.text !== "" && row.text !== "text") {
          const formattedRow = {
            name: row.text,
            airtable_cat_id: row.cat_id,
            external_id: parseInt(row.cat_id),
            airtable_parent_id: row.parent_id,
            show: row.show === "" ? false : true,
          };

          if (row.alternative_text !== "") {
            formattedRow.preferred_name = row.alternative_text;
          }

          categories.push(formattedRow);
        }
      })
      .on("end", () => {
        for (let i = 0; i < categories.length; i++) {
          const currentCategory = categories[i];
          const parentIndex = categories.findIndex((c) => {
            return c.airtable_cat_id === currentCategory.airtable_parent_id;
          });

          if (parentIndex !== -1) {
            currentCategory.parent_id = parentIndex + 1;
          }

          if (currentCategory.show) {
            featuredCategories.push({ category_id: i + 1 });
          }
        }

        categories.forEach((category) => {
          delete category.airtable_parent_id;
        });

        const filename = "./formatted/categories.json";
        let completedFiles = 0;

        fs.writeFile(filename, JSON.stringify(categories), (err) => {
          if (err) {
            console.log("error writing to json file", err);
          } else {
            console.log(`saved as ${filename}`);
            completedFiles += 1;

            if (completedFiles === 2) {
              resolve();
            }
          }
        });

        const featuredFilename = "./formatted/featured_categories.json";
        fs.writeFile(
          featuredFilename,
          JSON.stringify(featuredCategories),
          (err) => {
            if (err) {
              console.log("error writing to json file", err);
            } else {
              console.log(`saved as ${featuredFilename}`);
            }
            completedFiles += 1;

            if (completedFiles === 2) {
              resolve();
            }
          }
        );
      });
  });
}

async function generateNeighborhoods() {
  const neighborhoods = [];

  return new Promise((resolve) => {
    fs.createReadStream("./csv/neighborhoods.csv")
      .pipe(csv())
      .on("data", (row) => {
        const formattedRow = { name: row.name };
        neighborhoods.push(formattedRow);
      })
      .on("end", () => {
        const filename = "./formatted/neighborhoods.json";
        writeFile(filename, neighborhoods, resolve);
      });
  });
}

async function generateSubneighborhoods() {
  const subneighborhoods = [];

  return new Promise((resolve) => {
    fs.createReadStream("./csv/subneighborhoods.csv")
      .pipe(csv())
      .on("data", (row) => {
        const formattedRow = {
          name: row.name,
          parent_id: parseInt(row.neighborhood_id),
        };
        subneighborhoods.push(formattedRow);
      })
      .on("end", () => {
        const filename = "./formatted/subneighborhoods.json";
        writeFile(filename, subneighborhoods, resolve);
      });
  });
}

async function generateCities() {
  const category_results = require("./json/category_results");
  const cities = [];
  const cityNames = [];

  category_results.forEach((row) => {
    if (
      row["city"] !== "" &&
      row["city"] !== " " &&
      row["city"] !== undefined
    ) {
      const formattedRow = { name: row.city };
      if (cityNames.indexOf(row["city"]) === -1) {
        cities.push(formattedRow);
        cityNames.push(row["city"]);
      }
    }
  });

  return new Promise((resolve) => {
    const filename = "./formatted/cities.json";
    writeFile(filename, cities, resolve);
  });
}

async function generateOrganizations() {
  const organizations = [];

  const category_results = require("./json/category_results");

  category_results.forEach((row) => {
    if (
      row["ocitiesrganization_id"] !== "" &&
      row["organization_name"] !== " "
    ) {
      const formattedRow = {
        airtable_org_id: row["organization_id"],
        name: row["organization_name"],
      };
      organizations.push(formattedRow);
    }
  });

  return new Promise((resolve) => {
    const filename = "./formatted/organizations.json";
    writeFile(filename, organizations, resolve);
  });
}

async function generateResources() {
  const organizations = require("./formatted/organizations");
  const cities = require("./formatted/cities");
  const category_results = require("./json/category_results");
  const resources = [];

  category_results.forEach((row) => {
    const organizationId = organizations.findIndex(
      (o) => parseInt(o.airtable_org_id) === parseInt(row.organization_id)
    );
    const cityId = cities.findIndex((c) => c.name === row.city);

    const formattedRow = {
      city_id: cityId === -1 ? null : cityId + 1,
      organization_id: organizationId === -1 ? null : organizationId + 1,
      airtable_resource_id: row.id,
      name: row.name,
      address: row.address,
      postal_code: row.postal_code,
      latitude: row.latitude,
      longitude: row.longitude,
      phone_number: row.phone_number,
      scraped_at: row.last_scraped,
      airtable_cat_id: row.category,
    };

    resources.push(formattedRow);
  });

  return new Promise((resolve) => {
    const filename = "./formatted/resources.json";
    writeFile(filename, resources, resolve);
  });
}

async function enhanceResources() {
  const resources = require("./formatted/resources");
  const resource_results = require("./json/resource_results");

  const enhancedResources = [];

  resources.forEach((resource) => {
    enhancedResources.push(resource);
  });

  resource_results.forEach((row) => {
    const currentResourceIndex = enhancedResources.findIndex(
      (r) => parseInt(r.airtable_resource_id) === parseInt(row.id)
    );

    if (currentResourceIndex !== -1) {
      const resourceResult = row;
      const currentResource = enhancedResources[currentResourceIndex]
        ? enhancedResources[currentResourceIndex]
        : row;

      currentResource.preferred_name = resourceResult.alternate_name;
      currentResource.description = sanitizeText(resourceResult.description);
      currentResource.email = resourceResult.email;
      currentResource.application_process = sanitizeText(
        resourceResult["application_process"]
      );
      currentResource.required_documents = sanitizeText(
        resourceResult["resource_info__required_document"]
      );
      currentResource.eligibility = sanitizeText(
        resourceResult["resource_info__eligibility_description"]
      );
      currentResource.schedule = sanitizeText(
        resourceResult["resource_info__schedule_text"]
      );
      currentResource.website = resourceResult["resource_info__url"];
      currentResource.data = row;

      enhancedResources.push(currentResource);
    }
  });

  return new Promise((resolve) => {
    const filename = "./formatted/enhanced_resources.json";
    const filename2 = "./formatted/resources.json";
    writeFile(filename, enhancedResources, resolve);
    writeFile(filename2, enhancedResources, resolve);
  });
}

async function generateCategorizations() {
  const categories = require("./formatted/categories");
  const resources = require("./formatted/resources");
  const categorizations = [];

  const category_results = require("./json/category_results");

  // Only insert uniqe resource names since some duplicates exist in csv
  category_results.forEach((row) => {
    const categoryId = categories.findIndex(
      (c) => parseInt(c.airtable_cat_id) === parseInt(row.category)
    );

    const resourceId = resources.findIndex(
      (r) => parseInt(r.airtable_resource_id) === parseInt(row.id)
    );

    if (categoryId && resourceId) {
      const formattedRow = {
        category_id: categoryId + 1,
        resource_id: resourceId + 1,
      };

      categorizations.push(formattedRow);
    }
  });

  return new Promise((resolve) => {
    const filename = "./formatted/categorizations.json";
    writeFile(filename, categorizations, resolve);
  });
}

async function generateJson() {
  await generateCategories();
  await generateNeighborhoods();
  await generateSubneighborhoods();
  await generateCities();
  await generateOrganizations();
  await generateResources();
  await enhanceResources();
  await generateCategorizations();
}

generateJson();
