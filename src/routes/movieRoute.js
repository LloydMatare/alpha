import express from 'express';

const router = express.Router();

router.get('/movies', (req, res) => {
    res.send('List of movies');
});

router.post('/movies', (req, res) => {
    res.send('Movie added');
});

router.put('/movies', (req, res) => {
    res.send('Movie updated');
});

router.delete('/movies', (req, res) => {
    res.send('Movie deleted');
});

export default router;
