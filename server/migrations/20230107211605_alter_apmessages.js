/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('apmessages', function (table) {
        table.dropNullable("uri")
        table.dropNullable("createdAt")
        table.unique("uri")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('apmessages', function (table) {
        table.setNullable("uri")
        table.setNullable("createdAt")
        table.dropUnique("uri")
    })
};
