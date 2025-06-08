import { getCompanions } from "../data/queries/get-companions.js"
import express from "express"

const router = express.Router();
const cache = {}
router.get("/:passenger_id/companions", async (req, res) => {
    const passengerId = req.params.passenger_id;
    const { page = 0, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const cacheKey = `${passengerId}-${page}-${limit}`;
    if (cache[cacheKey]) {
        console.log("Serving from cache");
        return res.json(cache[cacheKey]);
    }

    try {
        const result = await getCompanions(passengerId, pageNum, limitNum);
        cache[cacheKey] = result
        console.log("Fetched from DB and cached");
        res.json(result);
    } catch (error) {
        console.error('Error getting companions:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error retrieving companion data'
        });
    }
});

export default router