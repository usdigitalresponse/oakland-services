const categorizationsSeed = require("../data/formatted/categorizations");

exports.seed = function (knex) {
  return knex("categorizations")
    .del()
    .then(function () {
      const categorizations = categorizationsSeed.map((cat, idx) => {
        return {
          id: idx + 1,
          category_id: cat.category_id,
          resource_id: cat.resource_id,
        };
      });

      return knex("categorizations").insert(categorizations);
    });
};
