/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('apaccounts', function(t) {
        t.string('followers_uri');
        t.string('following_uri');
        t.string('featured_uri');
        t.string('tags_uri');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('apaccounts', function(t) {
        t.dropColumn("followers_uri")
        t.dropColumn("following_uri")
        t.dropColumn("featured_uri")
        t.dropColumn("tags_uri")
    });
};
