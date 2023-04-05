/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('apmessages', function(t) {
        t.string('url').nullable();
        t.string('summary').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('apmessages', function(t) {
        t.dropColumn("summary")
        t.dropColumn("url")
    });
};
