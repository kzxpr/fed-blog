/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('apaccounts', function(t) {
        t.boolean('autoaccept').defaultTo(1)
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('apaccounts', function(t) {
        t.dropColumn('autoaccept');
    });
};
