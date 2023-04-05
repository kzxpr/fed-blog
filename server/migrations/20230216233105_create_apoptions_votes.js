/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('apoptions_votes', function(t) {
        t.charset('utf8');
        t.increments('id').unsigned().primary();
        t.string('message_uri').notNull();
        t.string('option_id').notNull();
        t.string('account_uri').notNull();
        t.datetime('created_at');
        t.unique(["message_uri", "option_id", "account_uri"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("apoptions_votes")
};
