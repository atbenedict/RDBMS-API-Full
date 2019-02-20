const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true
};
const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// list all cohorts
server.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await db("cohorts");
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

const errors = {
  "19": "Another record with that value exists"
};

// list a cohort by id
server.get("/api/cohorts/:id", async (req, res) => {
  try {
    const cohort = await db("cohorts")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a cohort
server.post("/api/cohorts", async (req, res) => {
  try {
    const [id] = await db("cohorts").insert(req.body);

    const cohort = await db("cohorts")
      .where({ id })
      .first();

    res.status(201).json(cohort);
  } catch (error) {
    const message = errors[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

// update a cohort
server.put("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const cohort = await db("cohorts")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});

// remove cohorts (inactivate the cohort)
server.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});

// list all students
server.get("/api/students", async (req, res) => {
  try {
    const students = await db("students");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

// list a student by id
server.get("/api/students/:id", async (req, res) => {
  try {
    const student = await db("students")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a student
server.post("/api/students", async (req, res) => {
  try {
    const [id] = await db("students").insert(req.body);

    const student = await db("students")
      .where({ id })
      .first();

    res.status(201).json(student);
  } catch (error) {
    const message = errors[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

// update a student
server.put("/api/students/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const student = await db("students")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});

// remove students (inactivate the student)
server.delete("/api/students/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
