
exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('account', tbl =>{
      tbl.uuid('account_id')
        .notNullable()
        .unique()
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      tbl.string('email')
        .notNullable()
        .unique();
      tbl.string('username')
        .notNullable()
        .unique();
      tbl.specificType('student_ids', 'text ARRAY');
      tbl.string('hashed_pin')
        .notNullable();
      tbl.json('settings')
        // Front end can determine contents/format
        .defaultTo({});
      tbl.json('stripe')
        .defaultTo({});
      tbl.datetime('paid_until')
        .defaultTo(knex.fn.now(6));
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('account');
};
