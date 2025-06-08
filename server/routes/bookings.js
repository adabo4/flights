import express from "express";
import getBookingDetail from "../data/queries/get-booking-detail.js"

const router = express.Router();

router.get("/:booking_id", async (req, res) => {
    const bookingId = req.params.booking_id;

    try {
        const result = await getBookingDetail(bookingId);
        res.json(result);

    } catch (error) {
        console.error('Error getting bookings:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error retrieving data'
        });


    }

})

export default router