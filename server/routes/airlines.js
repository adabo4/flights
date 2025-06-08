import express from "express"
import { getTopAirlines } from "../data/queries/top-airlines.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit) || 100;
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        const result = await getTopAirlines(limit, page, pageSize);
        res.json(result);
    } catch (error) {
        console.error('Error getting top airlines:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error retrieving data'
        });
    }
});

export default router;

