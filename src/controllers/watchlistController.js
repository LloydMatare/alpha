import {prisma} from '../config/db.js'

const addToWatchList = async (req,res) => {
    const {moviedId,status,rating,notes} = req.body

    //Verify if movie exists
    const movie = await prisma.movie.findUnique({
        where: {
            id: moviedId
        }
    })

    if(!movie){
        return res.status(404).json({message: 'Movie not found'})
    }

    //Check if movie is already in watchlist
    const watchlistItem = await prisma.watchlist.findFirst({
        where: {
            userId: req.user.id,
            movieId: moviedId
        }
    })

    if(watchlistItem){
        return res.status(400).json({message: 'Movie already in watchlist'})
    }

    const newWatchlistItem = await prisma.watchlist.create({
        data: {
            userId: req.user.id,
            movieId: moviedId,
            status,
            rating,
            notes
        }
    })

    res.status(201).json({message: 'Movie added to watchlist', data: newWatchlistItem})
}

export {addToWatchList}