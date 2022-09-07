import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const db = Database("./db/data.db", { verbose: console.log });
const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;

const getQuotes = db.prepare(`
SELECT * FROM quotes;
`);

const getQuoteById = db.prepare(`
SELECT * FROM quotes WHERE id = ?;
`);

const createQuote = db.prepare(`
INSERT INTO quotes (quote, authorId) VALUES (?, ?);
`);

const deleteQuote = db.prepare(`
DELETE FROM quotes WHERE id = ?;
`);

const updateQuote = db.prepare(`
UPDATE quotes SET quote = @quote, authorId = @author
WHERE id = @id;
`);

const getAuthors = db.prepare(`
SELECT * FROM authors;
`);

const getAuthorById = db.prepare(`
SELECT * FROM authors WHERE id = ?;
`);

const createAuthor = db.prepare(`
INSERT INTO authors (firstName, lastName, age, image) VALUES (?, ?);
`);

const deleteAuthor = db.prepare(`
DELETE FROM authors WHERE id = ?;
`);

const updateAuthor = db.prepare(`
UPDATE authors SET firstName = @firstName, lastName = @lastName, age = @age, image = @image
WHERE id = @id;
`);

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.get("/quotes", (req, res) => {
  const quotes = getQuotes.all();
  res.send(quotes);
});

app.get("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);
  const quote = getQuoteById.get(id);

  if (quote) {
    res.send(quote);
  } else {
    res.status(404).send({ error: "Quote not found" });
  }
});

app.post("/quotes", (req, res) => {
  const quote = req.body.quote;
  const authorId = req.body.authorId;

  let errors: string[] = [];

  if (typeof quote !== "string")
    errors.push("Make sure you have a quote and it is a string");
  if (typeof authorId !== "number")
    errors.push(
      "Make sure you have an author by his authorId and it is a number"
    );

  if (errors.length > 0) {
    res.status(400).send({ errors: errors });
  } else {
    const info = createQuote.run(quote, authorId);
    const newQuote = getQuoteById.get(info.lastInsertRowid);

    res.send(newQuote);
  }
});

app.patch("./quotes/:id", (req, res) => {
  const quoteToChange = getQuoteById.get(req.params);

  if (quoteToChange) {
    const newQuoteData = { ...quoteToChange, ...req.body };
    updateQuote.run(newQuoteData);
    res.send(newQuoteData);
  } else {
    res.status(404).send({ error: "Quote not found" });
  }
});

app.delete("./quotes/:id", (req, res) => {
  const info = deleteQuote.run(req.params);

  if (info.changes) {
    res.send({ message: "Quote deleted successfully!" });
  } else {
    res.status(404).send({ error: "Quote not found." });
  }
});

app.get("./authors", (req, res) => {
  const authors = getAuthors.all();
  res.send(authors);
});

app.get("./authors/:id", (req, res) => {
  const id = Number(req.params.id);
  const author = getAuthorById.get(id);

  if (author) {
    res.send(author);
  } else {
    res.status(404).send({ error: "Author not found" });
  }
});

app.post("/authors", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const age = req.body.age;
  const image = req.body.image;

  const errors: string[] = [];

  if (typeof firstName !== "string")
    errors.push("Make sure you have a firstName and it is a string");

  if (typeof lastName !== "string")
    errors.push("Make sure you have a lastName and it is a string");

  if (typeof age !== "number")
    errors.push("Make sure you have an age and it is a number");

  if (typeof image !== "string")
    errors.push("Make sure you have an image and it is a string");

  if (errors.length > 0) {
    res.status(400).send({ errors: errors });
  } else {
    const info = createAuthor.run(firstName, lastName, age, image);
    const author = getAuthorById.get(info.lastInsertRowid);

    res.send(author);
  }
});

app.patch("./authors/:id", (req, res) => {
  const author = getAuthorById.get(req.params);

  if (author) {
    const newAutorData = { ...author, ...req.body };
    updateAuthor.run(newAutorData);
    res.send(newAutorData);
  } else {
    res.status(404).send({ error: "Author not found" });
  }
});

app.delete("./autors/:id", (req, res) => {
  const info = deleteAuthor.run(req.params);

  if (info.changes) {
    res.send({ message: "Author deleted successfully!" });
  } else {
    res.status(404).send({ error: "Author not found." });
  }
});

app.listen(port, () => {
  console.log(`Server up on: http://localhost:${port}`);
});
