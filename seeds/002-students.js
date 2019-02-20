exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("student")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("student").insert([
        { name: "Harry", cohort_id: 1 },
        { name: "Ron", cohort_id: 1 },
        { name: "Hermione", cohort_id: 1 }
      ]);
    });
};
