import Database from "better-sqlite3";

const db = Database("./db/data.db", { verbose: console.log });

function createQuoteStuff() {
  const quotes = [
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

  const createQuotesTable = db.prepare(`
CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER NOT NULL,
    quote TEXT NOT NULL,
    authorId INTEGER NOT NULL,
    PRIMARY KEY (id)
);`);

  createQuotesTable.run();

  const deleteAllQuotes = db.prepare(`
DELETE FROM quotes;
`);
  deleteAllQuotes.run();

  const createQuote = db.prepare(`
INSERT INTO quotes (quote, authorId) VALUES (?, ?);
`);

  for (let quote of quotes) {
    createQuote.run(quote.quote, quote.authorId);
  }
}

function createAuthorsStuff() {
  const authors = [
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

  const createAuthorsTable = db.prepare(`
      CREATE TABLE IF NOT EXISTS authors (
        id INTEGER NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        age INTEGER NOT NULL,
        image TEXT NOT NULL,
        PRIMARY KEY (id)
      );`);

  createAuthorsTable.run();

  const deleteAllAuthors = db.prepare(`
      DELETE FROM authors
      `);

  deleteAllAuthors.run();

  const createAuthor = db.prepare(`
      INSERT INTO authors (firstName, lastName, age, image) VALUES (?, ?, ?, ?);
      `);

  for (let author of authors) {
    createAuthor.run(
      author.firstName,
      author.lastName,
      author.age,
      author.image
    );
  }
}

createQuoteStuff();
createAuthorsStuff();
