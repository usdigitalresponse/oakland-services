const neighborhoodsSeed = require("../data/formatted/neighborhoods");

exports.seed = function (knex) {
  return knex("neighborhoods")
    .del()
    .then(function () {
      const neighborhoods = neighborhoodsSeed.map((_, idx) => {
        return { id: idx + 1 };
      });
      return knex("neighborhoods").insert(neighborhoods);
    })
    .then(function () {
      const neighborhoodDetails = neighborhoodsSeed.map((neighborhood, idx) => {
        return {
          id: idx + 1,
          neighborhood_id: idx + 1,
          name: neighborhood.name,
          lang: "en",
        };
      });

      return knex("neighborhood_details").insert(neighborhoodDetails);
    });
};
