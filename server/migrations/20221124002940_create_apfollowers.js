/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('apfollowers', function(t) {
        t.charset('utf8');
        t.increments('id').unsigned().primary();
        t.string('username').notNull();
        t.string('follower').notNull();
        t.datetime('createdAt').notNull();
        t.unique(["username", "follower"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("apfollowers")
};
