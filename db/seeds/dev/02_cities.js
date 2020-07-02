const citiesSeed = require("../data/formatted/cities");

exports.seed = function (knex) {
  return knex("cities")
    .del()
    .then(function () {
      const cities = citiesSeed.map((_, idx) => {
        return { id: idx + 1 };
      });
      return knex("cities").insert(cities);
    })
    .then(function () {
      const cityDetails = citiesSeed.map((city, idx) => {
        return {
          id: idx + 1,
          city_id: idx + 1,
          name: city.name,
          lang: "en",
        }
      });

      return knex("city_details").insert(cityDetails);
    });
};
