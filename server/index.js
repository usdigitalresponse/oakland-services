const express = require("express");
const path = require("path");
const app = express();

const CLIENT_PATH = path.join(__dirname, "../", "build");

app.use(express.static(CLIENT_PATH));

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

function getLang(req) {
  let lang = req.query.lang;
  if (!lang) {
    lang = "en";
  }
  return lang;
}

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(CLIENT_PATH, "index.html"));
});

app.get("/api/categories", async (req, res) => {
  const categories = await database("categories")
    .join("category_details", "categories.id", "category_details.category_id")
    .where({ "categories.parent_id": null })
    .where({ "category_details.lang": getLang(req) });

  res.status(200).json(categories);
});

app.get("/categories/:category_id/resources", async (req, res) => {
  const categoryId = req.params.category_id;

  const resources = await database("resources")
    .join("resource_details", "resources.id", "resource_details.resource_id")
    .join("categorizations", "resources.id", "categorizations.resource_id")
    .join("categories", "categorizations.category_id", "categories.id")
    .join("categories as parents", "categorizations.category_id", "parents.id")
    .where({ "categories.parent_id": categoryId })
    .where({ "resource_details.lang": getLang(req) });

  res.status(200).json(resources);
});

app.get("/resources/:resource_id", async (req, res) => {
  const resourceId = req.params.resource_id;

  const resource = await database("resources")
    .join("resource_details", "resources.id", "resource_details.resource_id")
    .where({ "resource_details.lang": getLang(req) })
    .where({ "resources.id": resourceId })
    .first();

  res.status(200).json(resource);
});

app.get("/cities", async (req, res) => {
  const cities = await database("cities")
    .join("city_details", "cities.id", "city_details.city_id")
    .where({ "city_details.lang": getLang(req) });

  res.status(200).json(cities);
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(CLIENT_PATH, "index.html"));
});

app.listen(process.env.PORT || 5000);
