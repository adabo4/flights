import { pool } from "../db.js"

export default async function getAirlinesLoad(load, page, pageSize) {

    const offset = page * pageSize;

    const dataQuery =
        //     `
        //     SELECT     tp.flight_no,
        //         tp.passengers, 
        //         tc.total_seats,
        //         ROUND((100.0 * tp.passengers / tc.total_seats), 2) AS aircraft_capacity
        // FROM (
        //     SELECT  flight_no,
        //             COUNT(flight_no) AS passengers
        //     from flights
        //     JOIN boarding_passes bp ON bp.flight_id = flights.flight_id
        //     GROUP BY flight_no
        // ) tp
        // JOIN (
        //     SELECT  flights.flight_no, 
        //             COUNT(flights.flight_no) AS total_seats
        //     FROM flights
        //     JOIN seats ON seats.aircraft_code = flights.aircraft_code
        //     GROUP BY flights.flight_no
        // ) tc ON tc.flight_no = tp.flight_no
        // WHERE tp.flight_no = $1
        // ORDER BY flight_no;
        //     `

        `
      SELECT tp.flight_id,
               tp.passengers, 
               tc.total_seats,
               ROUND((100.0 * tp.passengers / tc.total_seats), 2) AS aircraft_capacity
        FROM (
            SELECT flights.flight_id, flights.flight_no,
                   COUNT(*) AS passengers
            FROM flights
            JOIN boarding_passes bp ON bp.flight_id = flights.flight_id
            GROUP BY flights.flight_id, flights.flight_no
        ) tp
        JOIN (
            SELECT flights.flight_no, 
                   COUNT(*) AS total_seats
            FROM flights
            JOIN seats ON seats.aircraft_code = flights.aircraft_code
            GROUP BY flights.flight_no
        ) tc ON tc.flight_no = tp.flight_no
        WHERE tp.flight_no = $1
        ORDER BY tp.flight_id
        LIMIT $2 OFFSET $3;
    `

    const totalQuery = `
   SELECT COUNT(*) AS total FROM (
            SELECT tp.flight_id
            FROM (
                SELECT flights.flight_id, flights.flight_no,
                       COUNT(*) AS passengers
                FROM flights
                JOIN boarding_passes bp ON bp.flight_id = flights.flight_id
                GROUP BY flights.flight_id, flights.flight_no
            ) tp
            JOIN (
                SELECT flights.flight_no, 
                       COUNT(*) AS total_seats
                FROM flights
                JOIN seats ON seats.aircraft_code = flights.aircraft_code
                GROUP BY flights.flight_no
            ) tc ON tc.flight_no = tp.flight_no
            WHERE tp.flight_no = $1
        ) AS loadairlines;
`

    //toto je moj vlastny select 
    // SELECT tp.flight_id, ROUND((tp.passengers * 100.0 / ts.total_seats), 2) as percentage_load
    // FROM (
    // 		SELECT flights.flight_id, count(flights.flight_id) as passengers
    // FROM flights
    // JOIN boarding_passes ON boarding_passes.flight_id = flights.flight_id
    // where flights.flight_no='PG0520'
    // GROUP BY flights.flight_id
    // ) tp
    // JOIN (
    // 	SELECT flight_id, count(flight_id) as total_seats
    // FROM flights
    // JOIN seats ON seats.aircraft_code = flights.aircraft_code
    // where flight_no='PG0520'
    // GROUP BY flights.flight_id
    // ) ts ON ts.flight_id=tp.flight_id;


    try {
        const dataResult = await pool.query(dataQuery, [load, pageSize, offset])
        const totalResult = await pool.query(totalQuery, [load])

        return {
            results: dataResult.rows,
            total: parseInt(totalResult.rows[0].total, 10)
        }



    } catch (error) {
        console.error("Error retrieving data.", error)
        throw error


    }


}