
exports.up = function(knex) {
  return knex.schema
    .createTable('shift', (table) => {
        table.increments('id');
        table.datetime('start_datetime');
        table.datetime('end_datetime');
        table.boolean('is_available');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('shift');
};
