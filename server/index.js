const path = require("path");
const express = require("express");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const helmet = require("helmet");
const database = require("./db");

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
  const categories = await database("featured_categories")
    .select(
      "categories.id",
      database.raw(
        "ARRAY_AGG(category_details.name ORDER BY category_details.lang) as name"
      ),
      database.raw(
        "ARRAY_AGG(category_details.preferred_name ORDER BY category_details.lang) as preferred_name"
      )
    )
    .join("categories", "categories.id", "featured_categories.category_id")
    .join("category_details", "categories.id", "category_details.category_id")
    .where({ "categories.parent_id": null })
    .groupBy("categories.id");

  res
    .status(200)
    .json(translateInput(categories, req.lang, ["name", "preferred_name"]));
});

app.get("/api/categories", async (req, res) => {
  const categories = await database("categories")
    .select(
      "categories.id",
      database.raw(
        "ARRAY_AGG(category_details.name ORDER BY category_details.lang) as name"
      ),
      database.raw(
        "ARRAY_AGG(category_details.preferred_name ORDER BY category_details.lang) as preferred_name"
      )
    )
    .join("category_details", "categories.id", "category_details.category_id")
    .where({ "categories.parent_id": null })
    .groupBy("categories.id");

  res
    .status(200)
    .json(translateInput(categories, req.lang, ["name", "preferred_name"]));
});

app.get("/api/categories/:category_id/subcategories", async (req, res) => {
  const categoryId = req.params.category_id;
  const categories = await database("categories")
    .select(
      "categories.id",
      database.raw(
        "ARRAY_AGG(category_details.name ORDER BY category_details.lang) as name"
      ),
      database.raw(
        "ARRAY_AGG(category_details.preferred_name ORDER BY category_details.lang) as preferred_name"
      )
    )
    .join("category_details", "categories.id", "category_details.category_id")
    .where({ "categories.parent_id": categoryId })
    .groupBy("categories.id");

  res
    .status(200)
    .json(translateInput(categories, req.lang, ["name", "preferred_name"]));
});

app.get("/api/categories/:category_id/resources", async (req, res) => {
  const categoryId = req.params.category_id;

  const resources = await database("resources")
    .select(
      "resources.id",
      database.raw(
        "ARRAY_AGG(resource_details.name ORDER BY resource_details.lang) as name"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.description ORDER BY resource_details.lang) as description"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.phone_number ORDER BY resource_details.lang) as phone_number"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.website ORDER BY resource_details.lang) as website"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.address ORDER BY resource_details.lang) as address"
      ),
      database.raw(
        "ARRAY_AGG(organization_details.name ORDER BY organization_details.lang) as organization"
      ),
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
    .join(
      "organization_details",
      "organization_details.organization_id",
      "organizations.id"
    )
    .where({ "categories.id": categoryId })
    .modify((queryBuilder) => {
      if (!req.query.neighborhoods) {
        return;
      }
      if (Array.isArray(req.query.neighborhoods)) {
        return queryBuilder.whereIn(
          "resources.neighborhood_id",
          req.query.neighborhoods.map((n) => parseInt(n))
        );
      }
      return queryBuilder.where(
        "resources.neighborhood_id",
        parseInt(req.query.neighborhoods)
      );
    })
    .modify((queryBuilder) => {
      if (req.query.order === "1") {
        return queryBuilder.orderBy("resource_details.name", "asc");
      }
      return queryBuilder.orderBy("resource_details.updated_at", "desc");
    })
    .groupBy(
      "resources.id",
      "resource_details.name",
      "resource_details.updated_at"
    );

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

  const resource = await database("resources")
    .select(
      "resources.id",
      "resources.scraped_at",
      "resources.data",

      database.raw(
        "ARRAY_AGG(resource_details.name ORDER BY resource_details.lang) as name"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.preferred_name ORDER BY resource_details.lang) as preferred_name"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.description ORDER BY resource_details.lang) as description"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.phone_number ORDER BY resource_details.lang) as phone_number"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.email ORDER BY resource_details.lang) as email"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.address ORDER BY resource_details.lang) as address"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.website ORDER BY resource_details.lang) as website"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.postal_code ORDER BY resource_details.lang) as postal_code"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.latitude ORDER BY resource_details.lang) as latitude"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.longitude ORDER BY resource_details.lang) as longitude"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.application_process ORDER BY resource_details.lang) as application_process"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.required_documents ORDER BY resource_details.lang) as required_documents"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.eligibility ORDER BY resource_details.lang) as eligibility"
      ),
      database.raw(
        "ARRAY_AGG(resource_details.schedule ORDER BY resource_details.lang) as schedule"
      ),
      database.raw(
        "ARRAY_AGG(organization_details.name ORDER BY organization_details.lang) as organization"
      ),
      "resource_details.updated_at",
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
    .join(
      "organization_details",
      "organization_details.organization_id",
      "organizations.id"
    )
    .where({ "resources.id": resourceId })
    .groupBy(
      "resources.id",
      "resources.scraped_at",
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
      "resource_details.updated_at",
      "organization_details.name",
      "category_details.name"
    )
    .first();

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
