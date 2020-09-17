const path = require("path");
const express = require("express");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const helmet = require("helmet");
const database = require("./db");
const CategoryContext = require("./contexts/CategoryContext");
const ResourceContext = require("./contexts/ResourceContext");

const CLIENT_PATH = path.join(__dirname, "../", "build");
// Must be sorted for array agg query
const SUPPORTED_LANGUAGES = ["en", "es"];
const DEFAULT_LANGUAGE_INDEX = 0;

i18next.use(i18nextMiddleware.LanguageDetector).init({
  supportedLngs: ["en", "es"],
  fallbackLng: "en",
});

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(i18nextMiddleware.handle(i18next));
app.use(express.static(CLIENT_PATH));

app.get("/", (_req, res) => {
  res.sendFile(path.join(CLIENT_PATH, "index.html"));
});

app.get("/api/featured-categories", async (req, res) => {
  const categories = await CategoryContext.getFeaturedCategories();

  res
    .status(200)
    .json(translateInput(categories, req.lang, ["name", "preferred_name"]));
});

app.get("/api/categories", async (req, res) => {
  const categories = await CategoryContext.getCategories();

  res
    .status(200)
    .json(translateInput(categories, req.lang, ["name", "preferred_name"]));
});

app.get("/api/categories/:category_id/subcategories", async (req, res) => {
  const categoryId = req.params.category_id;
  const categories = await CategoryContext.getSubcategories(categoryId);

  res
    .status(200)
    .json(translateInput(categories, req.lang, ["name", "preferred_name"]));
});

app.get("/api/categories/:category_id/resources", async (req, res) => {
  const categoryId = req.params.category_id;
  const resources = await ResourceContext.getResources(categoryId, req.query.neighborhoods, req.query.order);

  res
    .status(200)
    .json(
      translateInput(resources, req.lang, [
        "name",
        "description",
        "phone_number",
        "website",
        "address",
        "organization",
      ])
    );
});

app.get("/api/resources/:resource_id", async (req, res) => {
  const resourceId = req.params.resource_id;
  const resource = await ResourceContext.getResource(resourceId);

  res
    .status(200)
    .json(
      translateInput([resource], req.lang, [
        "name",
        "preferred_name",
        "description",
        "phone_number",
        "email",
        "address",
        "website",
        "postal_code",
        "latitude",
        "longitude",
        "application_process",
        "required_documents",
        "eligibility",
        "schedule",
        "organization",
      ])[0]
    );
  res.status(200).json(resource);
});

app.get("/api/neighborhoods", async (req, res) => {
  const neighborhoods = await database("neighborhoods")
    .select(
      "neighborhoods.id",
      "neighborhoods.parent_id",
      database.raw(
        "ARRAY_AGG(neighborhood_details.name ORDER BY neighborhood_details.lang) as name"
      )
    )
    .join(
      "neighborhood_details",
      "neighborhoods.id",
      "neighborhood_details.neighborhood_id"
    )
    .where({ "neighborhoods.parent_id": null })
    .groupBy("neighborhoods.id");

  res.status(200).json(translateInput(neighborhoods, req.lang, ["name"]));
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(CLIENT_PATH, "index.html"));
});

app.listen(process.env.PORT || 5000);

function translateInput(input, targetLang, keys) {
  const targetIndex = SUPPORTED_LANGUAGES.indexOf(targetLang);
  const defaultIndex = DEFAULT_LANGUAGE_INDEX;
  const output = [];

  input.forEach((x) => {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (!x[key]) {
        continue;
      }

      if (x[key][targetIndex] && x[key][targetIndex] !== "") {
        val = x[key][targetIndex];
      }

      if (x[key][defaultIndex]) {
        val = x[key][defaultIndex];
      }

      x[key] = val;
    }

    output.push(x);
  });

  return output;
}
