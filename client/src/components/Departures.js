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
import { useDepartures } from "../context/DeparturesContext"
import TableDepartures from "./TableDepartures"

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

function Departures() {
    const { airport, setAirport, day, setDay, handleSubmit, isLoading: loadingDepartures, result: resultDepartures } = useDepartures()
    return (
        <>

            <Grid item xs={12} md={6} margin={5} maxWidth={1200}>
                <Box width={500}>
                    <Paper elevation={3} sx={{ p: 3 }}>

                        <Typography variant="h6" gutterBottom>Enter airport and day to see planned flights:</Typography>
                        <Autocomplete
                            options={airportOptions}
                            value={airport}
                            onChange={(event, newValue) => setAirport(newValue || '')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Airport"
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
