/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('apmessages', function(t) {
        t.string('uri');
        t.datetime('createdAt');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('apmessages', function(t) {
        t.dropColumn("uri");
        t.dropColumn("createdAt");
    });
};
