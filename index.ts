import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

type Quote = {
  id: number;
  quote: string;
  authorId: number;
};

type Author = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
};

let authors: Author[] = [
  {
    id: 1,
    firstName: `-Benjamin `,
    lastName: "Franklin",
    age: 84,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Benjamin_Franklin_by_Jean-Baptiste_Greuze.jpg",
  },
  {
    id: 2,
    firstName: `-Babe `,
    lastName: "Ruth",
    age: 53,
    image:
      "https://www.biography.com/.image/t_share/MTgwMTU2NjQxNTU4MTQ0MzQ0/gettyimages-517324714.jpg",
  },
  {
    id: 3,
    firstName: `-Dalai `,
    lastName: "Lama",
    age: 87,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/The_14th_Dalal_Lama_as_a_child%2C_1940s.jpg/220px-The_14th_Dalal_Lama_as_a_child%2C_1940s.jpg",
  },
  {
    id: 4,
    firstName: `-Martin Luther `,
    lastName: "King, Jr.",
    age: 39,
    image:
      "https://www.biography.com/.image/t_share/MTE5NTU2MzE2MjgwNDg5NDgz/martin-luther-king-jr-9365086-2-402.jpg",
  },
  {
    id: 5,
    firstName: `-Yoda`,
    lastName: "",
    age: 900,
    image:
      "https://static.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125",
  },
  {
    id: 6,
    firstName: `-Maya `,
    lastName: "Angelou",
    age: 86,
    image:
      "https://www.biography.com/.image/t_share/MTQ3NjM5NTA5NjU4Mzc5NjUy/maya_angelou_photo_by_deborah_feingold_corbis_entertainment_getty_533084708.jpg",
  },
];

let quotes: Quote[] = [
  {
    id: 1,
    quote: `Tell me and I forget. Teach me and I remember. Involve me and I learn.`,
    authorId: 1,
  },
  {
    id: 2,
    quote: `Never let the fear of striking out keep you from playing the game.`,
    authorId: 2,
  },
  {
    id: 3,
    quote: `Remember that not getting what you want is sometimes a wonderful stroke of luck.`,
    authorId: 3,
  },
  {
    id: 4,
    quote: `Our lives begin to end the day we become silent about things that matter.`,
    authorId: 4,
  },
  {
    id: 5,
    quote: `Do, or do not. There is no try.`,
    authorId: 5,
  },
  {
    id: 6,
    quote: `We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.`,
    authorId: 6,
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.get("/quotes", (req, res) => {
  let quotesCopy = JSON.parse(JSON.stringify(quotes));

  for (const quote of quotesCopy) {
    const author = authors.find((author) => author.id === quote.authorId);
    quote.author = author;
  }

  res.send(quotes);
});

app.get("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = quotes.find((quote) => quote.id === id);

  if (match) {
    res.send(match);
  } else {
    res.status(404).send({ error: "Quote not found" });
  }
});

app.get("/randomQuote", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  res.send(quote);
});

app.post("/quotes", (req, res) => {
  const errors: string[] = [];

  if (typeof req.body.quote !== "string")
    errors.push("Make sure you have a quote and it is a string");
  if (typeof req.body.authorId !== "number")
    errors.push(
      "Make sure you have an author by his authorId and it is a number"
    );

  if (errors.length === 0) {
    let quote: Quote = {
      id: Math.random(),
      quote: req.body.quote,
      authorId: req.body.authorId,
      //   firstName: req.body.firstName,
      //   lastName: req.body.lastName,
      //   age: req.body.age,
      //   image: req.body.image,
    };

    quotes.push(quote);

    res.send(quote);
  } else {
    res.status(400).send({ errors: errors });
  }
});

app.patch("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);

  const { quote, authorId } = req.body;

  const match = quotes.find((quote) => quote.id === id);

  if (match) {
    if (typeof quote === "string") match.quote = quote;
    if (typeof authorId === "number") match.authorId = authorId;

    // if (typeof firstName === "string") match.firstName = firstName;
    // if (typeof lastName === "string") match.lastName = lastName;
    // if (typeof age === "number") match.age = age;
    // if (typeof image === "string") match.image = image;
    res.send(match);
  } else {
    res.status(404).send({ error: "We could not find this id" });
  }
});

app.delete("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);

  const match = quotes.find((quote) => quote.id === id);

  if (match) {
    quotes = quotes.filter((quote) => quote.id !== id);
    res.send({ message: "Quote deleted successfully!" });
  } else {
    res.status(404).send({ error: "Quote not found!" });
  }
});

app.get("/authors", (req, res) => {
  const authorsCopy = JSON.parse(JSON.stringify(authors));

  for (const author of authorsCopy) {
    const quotesByAuthor = quotes.filter(
      (quote) => quote.authorId === author.id
    );
    author.quotes = quotesByAuthor;
  }
  res.send(authors);
});

app.post("/authors", (req, res) => {
  const errors: string[] = [];

  if (typeof req.body.firstName !== "string")
    errors.push("Make sure you have a firstName and it is a string");

  if (typeof req.body.lastName !== "string")
    errors.push("Make sure you have a lastName and it is a string");

  if (typeof req.body.age !== "number")
    errors.push("Make sure you have an age and it is a number");

  if (typeof req.body.image !== "string")
    errors.push("Make sure you have an image and it is a string");

  if (errors.length === 0) {
    const author: Author = {
      id: Math.random(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      image: req.body.image,
    };

    authors = [...authors, author];
    res.send(author);
  } else {
    res.status(400).send({ errors: errors });
  }
});

app.listen(PORT, () => {
  console.log(`Server up on: http://localhost:${PORT}`);
});
