/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('apoptions', function(t) {
        t.charset('utf8');
        t.increments('id').unsigned().primary();
        t.string('message_uri').notNull();
        t.string('name').notNull();
        t.string('type').notNull();
        t.unique(["message_uri", "name"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("apoptions")
};
