/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('posts', function(t) {
            t.charset('utf8');
            t.increments('id').unsigned().primary();
            t.string('title').notNull();
            t.longtext('body').notNull();
            t.text('toot').notNull();
            t.integer('hidden').defaultTo(0);
            t.dateTime('createdAt').notNull();
            t.dateTime('updatedAt').nullable();
        })
        .createTable('tags', function(t) {
            t.charset('utf8');
            t.increments('id').unsigned().primary();
            t.integer('hidden').defaultTo(0);
            t.string('name').notNull();
        })
        .createTable('postvstag', function(t) {
            t.charset('utf8');
            t.increments('id').unsigned().primary();
            t.integer('post_id').notNull();
            t.integer('tag_id').notNull();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("posts")
        .dropTable("tags")
        .dropTable("postvstag")
};
