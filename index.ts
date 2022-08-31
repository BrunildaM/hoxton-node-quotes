import express from "express";

const app = express();
const PORT = 4000;

type Quote = {
    id: number
    quote: string
    author: string
}

const quotes: Quote[] = [
  {
    id: 1,
    quote: `Tell me and I forget. Teach me and I remember. Involve me and I learn.`,
    author: `-Benjamin Franklin`,
  },
  {
    id: 2,
    quote: `Never let the fear of striking out keep you from playing the game.`,
    author: `-Babe Ruth`,
  },
  {
    id: 3,
    quote: `Remember that not getting what you want is sometimes a wonderful stroke of luck.`,
    author: `-Dalai Lama`,
  },
  {
    id: 4,
    quote: `Our lives begin to end the day we become silent about things that matter.`,
    author: `-Martin Luther King, Jr.`,
  },
  { id: 5,
    quote: `Do, or do not. There is no try.`, 
    author: `-Yoda` },
  {
    id: 6,
    quote: `We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.`,
    author: `-Maya Angelou`,
  }
];


app.get("/quotes", (req, res) => {
  res.send(quotes);
});

app.get('/randomQuote', (req,res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const quote = quotes[randomIndex]
    res.send(quote)
})

app.listen(PORT, () => {
  console.log(`Server up on: http://localhost:${PORT}`);
});
