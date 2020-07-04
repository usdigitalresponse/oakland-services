const path = require("path");
const express = require("express");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const helmet = require("helmet");
const database = require("./db");

const CLIENT_PATH = path.join(__dirname, "../", "build");

i18next.use(i18nextMiddleware.LanguageDetector).init({
  supportedLngs: ["en", "es"],
  fallbackLng: "en",
});

const app = express();

app.use(helmet());
app.use(i18nextMiddleware.handle(i18next));
app.use(express.static(CLIENT_PATH));

app.get("/", (_req, res) => {
  res.sendFile(path.join(CLIENT_PATH, "index.html"));
});

app.get("/api/categories", async (req, res) => {
  const categories = await database("categories")
    .select("categories.id", "category_details.name")
    .join("category_details", "categories.id", "category_details.category_id")
    .where({ "categories.parent_id": null })
    .where({ "category_details.lang": req.language });

  res.status(200).json(categories);
});

app.get("/api/categories/:category_id/resources", async (req, res) => {
  const categoryId = req.params.category_id;

  const resources = await database("resources")
    .select(
      "resources.id",
      "resource_details.name",
      "resource_details.description",
      "resource_details.phone_number"
    )
    .join("resource_details", "resources.id", "resource_details.resource_id")
    .join(
      "categorizations",
      "resource_details.resource_id",
      "categorizations.resource_id"
    )
    .join("categories", "categorizations.category_id", "categories.id")
    .join("categories as parents", "categories.parent_id", "parents.id")
    .where({ "categories.parent_id": categoryId })
    .andWhere({ "resource_details.lang": req.language })
    .distinctOn("resources.id");

  res.status(200).json(resources);
});

app.get("/api/resources", async (req, res) => {
  const resources = await database("resources")
    .select(
      "resources.id",
      "resource_details.name",
      "resource_details.description",
      "resource_details.phone_number"
    )
    .join("resource_details", "resources.id", "resource_details.resource_id")
    .where({ "resource_details.lang": req.language });

  res.status(200).json(resources);
});

app.get("/api/resources/:resource_id", async (req, res) => {
  const resourceId = req.params.resource_id;

  const resource = await database("resources")
    .select(
      "resources.id",
      "resource_details.name",
      "resource_details.description",
      "resource_details.phone_number",
      "resource_details.email",
      "resource_details.address",
      "resource_details.website",
      "organization_details.name as organization_name"
    )
    .join("resource_details", "resources.id", "resource_details.resource_id")
    .join("organizations", "resources.organization_id", "organizations.id")
    .join("organization_details", "organizations.id", "organization_details.id")
    .where({ "resource_details.lang": req.language })
    .where({ "organization_details.lang": req.language })
    .where({ "resources.id": resourceId })
    .first();

  res.status(200).json(resource);
});

app.get("/api/cities", async (req, res) => {
  const cities = await database("cities")
    .select("cities.id", "city_details.name")
    .join("city_details", "cities.id", "city_details.city_id")
    .where({ "city_details.lang": req.language });

  res.status(200).json(cities);
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(CLIENT_PATH, "index.html"));
});

app.listen(process.env.PORT || 5000);
