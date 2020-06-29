
exports.seed = function(knex) {
  return knex('neighborhoods').del()
    .then(function () {
      return knex('neighborhoods').insert([
        {id: 1},
      ]);
    })
    .then(function () {
      return knex('neighborhood_details').insert([
        {id: 1, neighborhood_id: 1, name: 'North Oakland', lang:'en'},
        {id: 2, neighborhood_id: 1, name: 'Norte de Oakland', lang:'es'},
      ]);
    });
};
