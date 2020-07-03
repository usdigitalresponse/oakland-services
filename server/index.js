const express = require("express");
const path = require("path");
const i18next = require("i18next");
const middleware = require("i18next-http-middleware");

const CLIENT_PATH = path.join(__dirname, "../", "build");

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

i18next.use(middleware.LanguageDetector).init();

const app = express();

app.use(express.static(CLIENT_PATH));
app.use(middleware.handle(i18next));

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
    .where({ "category_details.lang": req.language });

  res.status(200).json(categories);
});

app.get("/api/categories/:category_id/resources", async (req, res) => {
  const categoryId = req.params.category_id;

  const resources = await database("resources")
    .join("resource_details", "resources.id", "resource_details.resource_id")
    .join("categorizations", "resources.id", "categorizations.resource_id")
    .join("categories", "categorizations.category_id", "categories.id")
    .join("categories as parents", "categorizations.category_id", "parents.id")
    .where({ "categories.parent_id": categoryId })
    .where({ "resource_details.lang": req.language });

  res.status(200).json(resources);
});

app.get("/api/resources/:resource_id", async (req, res) => {
  const resourceId = req.params.resource_id;

  const resource = await database("resources")
    .join("resource_details", "resources.id", "resource_details.resource_id")
    .where({ "resource_details.lang": req.language })
    .where({ "resources.id": resourceId })
    .first();

  res.status(200).json(resource);
});

app.get("/api/cities", async (req, res) => {
  const cities = await database("cities")
    .join("city_details", "cities.id", "city_details.city_id")
    .where({ "city_details.lang": req.language });

  res.status(200).json(cities);
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(CLIENT_PATH, "index.html"));
});

app.listen(process.env.PORT || 5000);
