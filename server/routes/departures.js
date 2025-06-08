import express from "express"
import { getDepartures } from "../data/queries/get-departures.js"

const router = express.Router()

router.get("/", async (req, res) => {
    const { airport, day, page = 0, pageSize = 10 } = req.query

    try {
        const result = await getDepartures(airport, day, page, pageSize)
        res.json(result)
    } catch (error) {
        res.status(500).json(
            {
                status: "error",
                message: "Error retrieving data."

            }
        )


    }

})

export default router;