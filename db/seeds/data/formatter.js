const fs = require("fs");
const csv = require("csv-parser");

function generateCategories() {
  const categories = [];

  return fs.createReadStream("./raw/Category-Grid view.csv")
    .pipe(csv([]))
    .on("data", (row) => {
      formattedRow = {
        name: row['2'],
        airtable_cat_id: row['0'],
        airtable_parent_id: row['4']
      };

      if (formattedRow.name !== "" || formattedRow.name === "text") {
        categories.push(formattedRow);
      }
    })
    .on("end", () => {
      for (let i = 0; i < categories.length; i++) {
        const currentCategory = categories[i];
        const parentIndex = categories.findIndex(c => {
          return c.airtable_cat_id === currentCategory.airtable_parent_id;
        });

        if (parentIndex !== -1) {
          currentCategory.parent_id = parentIndex + 1;
        }
      }

      categories.forEach((category) => {
        delete category.airtable_parent_id;
      })

      const filename = './formatted/categories.json';
      fs.writeFile(filename, JSON.stringify(categories), err => {
        if (err) {
          console.log('error writing to json file', err);
        } else {
          console.log(`saved as ${filename}`);
        }
      });
    });
}

function generateCities() {
  const cities = [];
  return fs.createReadStream("./raw/Category_Resource-Grid view.csv")
    .pipe(csv())
    .on("data", (row) => {
      if (row.city) {
        const [existingCity] = cities.filter((c) => c.name === row.city);
        if (!existingCity) {
          const formattedRow = { name: row.city };
          cities.push(formattedRow);
        }
      }
    })
    .on("end", () => {
      const filename = './formatted/cities.json';
      fs.writeFile(filename, JSON.stringify(cities), err => {
        if (err) {
          console.log('error writing to json file', err);
        } else {
          console.log(`saved as ${filename}`);
        }
      });
    });
}

function generateOrganizations() {
  const organizations = [];
  return fs.createReadStream("./raw/Category_Resource-Grid view.csv")
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
      const filename = './formatted/organizations.json';
      fs.writeFile(filename, JSON.stringify(organizations), err => {
        if (err) {
          console.log('error writing to json file', err);
        } else {
          console.log(`saved as ${filename}`);
        }
      });
    });
}

function generateResources() {
  const cities = require("./formatted/cities");
  const organizations = require("./formatted/organizations");
  const resources = [];

  return fs.createReadStream("./raw/Category_Resource-Grid view.csv")
    .pipe(csv())
    .on("data", (row) => {
      const cityId = cities.findIndex((c) => c.name === row.city);
      const organizationId = organizations.findIndex((o) => o.name === row.organization_name);

      const formattedRow = {
        city_id: cityId === -1 ? null : cityId + 1,
        organization_id: organizationId === -1 ? null: organizationId + 1,

        address: "",
        website: "",
        phone_number: "",
        email: "",
        description: "",
        program_information: "",
        service_hours: "",
      };

      resources.push(formattedRow);
    })
    .on("end", () => {
      const filename = './formatted/resources.json';
      fs.writeFile(filename, JSON.stringify(resources), err => {
        if (err) {
          console.log('error writing to json file', err);
        } else {
          console.log(`saved as ${filename}`);
        }
      });
    });
}

function generateCategorizations() {
  const categories = require("./formatted/categories");
  const categorizations = [];

  return fs.createReadStream("./raw/Category_Resource-Grid view.csv")
    .pipe(csv())
    .on("data", (row) => {
      if (row.category) {
        const rowCategories = row.category.split(',');

        rowCategories.forEach((rowCat, rowIndex) => {
          const categoryIndex = categories.findIndex((c) => c.airtable_cat_id === rowCat);
          if (categoryIndex !== -1) {
            categorizations.push({
              category_id: categoryIndex + 1,
              resource_id: rowIndex + 1
            });
          }
        });
      }
    })
    .on("end", () => {
      const filename = './formatted/categorizations.json';
      fs.writeFile(filename, JSON.stringify(categorizations), err => {
        if (err) {
          console.log('error writing to json file', err);
        } else {
          console.log(`saved as ${filename}`);
        }
      });
    });
}

// generateCategories();
// generateCities();
// generateOrganizations();
// generateResources();
// generateCategorizations();

