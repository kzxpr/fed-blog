/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('config', function(t) {
        t.charset('utf8');
        t.increments('id').unsigned().primary();
        t.string('key').notNull();
        t.string('value').nullable();
        t.unique(["key"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('config')
};
