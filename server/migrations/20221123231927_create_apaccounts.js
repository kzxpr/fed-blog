/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('apaccounts', function(t) {
        t.charset('utf8');
        t.increments('id').unsigned().primary();
        t.string('username').notNull();
        t.text('privkey').notNull();
        t.text('pubkey').notNull();
        t.text('apikey').notNull();
        t.datetime("createdAt").notNull();
        t.string('displayname').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("apaccounts")
};
