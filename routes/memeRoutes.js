// routes/memeRoutes.js
import express from 'express';
import {
  getMemes,
  getMemeById,
  createMeme,
  updateMeme,
  deleteMeme,
  // _debugReset, // (optional) dev-only
} from '../controllers/memeController.js';

const router = express.Router();

// debugging 
router.use((req, _res, next) => {
  // Print whenever a request hits this router
  console.log('HIT ROUTER:', req.method, req.baseUrl, req.path);
  next();
});

// dev-only reset route (Can be commented out in production)
// router.post('/_debug/reset', _debugReset);

router.get('/', getMemes);        // → /memes
router.get('/:id', getMemeById);  // → memes/:id
router.post('/', createMeme);     // → memes
router.put('/:id', updateMeme);   // → memes/:id
router.delete('/:id', deleteMeme); // → memes/:id

export default router;
