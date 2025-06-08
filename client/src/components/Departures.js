import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    CircularProgress
} from "@mui/material";
import { useDepartures } from "../context/DeparturesContext"
import TableDepartures from "./TableDepartures"

function Departures() {
    const { airport, setAirport, day, setDay, handleSubmit, isLoading: loadingDepartures, result: resultDepartures } = useDepartures()
    return (
        <>

            <Grid item xs={12} md={6} margin={5} maxWidth={1200}>
                <Box width={500}>
                    <Paper elevation={3} sx={{ p: 3 }}>

                        <Typography variant="h6" gutterBottom>Enter airport and day to see planned flights:</Typography>
                        <TextField
                            label="Airport."
                            fullWidth
                            value={airport}
                            onChange={(e) => setAirport(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Day"
                            fullWidth
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loadingDepartures}
                        >
                            {loadingDepartures ? <CircularProgress size={20} /> : "Fetch Companions"}
                        </Button>

                    </Paper>
                </Box>


                {
                    resultDepartures?.results?.length > 0 && (
                        <Box mt={3}>
                            {!loadingDepartures && resultDepartures && (
                                <TableDepartures></TableDepartures>
                            )}

                            {!loadingDepartures && resultDepartures?.results?.length === 0 && (
                                <p>No passengers found.</p>
                            )}
                        </Box>
                    )
                }
            </Grid>

        </>
    )
}

export default Departures
