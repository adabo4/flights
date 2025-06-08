import { useTopAirlines } from "../context/TopAirlinesContext"
import TableTopAirlines from "./TableTopAirlines"
import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    CircularProgress
} from "@mui/material";

function TopAirlines() {

    const { limit, setLimit, handleSubmit, result: resultTopAirlines, isLoading: loadingTopAirlines } = useTopAirlines()
    console.log(resultTopAirlines?.results)
    return (
        <>

            <Grid item xs={12} md={6} margin={5} maxWidth={1200}>
                <Box width={500}>
                    <Paper elevation={3} sx={{ p: 3 }}>

                        <Typography variant="h6" gutterBottom>Enter number of airlines to display:</Typography>
                        <TextField
                            label="No. of airlines."
                            fullWidth
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            margin="normal"
                        />

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loadingTopAirlines}
                        >
                            {loadingTopAirlines ? <CircularProgress size={20} /> : "Fetch Companions"}
                        </Button>

                    </Paper>
                </Box>


                {
                    resultTopAirlines?.results?.length > 0 && (
                        <Box mt={3}>
                            {!loadingTopAirlines && resultTopAirlines && (
                                <TableTopAirlines></TableTopAirlines>
                            )}

                            {!loadingTopAirlines && resultTopAirlines?.results?.length === 0 && (
                                <p>No passengers found.</p>
                            )}
                        </Box>
                    )
                }
            </Grid>
            {/* <h2>Display Top Airlines</h2>
            <input type="text" value={limit} onChange={(e) => setLimit(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            {isLoading && <Spinner></Spinner>}
            {result && <TableTopAirlines />} */}
        </>
    )
}

export default TopAirlines
