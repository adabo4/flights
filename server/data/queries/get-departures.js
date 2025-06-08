import { pool } from "../db.js";

export async function getDepartures(airport_code, day, page, pageSize) {

    const airport = airport_code.trim().toUpperCase()

    const offset = parseInt(page, 10) * parseInt(pageSize, 10);


    const dataQuery =
        `
    SELECT flights.flight_id, flight_no, scheduled_departure
    FROM flights
    JOIN airports_data 
    ON flights.departure_airport = airports_data.airport_code
    WHERE airports_data.airport_code = $1 AND EXTRACT(DOW FROM scheduled_departure) = $2
    ORDER BY scheduled_departure, flight_id ASC
    LIMIT $3 OFFSET $4;
    `

    const totalQuery =
        `
    SELECT COUNT(*) AS total 
FROM 
(SELECT flights.flight_id, flight_no, scheduled_departure
    FROM flights
    JOIN airports_data 
    ON flights.departure_airport = airports_data.airport_code
    WHERE airports_data.airport_code = $1 AND EXTRACT(DOW FROM scheduled_departure) = $2
    ORDER BY scheduled_departure, flight_id ASC) as departed_flights;
    `

    //TODO prerobit na infinite scroll - bud cez cache alebo z query OFFSET
    try {
        const dataResult = await pool.query(dataQuery, [airport, day, pageSize, offset])
        const totalResult = await pool.query(totalQuery, [airport, day])


        return {
            results: dataResult.rows,
            total: parseInt(totalResult.rows[0].total, 10)
        }


    } catch (error) {
        console.error(error)
        throw error

    }

}