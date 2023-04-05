/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('apaccounts', function(t) {
        t.charset('utf8');
        t.increments('id').unsigned().primary();
        t.string('uri').unique();
        t.string('username').nullable();
        t.text('privkey').nullable();
        t.text('apikey').nullable();
        t.text('pubkey').notNull();
        t.datetime("createdAt").notNull();
        t.string('displayname').nullable();
        t.text('summary').nullable();
        t.string('profile_link').nullable();
        t.string('icon').nullable();
        t.string('homepage').nullable();
        t.string('image').nullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('apaccounts')
};
