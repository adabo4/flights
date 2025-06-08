
import express from "express"
import { getLoadWeek } from "../data/queries/get-load-week.js"


const router = express.Router()
router.get("/:flight_no/load-week", async (req, res) => {

    const flightNo = req.params.flight_no;
    const { page = 0, limit = 10 } = req.query;


    try {

        const response = await getLoadWeek(flightNo, page, limit);
        const data = res.json(response);
        return data;

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error retrieving data."
        })

    }
})

export default router;