
exports.seed = function(knex) {
  return knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        {id: 1},
      ]);
    })
    .then(function () {
      return knex('category_details').insert([
        {id: 1, category_id: 1, name: 'Food to eat', lang:'en'},
        {id: 2, category_id: 1, name: 'Comida para comer', lang:'es'},
      ]);
    });
};
