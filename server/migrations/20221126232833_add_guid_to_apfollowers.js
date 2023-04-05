/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  //return knex.schema.alterTable('apfollowers')
  return knex.schema.table('apfollowers', function(t) {
    t.string('guid').notNull();
});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('apfollowers', function(t) {
        t.dropColumn("guid")
    });
};
