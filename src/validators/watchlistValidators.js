import {z} from 'zod';

export const watchlistSchema = z.object({
  name: z.string().min(1, {message: 'Name is required'}),
  description: z.string().optional(),
  items: z.array(z.string()).optional(),
});

export const addToWatchlistSchema = z.object({
  movieId: z.string().min(1, {message: 'Movie ID is required'}).uuid({message: 'Invalid Movie ID'}),
  status: z.enum(['WATCHING', 'COMPLETED', 'ON_HOLD', 'DROPPED', 'PLAN_TO_WATCH'],{
    error: () =>{
        return {message: 'Invalid status'};
    }
  }).optional(),
  rating: z.coerce.number().int("Rating must be a whole number").min(0).max(10).optional(),
  notes: z.string().optional(),
});

export const updateWatchlistItemSchema = z.object({
  status: z.enum(['WATCHING', 'COMPLETED', 'ON_HOLD', 'DROPPED', 'PLAN_TO_WATCH'],{
    error: () =>{
        return {message: 'Invalid status'};
    }
  }).optional(),
  rating: z.coerce.number().int("Rating must be a whole number").min(0).max(10).optional(),
  notes: z.string().optional(),
});