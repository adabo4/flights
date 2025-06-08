import express from "express"
import getAirlinesLoad from "../data/queries/get-airlines-load.js"

const router = express.Router()

router.get("/:flight_no/load", async (req, res) => {
    const { flight_no } = req.params;
    const { page = 0, pageSize = 10 } = req.query;


    try {
        const result = await getAirlinesLoad(flight_no, parseInt(page), parseInt(pageSize));
        return res.json(result);

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error retreving data."
        })
    };
})



export default router;