/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('apaccounts_link', function(t) {
        t.charset('utf8');
        t.increments('id').unsigned().primary();
        t.string('user_uri').notNull();
        t.string('name').notNull();
        t.string('type').notNull();
        t.text('value').notNull();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("apoptions")
};
