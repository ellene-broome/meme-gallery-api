// controllers/memeController.js

// In-memory "model" so /memes/1 exists after each restart
let memes = [
  { id: 1, title: 'Distracted Boyfriend', url: 'https://i.imgur.com/example1.jpg' },
  { id: 2, title: 'Success Kid',          url: 'https://i.imgur.com/example2.jpg' },
];

const parseId = (req) => parseInt(req.params.id, 10);

export const getMemes = (req, res) => {
  res.json(memes);
};

export const getMemeById = (req, res) => {
  const id = parseId(req);
  const meme = memes.find((m) => m.id === id);
  if (!meme) return res.status(404).json({ error: 'Meme not found' });
  res.json(meme);
};

export const createMeme = (req, res) => {
  const { title, url } = req.body || {};
  if (!title?.trim() || !url?.trim()) {
    return res.status(400).json({ error: 'Title and URL are required.' });
  }
  const newMeme = { id: memes.length + 1, title: title.trim(), url: url.trim() };
  memes.push(newMeme);
  res.status(201).json(newMeme);
};

export const updateMeme = (req, res) => {
  const id = parseId(req);
  const meme = memes.find((m) => m.id === id);
  if (!meme) return res.status(404).json({ error: 'Meme not found' });

  const { title, url } = req.body || {};
  if (title !== undefined && !String(title).trim()) {
    return res.status(400).json({ error: 'Title cannot be empty.' });
  }
  if (url !== undefined && !String(url).trim()) {
    return res.status(400).json({ error: 'URL cannot be empty.' });
  }

  if (title !== undefined) meme.title = String(title).trim();
  if (url !== undefined) meme.url = String(url).trim();

  res.json(meme);
};

export const deleteMeme = (req, res) => {
  const id = parseId(req);
  const index = memes.findIndex((m) => m.id === id);
  if (index === -1) return res.status(404).json({ error: 'Meme not found' });
  const deleted = memes.splice(index, 1)[0];
  res.json(deleted);
};

