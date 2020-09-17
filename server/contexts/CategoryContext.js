const database = require("../db");

const CategoryContext = {
  getFeaturedCategories: async () => {
    return await database("featured_categories")
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
  },
  getCategories: async () => {
    return await database("categories")
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
  },
  getSubcategories: async (categoryId) => {
    return await database("categories")
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
  },
}

module.exports = CategoryContext;
