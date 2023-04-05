/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('aprequests', function(t) {
        t.dropColumn("params")
        t.dropColumn("query")
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('aprequests', function(t) {
        t.longtext('params').nullable();
        t.longtext('query').nullable();
    }); 
};
