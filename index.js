// index.js
import express from 'express';
import memeRoutes from './routes/memeRoutes.js';

const app = express();
app.use(express.json());

// debug confirming the router is mounted
app.use((req, res, next) => {
  console.log('HIT APP:', req.method, req.url);
  next();
});


// mount the router
app.use('/memes', memeRoutes);

// (optional) root
app.get('/', (req, res) => {
  res.send('👋 API running. Try GET /memes');
});

// 404 (must be after routes)
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// error handler (last)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON' });
  }
  console.error(err.stack || err);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
