
import { pool } from "../db.js";
export async function getCompanions(passengerId, page = 0, limit = 10) {
  const offset = page * limit;
  const query = `
            WITH target_passenger_flights AS (
            SELECT ticket_flights.flight_id
            FROM tickets
            JOIN ticket_flights ON tickets.ticket_no = ticket_flights.ticket_no
            WHERE tickets.passenger_id = $1
          ),
          fellow_passengers AS (
            SELECT tickets.passenger_id, tickets.passenger_name, ticket_flights.flight_id
            FROM tickets
            JOIN ticket_flights ON tickets.ticket_no = ticket_flights.ticket_no
            WHERE ticket_flights.flight_id IN (SELECT flight_id FROM target_passenger_flights)
            AND tickets.passenger_id != $1
          )
          SELECT 
            fp.passenger_id AS id,
            fp.passenger_name AS name,
            COUNT(DISTINCT fp.flight_id) AS flights_count,
            ARRAY_AGG(DISTINCT fp.flight_id ORDER BY fp.flight_id) AS flights
          FROM fellow_passengers fp
          GROUP BY fp.passenger_id, fp.passenger_name
          ORDER BY flights_count DESC, fp.passenger_id ASC
          LIMIT $2 OFFSET $3;
      `;


  const totalQuery = `
      WITH target_passenger_flights AS (
  SELECT ticket_flights.flight_id
  FROM tickets
  JOIN ticket_flights ON tickets.ticket_no = ticket_flights.ticket_no
  WHERE tickets.passenger_id = $1
),
fellow_passengers AS (
  SELECT tickets.passenger_id, tickets.passenger_name, ticket_flights.flight_id
  FROM tickets
  JOIN ticket_flights ON tickets.ticket_no = ticket_flights.ticket_no
  WHERE ticket_flights.flight_id IN (SELECT flight_id FROM target_passenger_flights)
  AND tickets.passenger_id != $1
),
grouped_passengers AS (
  SELECT 
    fp.passenger_id,
    fp.passenger_name
  FROM fellow_passengers fp
  GROUP BY fp.passenger_id, fp.passenger_name
)
SELECT COUNT(*) AS total FROM grouped_passengers;      
      `

  try {
    const result = await pool.query(query, [passengerId, limit, offset]);
    const countResult = await pool.query(totalQuery, [passengerId]);
    console.log(countResult)
    return {
      results: result.rows,
      total: parseInt(countResult.rows[0].total, 10),
    };
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

