import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    CircularProgress
} from "@mui/material";
import { useDelayedFlights } from "../context/DelayedFlightsContext"
import TableDelayedFlights from "./TableDelayedFlights"

function DelayedFlights() {
    const { result: delayedFlightsResult, delay, setDelay, handleSubmit, isLoading: loadingDelayedFlights } = useDelayedFlights();

    return (
        <>
            <Grid item xs={12} md={6} margin={5} maxWidth={1200}>
                <Box
                    width={{ xs: '100%', sm: '100%', md: 500 }}
                    maxWidth="100%"
                >
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Get Delayed Flights</Typography>

                        <TextField
                            label="Delay time (min)"
                            fullWidth
                            value={delay}
                            onChange={(e) => setDelay(e.target.value)}
                            margin="normal"
                            type="number"  // ← Add number input type
                        />

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loadingDelayedFlights}
                            fullWidth  // ← Make button full width on mobile
                        >
                            {loadingDelayedFlights ? <CircularProgress size={20} /> : "Fetch Delayed Flights"}
                        </Button>
                    </Paper>
                </Box>

                {delayedFlightsResult?.results?.length > 0 && (
                    <Box mt={3}>
                        {!loadingDelayedFlights && delayedFlightsResult && (
                            <TableDelayedFlights></TableDelayedFlights>
                        )}

                        {!loadingDelayedFlights && delayedFlightsResult?.results?.length === 0 && (
                            <p>No delayed flights found.</p>
                        )}
                    </Box>
                )}
            </Grid>
        </>
    )
}

export default DelayedFlights
