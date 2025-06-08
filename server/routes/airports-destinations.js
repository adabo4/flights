import express from "express"
import { getAirportDestinations } from "../data/queries/get-airports-destinations.js";

const router = express.Router()


router.get("/:airport/destinations", async (req, res) => {

    const { airport } = req.params;
    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        const result = await getAirportDestinations(airport, page, pageSize)
        return res.json(result)

    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "error",
            message: "Error retrieving data."
        })
    }

})




export default router;