/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('apactivities', function(t) {
            t.charset('utf8');
            t.increments('id').unsigned().primary();
            t.string('uri').notNull();
            t.dateTime('createdAt').notNull();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("apactivities")
};
