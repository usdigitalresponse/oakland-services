const neighborhoodsSeed = require("../data/formatted/neighborhoods");
const subneighborhoodsSeed = require("../data/formatted/subneighborhoods");

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
    })
    .then(function () {
      const subneighborhoods = subneighborhoodsSeed.map((sub, idx) => {
        return {
          id: neighborhoodsSeed.length + idx + 1,
          parent_id: sub.parent_id,
        };
      });
      return knex("neighborhoods").insert(subneighborhoods);
    })
    .then(function () {
      const subneighborhoodDetails = subneighborhoodsSeed.map(
        (subneighborhood, idx) => {
          return {
            id: neighborhoodsSeed.length + idx + 1,
            neighborhood_id: neighborhoodsSeed.length + idx + 1,
            name: subneighborhood.name,
            lang: "en",
          };
        }
      );

      return knex("neighborhood_details").insert(subneighborhoodDetails);
    });
};
