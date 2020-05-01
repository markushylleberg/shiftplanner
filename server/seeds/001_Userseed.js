
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('address').del()
    .then( () => {
      return knex('user').del();
    })
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { first_name: "Catarina", last_name: "Larsen", email: "cl@powerfulemail.com", username: 'catarina', password: '$2b$10$3EWKlICLevyan94TaZ5jluFFATOmOhuEFQ9O56G/BarOTg0ngS8ia', is_superuser: 0 },
        { first_name: "Thomas", last_name: "Hylleberg", email: "th@niceemail.dk", username: 'thomas', password: '$2b$10$3EWKlICLevyan94TaZ5jluFFATOmOhuEFQ9O56G/BarOTg0ngS8ia', is_superuser: 0 },
        { first_name: "Anne", last_name: "Børgersen", email: "ab@anotheremail.no", username: 'anne', password: '$2b$10$3EWKlICLevyan94TaZ5jluFFATOmOhuEFQ9O56G/BarOTg0ngS8ia', is_superuser: 0 },
        { first_name: "Bo", last_name: "Larsen", email: "bl@someemail.dk", username: 'bo', password: '$2b$10$3EWKlICLevyan94TaZ5jluFFATOmOhuEFQ9O56G/BarOTg0ngS8ia', is_superuser: 0 },
        { first_name: "Markus", last_name: "Hylleberg", email: "markushylleberg@gmail.com", username: 'markus', password: '$2b$10$3EWKlICLevyan94TaZ5jluFFATOmOhuEFQ9O56G/BarOTg0ngS8ia', is_superuser: 1 },
      ]);
    }).then( (userId) => {
      console.log(userId);
      return knex('address').insert([
        { user_id: userId[0], address_1: "Some steet 1", address_2: "Seom steet 2", postal_code: "4000", city: "roskilde"  }
      ])
    } )
};