const database = require("../db");

const ResourceContext = {
  getResources: async (categoryId, params, order) => {
    return await database("resources")
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
        if (!params.neighborhoods) {
          return;
        }
        if (Array.isArray(params.neighborhoods)) {
          return queryBuilder.whereIn(
            "resources.neighborhood_id",
            params.neighborhoods.map((n) => parseInt(n))
          );
        }
        return queryBuilder.where(
          "resources.neighborhood_id",
          parseInt(params.neighborhoods)
        );
      })
      .modify((queryBuilder) => {
        if (!params.cities) {
          return;
        }
        if (Array.isArray(params.cities)) {
          return queryBuilder.whereIn(
            "resources.city_id",
            params.cities.map((n) => parseInt(n))
          );
        }
        return queryBuilder.where(
          "resources.city_id",
          parseInt(params.cities)
        );
      })
      .modify((queryBuilder) => {
        if (!params.organizations) {
          return;
        }
        if (Array.isArray(params.organizations)) {
          return queryBuilder.whereIn(
            "resources.organization_id",
            params.organizations.map((n) => parseInt(n))
          );
        }
        return queryBuilder.where(
          "resources.organization_id",
          parseInt(params.organizations)
        );
      })
      .modify((queryBuilder) => {
        if (order === "1") {
          return queryBuilder.orderBy("resource_details.name", "asc");
        }
        return queryBuilder.orderBy("resource_details.updated_at", "desc");
      })
      .groupBy(
        "resources.id",
        "resource_details.name",
        "resource_details.updated_at"
      );
  },
  getResource: async (resourceId) => {
    return await database("resources")
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
  },
}

module.exports = ResourceContext;
