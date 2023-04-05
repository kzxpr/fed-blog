/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('aplikes', function(t) {
        t.charset('utf8');
        t.increments('id').unsigned().primary();
        t.string('message_uri').notNull();
        t.string('account_uri').notNull();
        t.datetime('createdAt').notNull();
        t.unique(["message_uri", "account_uri"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("aplikes")
};
