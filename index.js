// index.js
console.log('Server starting. PID:', process.pid);

import express from 'express';
const app = express();

// Parse JSON first
app.use(express.json());

// Logs: METHOD URL -> STATUS (Xms) Middleware
function logger(req, res, next) {
  const start = Date.now();

  // Visual for screenshots
  console.log(`→ ${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
  });
  next();
}
app.use(logger);


// Seeded data so /memes/1 exists
let memes = [
  { id: 1, title: "Distracted Boyfriend", url: "https://i.imgur.com/example1.jpg" },
  { id: 2, title: "Success Kid",         url: "https://i.imgur.com/example2.jpg" }
];

// Routes
app.get('/memes', (req, res) => {
  res.json(memes);
});

app.get("/memes/:id", (req, res) => {
  const { id } = req.params;
  const meme = memes.find(m => m.id === parseInt(id));
  if (!meme) return res.status(404).json({ error: "Meme not found" });
  res.json(meme);
});

app.post('/memes', (req, res) => {
  const { title, url } = req.body || {};
  if (!title?.trim() || !url?.trim()) {
    return res.status(400).json({ error: "Title and URL are required." });
  }
  const newMeme = { id: memes.length + 1, title: title.trim(), url: url.trim() };
  memes.push(newMeme);
  res.status(201).json(newMeme);
});

// UPDATE one (partial; blanks rejected)
// PUT /memes/:id
app.put('/memes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const meme = memes.find(m => m.id === id);
  if (!meme) return res.status(404).json({ error: 'Meme not found' });

  const { title, url } = req.body || {};

  // If a field is provided, it must not be blank
  if (title !== undefined && !String(title).trim()) {
    return res.status(400).json({ error: 'Title cannot be empty.' });
  }
  if (url !== undefined && !String(url).trim()) {
    return res.status(400).json({ error: 'URL cannot be empty.' });
  }

  if (title !== undefined) meme.title = String(title).trim();
  if (url !== undefined)   meme.url   = String(url).trim();

  res.json(meme);
});

// DELETE one
// DELETE /memes/:id
app.delete('/memes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = memes.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: 'Meme not found' });

  const [deletedMeme] = memes.splice(index, 1);
  res.json(deletedMeme); 
});

  

// Root route
app.get('/', (req, res) => {
  res.send('👋 API running. Try GET /memes, GET /memes/:id, POST /memes, or /error-test');
});

// 500 test
app.get("/error-test", (req, res) => {
  throw new Error("Test error");
});

// 404 JSON
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Centralized error handler (LAST)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Malformed JSON" });
  }
  console.error(err.stack || err);
  res.status(500).json({ error: "Something went wrong!" });
});

// and now Listen
const PORT = 3000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
