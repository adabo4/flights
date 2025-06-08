import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useBookings } from "../context/BookingsContext";
import TableBookings from "./TableBookings";

function Bookings() {
    const {
        result,
        bookRefId,
        setBookRefId,
        handleSubmit: fetchBooking,
        formatDate,
        isLoading
    } = useBookings();

    const booking_id = result?.result?.id;
    const book_date = result?.result?.book_date;
    return (
        <>

            {/* Booking Search Section */}
            <Grid item xs={12} display="flex" flexDirection="column" md={6} margin={5} maxWidth={1200}>
                <Box width={500}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Search Booking by Reference ID</Typography>
                        <TextField
                            label="Booking Reference ID"
                            fullWidth
                            value={bookRefId}
                            onChange={(e) => setBookRefId(e.target.value)}
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            onClick={fetchBooking}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={20} /> : "Fetch Booking"}
                        </Button>

                    </Paper>
                </Box>

                {
                    !isLoading && result && (
                        <>
                            <Box mt={3}>
                                <Typography variant="subtitle1">Booking Result:</Typography>
                                {booking_id && <h2>ID Rezervácie: {booking_id}</h2>}
                                {book_date ? (
                                    <p>Dátum a čas rezervácie: {formatDate(new Date(book_date))}</p>
                                ) : ""}
                                {result &&
                                    <TableBookings result={result} formatDate={formatDate} />}
                            </Box>


                        </>
                    )
                }
                {!isLoading && result !== null && (!result.result || !result.result.id) && (
                    <Box mt={2}><p>Žiadna rezervácia pod id {bookRefId}.</p></Box>
                )}

            </Grid >

        </>
    )
}

export default Bookings
