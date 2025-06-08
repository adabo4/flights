import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from "./data/db.js";
import passengersRouter from "./routes/passengers.js"
import bookingRouter from "./routes/bookings.js"
import delayedFlightsRouter from "./routes/delayed-flights.js"
import airlinesRouter from "./routes/airlines.js"
import departureRouter from "./routes/departures.js"
import airportDestinationRouter from "./routes/airports-destinations.js"
import airlinesLoad from "./routes/airlines-load.js"
import loadWeekRouter from "./routes/load-week.js"


const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/passengers", passengersRouter)
app.use("/bookings", bookingRouter)
app.use("/flights", delayedFlightsRouter)
app.use("/top-airlines", airlinesRouter)
app.use("/departures", departureRouter)
app.use("/airports", airportDestinationRouter)
app.use("/airlines", airlinesLoad)
app.use("/airlines", loadWeekRouter)


connectDatabase();

const router = express.Router();


// Routes
router.get('/', (req, res) => {
    res.send('Express server is running!');
});

// : GET /v1/passengers/:passenger_id/companions

// app.get("/v1/passengers/:passenger_id/companions", async (req, res) => {
//     const passangerId = req.params.passenger_id;

//     const result = await getCompanions(passangerId)
//     res.json(result.rows);

// })

//GET /v1/bookings/:booking_id
// GET /v1/passengers/:passenger_id/companions
// GET /v1/flights/late-departure/:delay
// GET /v1/top-airlines?limit=:limit
// GET /v1/departures?airport=:airport&day=:day
// GET /v1/airlines/:flight_no/load
// GET /v1/airlines/:flight_no/load-week






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




