/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('posts', function(t) {
        t.dropColumn("toot")
        t.integer('apmessage_id').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('posts', function(t) {
        t.dropColumn("apmessage_id")
        t.text('toot').notNull();
    });
};
