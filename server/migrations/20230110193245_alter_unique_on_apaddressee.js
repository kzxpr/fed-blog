/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('apaddressee', function (table) {
        table.unique(["message_uri", "account_uri"])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('apaddressee', function (table) {
        table.dropUnique(["message_uri", "account_uri"])
    })
};
