/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('apaddressee', function(t) {
            t.charset('utf8');
            t.increments('id').unsigned().primary();
            t.string('message_uri').notNull();
            t.string('field').notNull();
            t.string('account_uri').notNull();
            t.dateTime('createdAt').notNull();
            t.integer('type').notNull();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("apaddressee")
};
