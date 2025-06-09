import { useAirportDestinations } from "../context/AirportDestinationsContext"
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
import TableAirportDestinations from "./TableAirportDestinations"

const airportOptions = [
    'YKS', 'MJZ', 'KHV', 'PKC', 'UUS', 'VVO', 'KGD', 'KEJ',
    'CEK', 'MQF', 'PEE', 'SGC', 'BZK', 'MRV', 'STW', 'ASF',
    'NJC', 'SVX', 'VOZ', 'SCW', 'KUF', 'DME', 'TJM', 'GOJ',
    'TOF', 'UIK', 'NSK', 'ARH', 'RTW', 'NUX', 'NOJ', 'UCT',
    'USK', 'NNM', 'PKV', 'KGP', 'KJA', 'URJ', 'IWA', 'PYJ',
    'KXK', 'DYR', 'PES', 'KYZ', 'NOZ', 'GRV', 'NAL', 'OGZ',
    'ESL', 'SLY', 'HMA', 'NYA', 'OVS', 'IJK', 'KVX', 'NYM',
    'NFG', 'KRO', 'EGO', 'URS', 'LPK', 'VKT', 'UUA', 'JOK',
    'CSY', 'ULY', 'OSW', 'PEZ', 'SKX', 'TBW', 'UKX', 'GDZ',
    'IAR', 'NBC', 'ULV', 'SWT', 'EYK', 'KLF', 'RGK', 'KRR',
    'MCX', 'KZN', 'REN', 'UFA', 'OVB', 'CEE', 'OMS', 'ROV',
    'AER', 'VOG', 'BQS', 'GDX', 'HTA', 'BTK', 'IKT', 'UUD',
    'MMK', 'ABA', 'BAX', 'AAQ', 'CNN'
];

function AirportDestinations() {
    const { airport, setAirport, handleSubmit, isLoading: loadingAirportDestinations, result: AirportDestinationsResult } = useAirportDestinations()
    return (
        <>
            <Grid item xs={12} md={6} margin={5} maxWidth={1200}>
                <Box
                    width={{ xs: '100%', sm: '100%', md: 500 }}
                    maxWidth="100%"
                >
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Enter an airport code to see destination airports:</Typography>

                        <Autocomplete
                            options={airportOptions}
                            value={airport}
                            onChange={(event, newValue) => setAirport(newValue || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Airport Code"
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                            freeSolo
                            filterOptions={(options, { inputValue }) =>
                                options.filter(option =>
                                    option.toLowerCase().includes(inputValue.toLowerCase())
                                )
                            }
                        />

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loadingAirportDestinations}
                            fullWidth
                        >
                            {loadingAirportDestinations ? <CircularProgress size={20} /> : "Fetch Destinations"}
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
