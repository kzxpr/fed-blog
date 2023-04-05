/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('aptags', function(t) {
            t.charset('utf8');
            t.increments('id').unsigned().primary();
            t.string('message_uri').notNull();
            t.string('type').notNull()
            t.string('href').notNull()
            t.string('name').nullable();
            t.dateTime('createdAt').notNull();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("aptags")
};
