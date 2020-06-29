
exports.seed = function(knex) {
  return knex('services').del()
    .then(function () {
      return knex('services').insert([
        {id: 1, provider_id: 1, neighborhood_id: 1},
      ]);
    })
    .then(function () {
      return knex('service_details').insert([
        {
          id: 1,
          service_id: 1,
          address: '111 service way',
          website: '1service.com',
          phone_number: '111-111-1111',
          email: '1service@example.com',
          description: 'description for 1service',
          program_information: 'program information for 1service',
          service_hours: '1pm to 5pm',
          lang: 'en',
        },
        {
          id: 2,
          service_id: 1,
          address: '111 service way',
          website: '1servicio.com',
          phone_number: '121-111-1111',
          email: '1servicio@example.com',
          description: 'descripción para 1servicio',
          program_information: 'programa descripción para 1servicio',
          service_hours: '1 a 5pm',
          lang: 'es',
        },
      ]);
    });
};
