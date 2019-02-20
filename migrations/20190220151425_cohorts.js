exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(tbl) {
    // primary key called id, integer, auto-increment
    tbl.increments();

    tbl
      .string("name", 128)
      .notNullable()
      .unique();
  });
};

// how can I undo the changes
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
