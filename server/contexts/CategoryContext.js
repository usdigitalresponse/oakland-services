const database = require("../db");

const CategoryContext = {
  getFeaturedCategories: async () => {
    return await database("featured_categories")
      .select(
        "categories.id",
        "categories.external_id",
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
        "categories.external_id",
        database.raw(
          "ARRAY_AGG(category_details.name ORDER BY category_details.lang) as name"
        ),
        database.raw(
          "ARRAY_AGG(category_details.preferred_name ORDER BY category_details.lang) as preferred_name"
        )
      )
      .join("category_details", "categories.id", "category_details.category_id")
      .where({ "categories.parent_id": null })
      // TODO: Remove later once we figure out how to deal with empty categories
      .whereNotIn("categories.external_id", [5330, 5327])
      .groupBy("categories.id");
  },
  getSubcategories: async (categoryId) => {
    return await database("categories")
      .select(
        "categories.id",
        "categories.external_id",
        database.raw(
          "ARRAY_AGG(category_details.name ORDER BY category_details.lang) as name"
        ),
        database.raw(
          "ARRAY_AGG(category_details.preferred_name ORDER BY category_details.lang) as preferred_name"
        )
      )
      .join("category_details", "categories.id", "category_details.category_id")
      .where({ "categories.parent_id": categoryId })
      // TODO: Remove later once we figure out how to deal with empty categories
      .whereNotIn("categories.external_id", [
        3524,
        5335,
        5336,
        5332,
        5334,
        5621,
        5624,
        5555,
        6005,
        5582,
        5331,
        5632,
        5666,
      ])
      .groupBy("categories.id");
  },
};

module.exports = CategoryContext;
