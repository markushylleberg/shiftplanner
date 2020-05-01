
exports.up = function(knex) {
  return knex.schema
    .createTable('user_shift', (table) => {
        table.increments('id');
        table.integer('user_id').unsigned().notNullable();
        table.integer('shift_id').unsigned().notNullable();
        table.timestamp('assigned_at').defaultTo(knex.fn.now());

        table.foreign('user_id').references('id').inTable('user').onDelete('CASCADE')
        table.foreign('shift_id').references('id').inTable('shift').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_shift');
};
