const resourcesSeed = require("../data/formatted/resources");

exports.seed = function (knex) {
  return knex("resources")
    .del()
    .then(function () {
      const resources = resourcesSeed.map((resource, idx) => {
        return {
          id: idx + 1,
          organization_id: resource.organization_id,
          city_id: resource.city_id,
        };
      });
      return knex("resources").insert(resources);
    })
    .then(function () {
      const resourceDetails = resourcesSeed.map((resource, idx) => {
        return {
          id: idx + 1,
          resource_id: idx + 1,
          name: resource.name,
          address: resource.address,
          website: resource.website,
          phone_number: resource.phone_number,
          description: resource.description,
          lang: "en",
        };
      });

      return knex("resource_details").insert(resourceDetails);
    });
};
