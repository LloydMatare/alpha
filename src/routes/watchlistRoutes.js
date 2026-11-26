import express from 'express';
import {
  addToWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
} from '../controllers/watchlistController.js';
import { protect } from '../middlewares/protect.js';
import { authMiddleware } from './authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', addToWatchlist);
router.put('/:id', updateWatchlistItem);
router.delete('/:id', removeFromWatchlist);

export default router;
