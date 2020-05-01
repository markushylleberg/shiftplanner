
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_shift').del()
    .then( () => {
      return knex('shift').del()
    })
      .then( () => {
        // Inserts seed entries
        return knex('shift').insert([
          {id: 1, start_datetime: '2020-05-20 15:00:00', end_datetime: '2020-05-20 20:00:00', is_available: 1},
          {id: 2, start_datetime: '2020-05-22 10:00:00', end_datetime: '2020-05-22 15:00:00', is_available: 1},
          {id: 3, start_datetime: '2020-05-22 18:00:00', end_datetime: '2020-05-22 22:00:00', is_available: 1},
          {id: 4, start_datetime: '2020-05-24 10:00:00', end_datetime: '2020-05-24 15:00:00', is_available: 1}
        ]);
      });
};
