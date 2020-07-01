exports.seed = function (knex) {
  return knex("providers")
    .del()
    .then(function () {
      return knex("providers").insert([{ id: 1 }]);
    })
    .then(function () {
      return knex("provider_details").insert([
        { id: 1, provider_id: 1, name: "Provider 1", lang: "en" },
        { id: 2, provider_id: 1, name: "Proveedor 1", lang: "es" },
      ]);
    });
};
