const fs = require("fs");
const csv = require("csv-parser");
const he = require("he");

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
  return he.decode(
    str
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/\t/g, " ")
      .replace(/\n/g, " ")
      .trim()
  );
}

async function generateCategories() {
  const categories = [];
  const featuredCategories = [];

  return new Promise((resolve) => {
    fs.createReadStream("./raw/categories.csv")
      .pipe(csv())
      .on("data", (row) => {
        if (row.text !== "" && row.text !== "text") {
          const formattedRow = {
            name: row.text,
            airtable_cat_id: row.cat_id,
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
    fs.createReadStream("./raw/neighborhoods.csv")
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
    fs.createReadStream("./raw/subneighborhoods.csv")
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
  const filename = "./formatted/cities.json";
  return new Promise((resolve) => {
    writeFile(filename, [{ name: "Oakland" }], resolve);
  });
}

async function generateOrganizations() {
  const organizations = [];

  return new Promise((resolve) => {
    fs.createReadStream("./raw/category_resources.csv")
      .pipe(csv())
      .on("data", (row) => {
        if (row.organization_name) {
          const [existingOrganization] = organizations.filter((c) => {
            return c.name === row.organization_name;
          });
          if (!existingOrganization) {
            const formattedRow = { name: row.organization_name };
            organizations.push(formattedRow);
          }
        }
      })
      .on("end", () => {
        const filename = "./formatted/organizations.json";
        writeFile(filename, organizations, resolve);
      });
  });
}

async function generateResources() {
  const organizations = require("./formatted/organizations");

  // Only insert uniqe resource names since some duplicates exist in csv
  const resourceNames = [];
  const resources = [];

  return new Promise((resolve) => {
    fs.createReadStream("./raw/category_resources.csv")
      .pipe(csv())
      .on("data", (row) => {
        const organizationId = organizations.findIndex(
          (o) => o.name === row.organization_name
        );

        if (row.name && resourceNames.indexOf(row.name) === -1) {
          const formattedRow = {
            city_id: 1,
            organization_id: organizationId === -1 ? null : organizationId + 1,
            name: row.name,
            address: row.address,
            postal_code: row.postal_code,
            latitude: row.latitude,
            longitude: row.longitude,
            phone_number: row.phone_number,
          };

          if (row.neighborhood_id && row.neighborhood_id !== "") {
            formattedRow.neighborhood_id = parseInt(row.neighborhood_id);
          }

          resourceNames.push(row.name);
          resources.push(formattedRow);
        }
      })
      .on("end", () => {
        const filename = "./formatted/resources.json";
        fs.writeFile(filename, JSON.stringify(resources), (err) => {
          if (err) {
            console.log("error writing to json file", err);
          } else {
            console.log(`saved as ${filename}`);
          }
          resolve();
        });
      });
  });
}

async function enhanceResources() {
  const resources = require("./formatted/resources");
  const enhancedResources = [];

  return new Promise((resolve) => {
    fs.createReadStream("./raw/resources.csv")
      .pipe(csv())
      .on("data", (row) => {
        const currentResourceIndex = resources.findIndex(
          (r) => r.name === row.name
        );
        const currentResource = resources[currentResourceIndex];

        currentResource.preferred_name = row.alternate_name;
        currentResource.description = sanitizeText(row.description);
        currentResource.email = row.email;
        currentResource.application_process = sanitizeText(
          row["resource_info/application_process"]
        );
        currentResource.required_documents = sanitizeText(
          row["resource_info/required_document"]
        );
        currentResource.eligibility = sanitizeText(
          row["resource_info/eligibility_description"]
        );
        currentResource.schedule = sanitizeText(
          row["resource_info/schedule_text"]
        );
        currentResource.website = row["resource_info/url"];

        enhancedResources.push(currentResource);
      })
      .on("end", () => {
        const filename = "./formatted/resources.json";
        fs.writeFile(filename, JSON.stringify(enhancedResources), (err) => {
          if (err) {
            console.log("error writing to json file", err);
          } else {
            console.log(`saved as ${filename}`);
          }
          resolve();
        });
      });
  });
}

async function generateCategorizations() {
  const categories = require("./formatted/categories");
  const resources = require("./formatted/resources");

  const categorizations = [];

  return new Promise((resolve) => {
    fs.createReadStream("./raw/category_resources.csv")
      .pipe(csv())
      .on("data", (row) => {
        if (row.category) {
          const rowCategories = row.category.split(",");
          const resourceIndex = resources.findIndex((r) => r.name === row.name);

          rowCategories.forEach((rowCat) => {
            const categoryIndex = categories.findIndex(
              (c) => c.airtable_cat_id === rowCat
            );

            if (categoryIndex !== -1) {
              const categoryId = categoryIndex + 1;
              const resourceId = resourceIndex + 1;

              const existingIndex = categorizations.findIndex((c) => {
                return (
                  c.category_id === categoryId && c.resource_id === resourceId
                );
              });

              if (existingIndex === -1) {
                categorizations.push({
                  category_id: categoryId,
                  resource_id: resourceId,
                });
              }
            }
          });
        }
      })
      .on("end", () => {
        const filename = "./formatted/categorizations.json";
        fs.writeFile(filename, JSON.stringify(categorizations), (err) => {
          if (err) {
            console.log("error writing to json file", err);
          } else {
            console.log(`saved as ${filename}`);
          }
          resolve();
        });
      });
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
