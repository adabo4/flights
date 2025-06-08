import { pool } from "../db.js"

export async function getAirportDestinations(airport, page, pageSize) {

    const offset = page * pageSize;

    //     const query = `
    //     SELECT array_agg(DISTINCT arrival_airport ORDER BY arrival_airport ASC) AS destinations
    //     FROM flights
    //     WHERE departure_airport = $1;

    // `;

    const dataQuery = `
SELECT DISTINCT(arrival_airport) FROM flights
WHERE departure_airport=$1
LIMIT $2 OFFSET $3;
`

    const totalQuery = `
SELECT COUNT(DISTINCT(arrival_airport)) as total FROM flights
WHERE departure_airport=$1;
`

    try {
        const airportCode = airport.trim().toUpperCase();
        const dataResult = await pool.query(dataQuery, [airportCode, pageSize, offset])
        const totalResult = await pool.query(totalQuery, [airportCode])

        return {
            results: dataResult.rows.map((row) => row.arrival_airport),
            total: parseInt(totalResult.rows[0].total),
        };

    } catch (error) {
        console.error('Error executing query:', error);
        throw error;

    }

}