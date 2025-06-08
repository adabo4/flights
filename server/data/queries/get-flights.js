import { pool } from "../db.js";

export async function getDelayedFlights(delay, page = 0, limit = 10) {

    const offset = page * limit;

    const dataQuery = ` 
    SELECT * 
        FROM (
        SELECT  flight_id,
                flight_no,
                FLOOR(EXTRACT(EPOCH FROM (actual_departure - scheduled_departure))) AS delay
        FROM flights
        WHERE actual_departure IS NOT NULL
    ) AS delays
    WHERE delay >= $1
    ORDER BY delay ASC, flight_id ASC
     LIMIT $2 OFFSET $3;    
    `
    const countQuery = ` 
 SELECT COUNT(*) AS total
FROM (
    SELECT FLOOR(EXTRACT(EPOCH FROM (actual_departure - scheduled_departure))) AS delay
    FROM flights
    WHERE actual_departure IS NOT NULL
) AS delays
WHERE delay >= $1;
   
    `

    try {
        const dataResult = await pool.query(dataQuery, [delay, limit, offset]);
        const countResult = await pool.query(countQuery, [delay]);


        return {
            results: dataResult.rows,
            total: parseInt(countResult.rows[0].total, 10),

        };

    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }

}