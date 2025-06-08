import { getDelayedFlights } from "../data/queries/get-flights.js";
import express from "express"


const router = express.Router();

const cache = new Map();
router.get("/late-departure/:delay", async (req, res) => {
    const { delay } = req.params;
    const { page = 0, limit = 2 } = req.query;
    const cacheKey = `${delay}-p${page}-l${limit}`;


    if (cache.has(cacheKey)) {
        console.log("Serving from cache");
        return res.json(cache.get(cacheKey));
    }


    console.log("Requested delay:", delay);


    try {
        const result = await getDelayedFlights(delay, page, limit)
        cache.set(cacheKey, result);
        res.json(result);

    } catch (error) {
        console.error('Error getting bookings:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error retrieving delayed flights.'
        });


    }
})

export default router