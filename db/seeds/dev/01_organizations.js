const organizationsSeed = require("../data/formatted/organizations");

exports.seed = function (knex) {
  return knex("organizations")
    .del()
    .then(function () {
      const organizations = organizationsSeed.map((_, idx) => {
        return { id: idx + 1 };
      });
      return knex("organizations").insert(organizations);
    })
    .then(function () {
      const organizationDetails = organizationsSeed.map((org, idx) => {
        return {
          id: idx + 1,
          organization_id: idx + 1,
          name: org.name,
          lang: "en",
        }
      });

      return knex("organization_details").insert(organizationDetails);
    });
};
