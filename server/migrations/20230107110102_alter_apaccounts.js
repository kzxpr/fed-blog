/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('apaccounts', function (table) {
        table.renameColumn('preferredUsername', 'username');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('apaccounts', function (table) {
        table.renameColumn('username', 'preferredUsername');
    })
};
