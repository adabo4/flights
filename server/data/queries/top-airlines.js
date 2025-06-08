import { pool } from "../db.js"

export async function getTopAirlines(limit, page = 0, pageSize = 10) {

  const offset = page * pageSize;

  const dataQuery = `
   WITH ranked_flights AS (
    SELECT 
      f.flight_no,
      COUNT(bp.boarding_no) AS passenger_count
    FROM flights f
    JOIN boarding_passes bp ON f.flight_id = bp.flight_id
    GROUP BY f.flight_no
    ORDER BY passenger_count DESC, f.flight_no
    LIMIT $1
  )
  SELECT * FROM ranked_flights
  OFFSET $2
  LIMIT $3;
`   ;
  const totalQuery = `
  SELECT COUNT(*) AS total FROM (
    SELECT 
      f.flight_no
    FROM flights f
    JOIN boarding_passes bp ON f.flight_id = bp.flight_id
    GROUP BY f.flight_no
    ORDER BY COUNT(bp.boarding_no) DESC, f.flight_no
    LIMIT $1
  ) AS limited;

`;
  try {
    const dataResult = await pool.query(dataQuery, [limit, offset, pageSize]);
    const totalResult = await pool.query(totalQuery, [limit]);

    return {
      results: dataResult.rows,
      total: parseInt(totalResult.rows[0].total, 10),
      page,
      pageSize
    };

  } catch (error) {
    console.error(error)
    throw error
  }
}