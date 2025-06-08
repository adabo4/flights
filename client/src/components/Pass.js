import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    CircularProgress
} from "@mui/material";
import { usePassengers } from "../context/PassengersContext";
import TablePassengers from "./TablePassengers";

function PassPage() {

    const {
        result: companionsResult,
        passengerId,
        setPassengerId,
        handleSubmit: fetchCompanions,
        loading: loadingCompanions
    } = usePassengers();
    console.log(companionsResult)

    return (
        <>
            <Grid item xs={12} md={6} margin={5} maxWidth={1200}>
                <Box width={500}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Get Passenger Companions</Typography>
                        <TextField
                            label="Passenger ID"
                            fullWidth
                            value={passengerId}
                            onChange={(e) => setPassengerId(e.target.value)}
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            onClick={fetchCompanions}
                            disabled={loadingCompanions}
                        >
                            {loadingCompanions ? <CircularProgress size={20} /> : "Fetch Companions"}
                        </Button>
                    </Paper>
                </Box>



                {companionsResult?.results?.length > 0 && (
                    <Box mt={3}>

                        {!loadingCompanions && companionsResult && (
                            <TablePassengers result={companionsResult}></TablePassengers>
                        )}

                        {!loadingCompanions && companionsResult?.results?.length === 0 && (
                            <p>No passengers found.</p>
                        )}
                    </Box>
                )}

            </Grid >
        </>


    );
}

export default PassPage;
