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

app.get("/api/featured-categories", async (req, res) => {
  const categories = await database("featured_categories")
    .select(
      "categories.id",
      "category_details.name",
      "category_details.preferred_name"
    )
    .join("categories", "categories.id", "featured_categories.category_id")
    .join("category_details", "categories.id", "category_details.category_id")
    .where({ "categories.parent_id": null })
    .where({ "category_details.lang": req.language });

  res.status(200).json(categories);
});

app.get("/api/categories", async (req, res) => {
  const categories = await database("categories")
    .select(
      "categories.id",
      "category_details.name",
      "category_details.preferred_name"
    )
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
      "resource_details.phone_number",
      "resource_details.website",
      "resource_details.address",
      "organization_details.name as organization",
      database.raw("ARRAY_AGG(category_details.name) as subcategories")
    )
    .join("resource_details", "resources.id", "resource_details.resource_id")
    .join(
      "categorizations",
      "resource_details.resource_id",
      "categorizations.resource_id"
    )
    .join("categories", "categorizations.category_id", "categories.id")
    .join("category_details", "category_details.category_id", "categories.id")
    .join("categories as parents", "categories.parent_id", "parents.id")
    .join("organizations", "organizations.id", "resources.organization_id")
    .join("organization_details", "organization_details.organization_id", "organizations.id")
    .where({ "categories.parent_id": categoryId })
    .where({ "resource_details.lang": req.language })
    .groupBy(
      "resources.id",
      "resource_details.name",
      "resource_details.description",
      "resource_details.phone_number",
      "resource_details.website",
      "resource_details.address",
      "organization_details.name"
    );

  res.status(200).json(resources);
});

app.get("/api/resources", async (req, res) => {
  const resources = await database("resources")
    .select(
      "resources.id",
      "resources.organization_id",
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
      "resources.organization_id",
      "resource_details.name",
      "resource_details.preferred_name",
      "resource_details.description",
      "resource_details.phone_number",
      "resource_details.email",
      "resource_details.address",
      "resource_details.website",
      "resource_details.postal_code",
      "resource_details.latitude",
      "resource_details.longitude",
      "resource_details.application_process",
      "resource_details.required_documents",
      "resource_details.eligibility",
      "resource_details.schedule",
      "organization_details.name as organization",
      database.raw("ARRAY_AGG(category_details.name) as subcategories")
    )
    .join("resource_details", "resources.id", "resource_details.resource_id")
    .join(
      "categorizations",
      "resource_details.resource_id",
      "categorizations.resource_id"
    )
    .join("categories", "categorizations.category_id", "categories.id")
    .join("category_details", "category_details.category_id", "categories.id")
    .join("organizations", "organizations.id", "resources.organization_id")
    .join("organization_details", "organization_details.organization_id", "organizations.id")
    .where({ "resource_details.lang": req.language })
    .where({ "resources.id": resourceId })
    .groupBy(
      "resources.id",
      "resource_details.name",
      "resource_details.description",
      "resource_details.phone_number",
      "resource_details.preferred_name",
      "resource_details.email",
      "resource_details.address",
      "resource_details.website",
      "resource_details.postal_code",
      "resource_details.latitude",
      "resource_details.longitude",
      "resource_details.application_process",
      "resource_details.required_documents",
      "resource_details.eligibility",
      "resource_details.schedule",
      "resource_details.phone_number",
      "organization_details.name"
    )
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

app.get("/api/neighborhoods", async (req, res) => {
  const neighborhoods = await database("neighborhoods")
    .select(
      "neighborhoods.id",
      "neighborhoods.parent_id",
      "neighborhood_details.name"
    )
    .join(
      "neighborhood_details",
      "neighborhoods.id",
      "neighborhood_details.neighborhood_id"
    )
    .where({ "neighborhoods.parent_id": null })
    .where({ "neighborhood_details.lang": req.language });

  res.status(200).json(neighborhoods);
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(CLIENT_PATH, "index.html"));
});

app.listen(process.env.PORT || 5000);
