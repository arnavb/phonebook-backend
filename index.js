const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

morgan.token("post-body", (request, response) =>
  request.method === "POST" ? JSON.stringify(request.body) : ""
);

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-body"
  )
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br /> ${Date()}`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).send({
      error: "missing name",
    });
  }

  if (!body.number) {
    return response.status(400).send({
      error: "missing number",
    });
  }

  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).send({
      error: "name must be unique",
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000),
  };

  persons.push(newPerson);

  response.json(newPerson);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
