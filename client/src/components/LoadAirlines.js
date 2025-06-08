import { useLoadAirlines } from "../context/LoadAirlinesContext"
import TableLoadAirlines from "./TableLoadAirlines"
import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    CircularProgress
} from "@mui/material";


function LoadAirlines() {
    const { result: loadAirlinesResult, flightNo, setFlightNo, isLoading: loadingAirlinesLoad, handleSubmit } = useLoadAirlines()
    return (
        <>
            <Grid item xs={12} md={6} margin={5} maxWidth={1200}>
                <Box width={500}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Get Airlines Load</Typography>
                        <TextField
                            label="Flight No."
                            fullWidth
                            value={flightNo}
                            onChange={(e) => setFlightNo(e.target.value)}
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loadingAirlinesLoad}
                        >
                            {loadingAirlinesLoad ? <CircularProgress size={20} /> : "Fetch Companions"}
                        </Button>
                    </Paper>
                </Box>



                {loadAirlinesResult?.results?.length > 0 && (
                    <Box mt={3}>

                        {!loadingAirlinesLoad && loadAirlinesResult && (
                            <TableLoadAirlines></TableLoadAirlines>
                        )}

                        {!loadingAirlinesLoad && loadAirlinesResult?.results?.length === 0 && (
                            <p>No results found.</p>
                        )}
                    </Box>
                )}

            </Grid >

        </>
    )
}

export default LoadAirlines
