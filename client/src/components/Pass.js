import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    CircularProgress,
    Autocomplete  // ← Add this import
} from "@mui/material";
import { usePassengers } from "../context/PassengersContext";
import TablePassengers from "./TablePassengers";

// Add passenger ID options
const passengerIdOptions = [
    "0000 000343", "0000 004609", "0000 005006", "0000 005049", "0000 006712",
    "0000 007583", "0000 007973", "0000 008047", "0000 009779", "0000 013393",
    "0000 014891", "0000 020792", "0000 024170", "0000 026036", "0000 028097",
    "0000 032124", "0000 035204", "0000 037257", "0000 047129", "0000 048135",
    "0000 055597", "0000 058187", "0000 058618", "0000 059233", "0000 065245",
    "0000 071197", "0000 076149", "0000 079102", "0000 086236", "0000 087045",
    "0000 087900", "0000 093058", "0000 095410", "0000 102302", "0000 111175",
    "0000 111964", "0000 112600", "0000 113808", "0000 114552", "0000 119803",
    "0000 120792", "0000 126752", "0000 127846", "0000 157914", "0000 160657",
    "0000 165745", "0000 170295", "0000 173293", "0000 177449", "0000 181385",
    "0000 192479", "0000 193014", "0000 196371", "0000 204305", "0000 205344",
    "0000 213126", "0000 214126", "0000 217151", "0000 219361", "0000 221941",
    "0000 221961", "0000 225499", "0000 226451", "0000 233231", "0000 234211",
    "0000 235060", "0000 242411", "0000 245337", "0000 245842", "0000 248415",
    "0000 254249", "0000 257719", "0000 266574", "0000 267759", "0000 280266",
    "0000 283827", "0000 292065", "0000 292536", "0000 293315", "0000 299241",
    "0000 300340", "0000 301257", "0000 309800", "0000 311071", "0000 313518",
    "0000 315157", "0000 322927", "0000 335423", "0000 349171", "0000 355607",
    "0000 355920", "0000 359412", "0000 364144", "0000 365880", "0000 369502",
    "0000 373014", "0000 373841", "0000 376168", "0000 376174", "0000 378287"
];

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
                <Box width={{ xs: '100%', sm: '100%', md: 500 }}
                    maxWidth="100%">
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Get Passenger Companions</Typography>

                        {/* Replace TextField with Autocomplete */}
                        <Autocomplete
                            options={passengerIdOptions}
                            value={passengerId}
                            onChange={(event, newValue) => setPassengerId(newValue || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Passenger ID"
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
