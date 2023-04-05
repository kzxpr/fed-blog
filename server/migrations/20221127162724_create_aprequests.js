/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('aprequests', function(t) {
        t.charset('utf8');
        t.increments('id').unsigned().primary();
        t.string('method').notNull();
        t.string('url').notNull();
        t.string('ip').notNull();
        t.datetime('timestamp').notNull();
        t.integer('statuscode').notNull();
        t.longtext('params').nullable();
        t.longtext('body').nullable();
        t.longtext('query').nullable();
        t.longtext('response').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('aprequests')
};
