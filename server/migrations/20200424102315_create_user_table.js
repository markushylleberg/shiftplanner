
exports.up = function(knex) {
    return knex.schema
    .createTable('user', (table) => {
        table.increments('id');
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('username').unique();
        table.string('password');
        table.boolean('is_superuser');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('address', (table) => {
        table.increments('id');
        table.string('address_1');
        table.string('address_2');
        table.string('postal_code');
        table.string('city');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('user.id');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('address')
    .dropTableIfExists('user');
};
