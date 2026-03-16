const express = require("express");
const app = express();

app.use(express.json());

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/info", (request, response) => {
    const length = persons.length;
    const currentDate = new Date();
    const strout = `<p>Phonebook has info for ${length} people</p>${currentDate}`;

    response.send(strout);
});

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = persons.find((note) => note.id === id);

    if (!person) {
        response.status(404).json({ error: "content not found!" });
        return;
    }

    response.status(200).json(person);
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
    const name = body.name;
    const number = body.number;
    console.log(name, number);
    const id = Math.floor(Math.random() * 1_000_000).toString();

    const newPerson = {
        id: id,
        name: name,
        number: number,
    };

    persons = persons.concat(newPerson);

    response.status(200).json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
