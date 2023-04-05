/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('apmessages', function(t) {
    t.charset('utf8');
    t.increments('id').unsigned().primary();
    t.string('guid').notNull();
    t.string('type').notNull();
    t.datetime('publishedAt').notNull();
    t.integer('attributedTo').notNull();
    t.longtext('content').nullable();
    t.unique(["guid"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('apmessages')
};
