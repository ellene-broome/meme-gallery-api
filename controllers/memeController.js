// controllers/memeController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const notBlank = (s) => typeof s === 'string' && s.trim().length > 0;

// GET /memes
export const getMemes = async (req, res, next) => {
  try {
    const memes = await prisma.meme.findMany({
      orderBy: { id: 'asc' },
      include: { user: { select: { id: true, username: true } } },
    });
    res.json(memes);
  } catch (err) { next(err); }
};

// GET /memes/:id
export const getMemeById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });

    const meme = await prisma.meme.findUnique({ where: { id } });
    if (!meme) return res.status(404).json({ error: 'Meme not found' });

    res.json(meme);
  } catch (err) { next(err); }
};

// POST /memes
export const createMeme = async (req, res, next) => {
  try {
    const { title, url, userId } = req.body;

    if (!notBlank(title) || !notBlank(url)) {
      return res.status(400).json({ error: 'Title and URL are required.' });
    }
    const uid = Number(userId);
    if (!Number.isInteger(uid)) {
      return res.status(400).json({ error: 'userId must be an integer' });
    }

    const meme = await prisma.meme.create({
      data: { title: title.trim(), url: url.trim(), userId: uid },
    });
    res.status(201).json(meme);
  } catch (err) {
    if (err.code === 'P2003') {            // FK violation
      return res.status(400).json({ error: 'Invalid userId (foreign key)' });
    }
    next(err);
  }
};

// PUT /memes/:id
export const updateMeme = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });

    const { title, url, userId } = req.body;
    const data = {};

    if (title !== undefined) {
      if (!notBlank(title)) return res.status(400).json({ error: 'Title cannot be empty.' });
      data.title = title.trim();
    }
    if (url !== undefined) {
      if (!notBlank(url)) return res.status(400).json({ error: 'URL cannot be empty.' });
      data.url = url.trim();
    }
    if (userId !== undefined) {
      const uid = Number(userId);
      if (!Number.isInteger(uid)) return res.status(400).json({ error: 'userId must be an integer' });
      data.userId = uid;
    }

    const meme = await prisma.meme.update({ where: { id }, data });
    res.json(meme);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Meme not found' }); // record not found
    if (err.code === 'P2003') return res.status(400).json({ error: 'Invalid userId (foreign key)' });
    next(err);
  }
};

// DELETE /memes/:id
export const deleteMeme = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });

    const meme = await prisma.meme.delete({ where: { id } });
    res.json(meme);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Meme not found' });
    next(err);
  }
};
