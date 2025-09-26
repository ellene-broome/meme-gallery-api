// index.js
import express from 'express';
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Data (has to go above the routes)
let memes = [];

// The Routes
app.get('/memes', (req, res) => { res.json(memes); });

app.post('/memes', (req, res) => {
  const { title, url } = req.body;
  // to validate
  const newMeme = { id: memes.length + 1, title: title.trim(), url: url.trim() };
  memes.push(newMeme);             // This is the array push
  res.status(201).json(newMeme);
});

// Optional root
app.get('/', (req, res) => {
  res.send('👋 API running. Try GET /memes or POST /memes');
});

// 404 JSON (after routes)
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Error handler (must be last)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON' });
  }
  res.status(500).json({ error: 'Server error' });
});

// Listen (and now to listen)
const PORT = 3000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
