/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('apactivities', function(t) {
        t.string('type').notNullable();
        t.string('actor').notNullable();
        t.datetime('published').notNullable();
        t.string('object').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('apactivities', function(t) {
        t.dropColumn("type")
        t.dropColumn("actor")
        t.dropColumn("published")
        t.dropColumn("object")
    });
};