/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('apattachments', function(t) {
            t.charset('utf8');
            t.increments('id').unsigned().primary();
            t.string('message_uri').notNull();
            t.string('type').notNull()
            t.string('mediaType').notNull()
            t.string('url').notNull()
            t.string('name').nullable();
            t.string('blurhash').nullable();
            t.integer('width').nullable();
            t.integer('height').nullable();
            t.dateTime('createdAt').notNull();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("apattachments")
};
