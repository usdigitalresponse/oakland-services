const featuredCategoriesSeed = require("../data/v3/formatted/featured_categories");

exports.seed = function (knex) {
  return knex("featured_categories")
    .del()
    .then(function () {
      const featured_categories = featuredCategoriesSeed.map((cat, idx) => {
        return { id: idx + 1, category_id: cat.category_id };
      });
      return knex("featured_categories").insert(featured_categories);
    });
};
