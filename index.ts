import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;

type Quote = {
  id: number;
  quote: string;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
};

const quotes: Quote[] = [
  {
    id: 1,
    quote: `Tell me and I forget. Teach me and I remember. Involve me and I learn.`,
    firstName: `-Benjamin `,
    lastName: "Franklin",
    age: 84,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Benjamin_Franklin_by_Jean-Baptiste_Greuze.jpg",
  },
  {
    id: 2,
    quote: `Never let the fear of striking out keep you from playing the game.`,
    firstName: `-Babe `,
    lastName: "Ruth",
    age: 53,
    image:
      "https://www.biography.com/.image/t_share/MTgwMTU2NjQxNTU4MTQ0MzQ0/gettyimages-517324714.jpg",
  },
  {
    id: 3,
    quote: `Remember that not getting what you want is sometimes a wonderful stroke of luck.`,
    firstName: `-Dalai `,
    lastName: "Lama",
    age: 87,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/The_14th_Dalal_Lama_as_a_child%2C_1940s.jpg/220px-The_14th_Dalal_Lama_as_a_child%2C_1940s.jpg",
  },
  {
    id: 4,
    quote: `Our lives begin to end the day we become silent about things that matter.`,
    firstName: `-Martin Luther `,
    lastName: "King, Jr.",
    age: 39,
    image:
      "https://www.biography.com/.image/t_share/MTE5NTU2MzE2MjgwNDg5NDgz/martin-luther-king-jr-9365086-2-402.jpg",
  },
  {
    id: 5,
    quote: `Do, or do not. There is no try.`,
    firstName: `-Yoda`,
    lastName: "",
    age: 900,
    image:
      "https://static.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125",
  },
  {
    id: 6,
    quote: `We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.`,
    firstName: `-Maya `,
    lastName: "Angelou",
    age: 86,
    image:
      "https://www.biography.com/.image/t_share/MTQ3NjM5NTA5NjU4Mzc5NjUy/maya_angelou_photo_by_deborah_feingold_corbis_entertainment_getty_533084708.jpg",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.get("/quotes", (req, res) => {
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

  if (typeof req.body.firstName !== "string")
    errors.push("Make sure you have a firstName and it is a string");

  if (typeof req.body.lastName !== "string")
    errors.push("Make sure you have a lastName and it is a string");

  if (typeof req.body.age !== "number")
    errors.push("Make sure you have an age and it is a number");

  if (typeof req.body.quote !== "string")
    errors.push("Make sure you have an image and it is a string");

  if (errors.length === 0) {
    let quote: Quote = {
      id: Math.random(),
      quote: req.body.quote,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      image: req.body.image,
    };

    quotes.push(quote)

    res.send(quote)
  } else {
    res.status(400).send({errors: errors})
  }

 
});

app.listen(PORT, () => {
  console.log(`Server up on: http://localhost:${PORT}`);
});
