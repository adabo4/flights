
import { useAirportDestinations } from "../context/AirportDestinationsContext"
import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    CircularProgress
} from "@mui/material";

import TableAirportDestinations from "./TableAirportDestinations"

function AirportDestinations() {
    const { airport, setAirport, handleSubmit, isLoading: loadingAirportDestinations, result: AirportDestinationsResult } = useAirportDestinations()
    return (
        <>
            <Grid item xs={12} md={6} margin={5} maxWidth={1200}>
                <Box width={500}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>nter an airport code to see destination airports:</Typography>
                        <TextField
                            label="Airport Code"
                            fullWidth
                            value={airport}
                            onChange={(e) => setAirport(e.target.value)}
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loadingAirportDestinations}
                        >
                            {loadingAirportDestinations ? <CircularProgress size={20} /> : "Fetch Companions"}
                        </Button>
                    </Paper>
                </Box>



                {AirportDestinationsResult?.results?.length > 0 && (
                    <Box mt={3}>

                        {!loadingAirportDestinations && AirportDestinationsResult && (
                            <TableAirportDestinations></TableAirportDestinations>
                        )}

                        {!loadingAirportDestinations && AirportDestinationsResult?.results?.length === 0 && (
                            <p>No results found.</p>
                        )}
                    </Box>
                )}

            </Grid >

        </>
    )
}

export default AirportDestinations
