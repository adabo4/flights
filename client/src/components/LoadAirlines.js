import { useLoadAirlines } from "../context/LoadAirlinesContext"
import TableLoadAirlines from "./TableLoadAirlines"
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

const flightNoOptions = [
    "PG0001", "PG0002", "PG0003", "PG0004", "PG0005", "PG0006", "PG0007", "PG0008",
    "PG0009", "PG0010", "PG0011", "PG0012", "PG0013", "PG0014", "PG0015", "PG0016",
    "PG0017", "PG0018", "PG0019", "PG0020", "PG0021", "PG0022", "PG0023", "PG0024",
    "PG0025", "PG0026", "PG0027", "PG0028", "PG0029", "PG0030", "PG0031", "PG0032",
    "PG0033", "PG0034", "PG0035", "PG0036", "PG0037", "PG0038", "PG0039", "PG0040",
    "PG0041", "PG0042", "PG0043", "PG0044", "PG0045", "PG0046", "PG0047", "PG0048",
    "PG0049", "PG0050", "PG0051", "PG0052", "PG0053", "PG0054", "PG0055", "PG0056",
    "PG0057", "PG0058", "PG0059", "PG0060", "PG0061", "PG0062", "PG0063", "PG0064",
    "PG0065", "PG0066", "PG0067", "PG0068", "PG0069", "PG0070", "PG0071", "PG0072",
    "PG0073", "PG0074", "PG0075", "PG0076", "PG0077", "PG0078", "PG0079", "PG0080",
    "PG0081", "PG0082", "PG0083", "PG0084", "PG0085", "PG0086", "PG0087", "PG0088",
    "PG0089", "PG0090", "PG0091", "PG0092", "PG0093", "PG0094", "PG0095", "PG0096",
    "PG0097", "PG0098", "PG0099", "PG0100"
];


function LoadAirlines() {
    const { result: loadAirlinesResult, flightNo, setFlightNo, isLoading: loadingAirlinesLoad, handleSubmit } = useLoadAirlines()
    return (
        <>
            <Grid item xs={12} md={6} margin={5} maxWidth={1200}>
                <Box width={500}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Get Airlines Load</Typography>
                        <Autocomplete
                            options={flightNoOptions}
                            value={flightNo}
                            onChange={(event, newValue) => setFlightNo(newValue || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Flight No."
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
