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

app.get("/categories", async (req, res) => {
  const categories = await database("categories")
    .join("category_details", "categories.id", "category_details.category_id")
    .where({ "category_details.lang": getLang(req) });

  res.status(200).json(categories);
});

app.get("/categories/:category_id/services", async (req, res) => {
  const categoryId = req.params.category_id;

  const services = database("services")
    .join("service_details", "services.id", "service_details.service_id")
    .join("categorizations", "services.id", "categorizations.service_id")
    .join("categories", "categorizations.category_id", "categories.id")
    .where({ category_id: categoryId })
    .where({ "service_details.lang": getLang(req) });

  res.status(200).json(services);
});

app.get("/services/:service_id", async (req, res) => {
  const serviceId = req.params.service_id;

  const service = database("services")
    .join("service_details", "services.id", "service_details.service_id")
    .where({ "service_details.lang": getLang(req) })
    .where({ "services.id": serviceId })
    .first();

  res.status(200).json(service);
});

app.get("/neighborhoods", async (req, res) => {
  const neighborhoods = database("neighborhoods")
    .join(
      "neighborhood_details",
      "neighborhoods.id",
      "neighborhood_details.neighborhood_id"
    )
    .where({ "neighborhood_details.lang": getLang(req) });

  res.status(200).json(neighborhoods);
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(CLIENT_PATH, "index.html"));
});

app.listen(process.env.PORT || 5000);
