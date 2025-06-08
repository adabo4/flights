import { useBookings } from "../context/BookingsContext"
import Spinner from "./Spinner";
import TableBookings from "./TableBookings";


function Bookings_old() {
    const { result, bookRefId, setBookRefId, handleSubmit, formatDate, isLoading } = useBookings()

    const booking_id = result?.result?.id;
    const book_date = result?.result?.book_date;


    return (
        <div>
            <h2>Display Booking Reservation</h2>
            <input type="text" value={bookRefId} onChange={(e) => setBookRefId(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            {isLoading && <Spinner></Spinner>}

            {
                !isLoading && result && (
                    <>
                        {booking_id && <h2>ID Rezervácie: {booking_id}</h2>}
                        {book_date ? (
                            <p>Dátum a čas rezervácie: {formatDate(new Date(book_date))}</p>
                        ) : ""}
                        {result &&
                            <TableBookings result={result} formatDate={formatDate} />}
                    </>
                )
            }
            {!isLoading && result !== null && (!result.result || !result.result.id) && (
                <p>Žiadna rezervácia pod id {bookRefId}.</p>
            )}
        </div>
    )
}

export default Bookings_old
