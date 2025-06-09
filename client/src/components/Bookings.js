import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    CircularProgress,
    Autocomplete
} from "@mui/material";
import { useBookings } from "../context/BookingsContext";
import TableBookings from "./TableBookings";

const bookingRefOptions = [
    "000004", "00000F", "000010", "000012", "000026", "00002D", "000034", "00003F",
    "000048", "00004A", "000050", "000055", "000061", "000067", "000068", "00006A",
    "00006B", "00007A", "00007C", "00007D", "00008F", "000090", "000099", "0000B0",
    "0000B3", "0000C8", "0000C9", "0000CD", "0000D0", "0000D9", "0000E0", "0000E2",
    "0000EF", "0000FB", "0000FE", "000101", "000103", "000104", "000112", "000137",
    "00013C", "000146", "00014B", "000151", "000155", "00015C", "00015D", "000161",
    "000178", "00017E", "000181", "000184", "000186", "000197", "000198", "00019E",
    "0001B2", "0001BB", "0001CE", "0001CF", "0001D1", "0001D3", "000204", "000207",
    "00020B", "00020C", "000210", "00021E", "000229", "000239", "000244", "000246",
    "000247", "000249", "00024B", "000253", "000255", "000258", "00025B", "000260",
    "000271", "000277", "000287", "00028E", "0002A0", "0002A7", "0002AB", "0002AD",
    "0002B2", "0002B5", "0002C2", "0002CD", "0002D8", "0002DB", "0002DF", "0002E0",
    "0002E6", "0002F0", "0002F3", "0002F8"
];

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
                <Box width={{ xs: '100%', sm: '100%', md: 500 }}
                    maxWidth="100%">
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Search Booking by Reference ID</Typography>
                        <Autocomplete
                            options={bookingRefOptions}
                            value={bookRefId}
                            onChange={(event, newValue) => setBookRefId(newValue || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Booking Reference ID"
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                            freeSolo  // Allows typing custom values
                            filterOptions={(options, { inputValue }) =>
                                options.filter(option =>
                                    option.toLowerCase().includes(inputValue.toLowerCase())
                                )
                            }
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
