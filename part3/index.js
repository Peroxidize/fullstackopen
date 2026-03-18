require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const Phonebook = require("./models/phonebook");

app.use(express.json());
app.use(express.static("dist"));

const logPost = morgan.token("logPost", (req) => {
  if (!req.method === "POST") {
    return;
  }

  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :logPost",
  ),
);

app.get("/api/persons", (request, response) => {
  Phonebook.find({}).then((phonebook) => {
    response.json(phonebook);
  });
});

app.get("/info", (request, response) => {
  const length = persons.length;
  const currentDate = new Date();
  const strout = `<p>Phonebook has info for ${length} people</p>${currentDate}`;

  response.send(strout);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Phonebook.findById(id).then((phonebook) => {
    response.json(phonebook);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const originalLength = persons.length;
  persons = persons.filter((person) => person.id !== id);

  if (originalLength === persons.length) {
    response.status(404).json({ message: "Person not found!" });
    return;
  }

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const name = body.name;
  const number = body.number;

  if (!name || !number) {
    return response
      .status(400)
      .json({ error: "the name or number is missing!" });
  }

  const phonebook = new Phonebook({
    name: name,
    number: number,
  });

  phonebook.save().then((savedPhonebook) => {
    response.json(savedPhonebook);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
