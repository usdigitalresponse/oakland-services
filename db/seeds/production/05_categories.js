const categoriesSeed = require("../data/v3/formatted/categories");

exports.seed = function (knex) {
  return knex("categories")
    .del()
    .then(function () {
      const categories = categoriesSeed.map((cat, idx) => {
        return { id: idx + 1, parent_id: cat.parent_id };
      });
      return knex("categories").insert(categories);
    })
    .then(function () {
      const categoryDetails = categoriesSeed.map((cat, idx) => {
        return {
          id: idx + 1,
          category_id: idx + 1,
          name: cat.name,
          preferred_name: cat.preferred_name,
          lang: cat.lang || "en",
        };
      });

      return knex("category_details").insert(categoryDetails);
    });
};
