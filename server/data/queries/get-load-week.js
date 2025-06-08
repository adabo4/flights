import { pool } from "../db.js";

export async function getLoadWeek(flightNo, page = 0, limit = 10) {

  const offset = page * limit;

  //     const dataQuery = `
  //    WITH seat_capacity AS (
  //   SELECT aircraft_code, COUNT(*) AS total_capacity
  //   FROM seats
  //   GROUP BY aircraft_code
  // ),
  // flight_passenger_data AS (
  //   SELECT 
  //     f.flight_id,
  //     f.flight_no,
  //     f.aircraft_code,
  //     f.scheduled_departure,
  //     COUNT(bp.boarding_no) AS passenger_count
  //   FROM flights f
  //   JOIN boarding_passes bp ON f.flight_id = bp.flight_id
  //   WHERE f.flight_no = $1
  //   GROUP BY f.flight_id, f.flight_no, f.scheduled_departure, f.aircraft_code
  // )
  // SELECT
  //   fpd.flight_no,
  //   ROUND(AVG(CASE WHEN EXTRACT(DOW FROM fpd.scheduled_departure) = 1 THEN 100.0 * fpd.passenger_count / sc.total_capacity END), 2) AS monday,
  //   ROUND(AVG(CASE WHEN EXTRACT(DOW FROM fpd.scheduled_departure) = 2 THEN 100.0 * fpd.passenger_count / sc.total_capacity END), 2) AS tuesday,
  //   ROUND(AVG(CASE WHEN EXTRACT(DOW FROM fpd.scheduled_departure) = 3 THEN 100.0 * fpd.passenger_count / sc.total_capacity END), 2) AS wednesday,
  //   ROUND(AVG(CASE WHEN EXTRACT(DOW FROM fpd.scheduled_departure) = 4 THEN 100.0 * fpd.passenger_count / sc.total_capacity END), 2) AS thursday,
  //   ROUND(AVG(CASE WHEN EXTRACT(DOW FROM fpd.scheduled_departure) = 5 THEN 100.0 * fpd.passenger_count / sc.total_capacity END), 2) AS friday,
  //   ROUND(AVG(CASE WHEN EXTRACT(DOW FROM fpd.scheduled_departure) = 6 THEN 100.0 * fpd.passenger_count / sc.total_capacity END), 2) AS saturday,
  //   ROUND(AVG(CASE WHEN EXTRACT(DOW FROM fpd.scheduled_departure) = 0 THEN 100.0 * fpd.passenger_count / sc.total_capacity END), 2) AS sunday
  // FROM flight_passenger_data fpd
  // JOIN seat_capacity sc ON fpd.aircraft_code = sc.aircraft_code
  // GROUP BY fpd.flight_no
  // LIMIT $2 OFFSET $3;
  //     `


  const dataQuery = `
SELECT
  flight_data.flight_no,
  ROUND(AVG(CASE WHEN EXTRACT(DOW FROM flight_data.scheduled_departure) = 1 THEN capacity END), 2) AS monday,
  ROUND(AVG(CASE WHEN EXTRACT(DOW FROM flight_data.scheduled_departure) = 2 THEN capacity END), 2) AS tuesday,
  ROUND(AVG(CASE WHEN EXTRACT(DOW FROM flight_data.scheduled_departure) = 3 THEN capacity END), 2) AS wednesday,
  ROUND(AVG(CASE WHEN EXTRACT(DOW FROM flight_data.scheduled_departure) = 4 THEN capacity END), 2) AS thursday,
  ROUND(AVG(CASE WHEN EXTRACT(DOW FROM flight_data.scheduled_departure) = 5 THEN capacity END), 2) AS friday,
  ROUND(AVG(CASE WHEN EXTRACT(DOW FROM flight_data.scheduled_departure) = 6 THEN capacity END), 2) AS saturday,
  ROUND(AVG(CASE WHEN EXTRACT(DOW FROM flight_data.scheduled_departure) = 0 THEN capacity END), 2) AS sunday
FROM (
  SELECT 
    f.flight_no,
    f.scheduled_departure,
    COUNT(bp.seat_no) * 100.0 / s.total_seats AS capacity
  FROM flights f
  JOIN boarding_passes bp ON f.flight_id = bp.flight_id
  JOIN (
    SELECT aircraft_code, COUNT(*) AS total_seats
    FROM seats
    GROUP BY aircraft_code
  ) s ON f.aircraft_code = s.aircraft_code
  WHERE f.flight_no = $1
  GROUP BY f.flight_id, f.flight_no, f.scheduled_departure, s.total_seats
) flight_data
GROUP BY flight_data.flight_no
LIMIT $2 OFFSET $3;
`

  try {

    const dataResult = await pool.query(dataQuery, [flightNo, limit, offset])

    return {
      results: dataResult.rows

    };

  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }

}