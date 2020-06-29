
exports.seed = function(knex) {
  return knex('categorizations').del()
    .then(function () {
      return knex('categorizations').insert([
        {id: 1, category_id: 1, service_id: 1},
      ]);
    });
};
