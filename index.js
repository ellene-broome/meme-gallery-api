// index.js
import express from 'express';
const app = express();

// 1) Middleware to parse JSON
app.use(express.json());

// 2) In-memory data (seed so /memes/1 exists for testing Seeding gives you predictable, ready-to-test data every time the server starts)
let memes = [
  { id: 1, title: "Distracted Boyfriend", url: "https://i.imgur.com/example1.jpg" },
  { id: 2, title: "Success Kid",         url: "https://i.imgur.com/example2.jpg" }
];

// 3) Routes

// GET all
app.get('/memes', (req, res) => {
  res.json(memes);
});

// GET one by id (Day 2)
app.get("/memes/:id", (req, res) => {
  const { id } = req.params;                // "1" as a string
  const meme = memes.find(m => m.id === parseInt(id)); // convert to number, then compare
  if (!meme) {
    return res.status(404).json({ error: "Meme not found" });
  }
  res.json(meme);
});

// POST create (with safe validation)
app.post('/memes', (req, res) => {
  const { title, url } = req.body || {};
  if (!title?.trim() || !url?.trim()) {
    return res.status(400).json({ error: "Title and URL are required." });
  }
  const newMeme = { id: memes.length + 1, title: title.trim(), url: url.trim() };
  memes.push(newMeme);
  res.status(201).json(newMeme);
});

// Friendly root
app.get('/', (req, res) => {
  res.send('👋 API running. Try GET /memes, GET /memes/:id, or POST /memes');
});

// 404 JSON (after routes)
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Error handler (last) — catches malformed JSON, etc.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON' });
  }
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

// Listen
const PORT = 3000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
