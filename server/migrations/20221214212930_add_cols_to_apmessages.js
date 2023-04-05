/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('apmessages', function(t) {
        t.string('inReplyTo').nullable();
        t.string('anyOf').nullable();
        t.string('oneOf').nullable();
        t.dateTime('startTime').nullable();
        t.dateTime('endTime').nullable();
        t.dateTime('updated').nullable();
        t.dateTime('closed').nullable();
        t.string('attributedTo').alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('apmessages', function(t) {
        t.dropColumn("inReplyTo")
        t.dropColumn("anyOf")
        t.dropColumn("oneOf")
        t.dropColumn("startTime")
        t.dropColumn("endTime")
        t.dropColumn("updated")
        t.dropColumn("closed")
        t.integer('attributedTo').alter();
    });
};
