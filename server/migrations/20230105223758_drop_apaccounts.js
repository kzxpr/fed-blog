/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.dropTableIfExists('apaccounts')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.createTable('apaccounts', function(t) {
        t.charset('utf8');
        t.increments('id').unsigned().primary();
        t.string('username').notNull();
        t.text('privkey').notNull();
        t.text('pubkey').notNull();
        t.text('apikey').notNull();
        t.datetime("createdAt").notNull();
        t.string('displayname').nullable();
        t.text('summary').nullable();
        t.string('icon').nullable();
        t.string('homepage').nullable();
        t.string('image').nullable();
        t.string('uri');
    });
};
