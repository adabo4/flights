import { pool } from "../db.js";

export default async function getBookingDetail(booking_id) {

  const query = `
 SELECT bt.book_ref, 
       bt.book_date, 
	   bt.ticket_no, 
	   bt.passenger_id, 
	   bt.passenger_name, 
	   bn.boarding_no, 
	   bn.seat_no,
	   bn.flight_id,
	   flights.flight_no, 
 		flights.aircraft_code, 
		flights.arrival_airport, 
		flights.departure_airport, 
		flights.scheduled_arrival, 
		flights.scheduled_departure
FROM (
	SELECT tickets.book_ref, 
       book_date, 
	   tickets.ticket_no,
	   tickets.passenger_id, 
	   tickets.passenger_name
	FROM bookings
	JOIN tickets ON tickets.book_ref = bookings.book_ref
) bt
JOIN (
    SELECT boarding_passes.boarding_no, 
	       boarding_passes.seat_no, 
	       boarding_passes.ticket_no,
	  	   boarding_passes.flight_id
    FROM boarding_passes
    JOIN tickets ON tickets.ticket_no = boarding_passes.ticket_no
) bn ON  bt.ticket_no = bn.ticket_no
JOIN flights ON flights.flight_id = bn.flight_id
WHERE book_ref=$1;
  `

  try {
    const res = await pool.query(query, [booking_id]);
    const rows = res.rows;

    if (rows.length === 0) {
      return { result: null };
    }

    const booking = {
      id: rows[0].book_ref,
      book_date: rows[0].book_date,
      boarding_passes: rows.map(row => ({
        id: row.ticket_no,
        passenger_id: row.passenger_id,
        passenger_name: row.passenger_name,
        boarding_no: row.boarding_no,
        flight_no: row.flight_no,
        seat: row.seat_no,
        aircraft_code: row.aircraft_code,
        arrival_airport: row.arrival_airport,
        departure_airport: row.departure_airport,
        scheduled_arrival: row.scheduled_arrival,
        scheduled_departure: row.scheduled_departure
      }))
    };

    return { result: booking };

  } catch (error) {
    console.error(error)
    throw error;

  }

}