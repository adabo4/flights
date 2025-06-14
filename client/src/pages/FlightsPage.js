import { Grid, Box, Typography, Paper, Breadcrumbs, Link } from "@mui/material"
import { Home, FlightTakeoff } from "@mui/icons-material"
import DelayedFlights from "../components/DelayedFlights"
import Departures from "../components/Departures"
import { Link as RouterLink } from 'react-router-dom'

function FlightsPage() {
    return (
        <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 4 }}>
            {/* Page Header */}
            <Box sx={{ mb: 4, px: 3 }}>
                <Breadcrumbs sx={{ mb: 2 }}>
                    <Link component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Home sx={{ mr: 0.5, fontSize: 20 }} />
                        Home
                    </Link>
                    <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <FlightTakeoff sx={{ mr: 0.5, fontSize: 20 }} />
                        Flight Management
                    </Typography>
                </Breadcrumbs>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                    ✈️ Flight Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Track departures and monitor delayed flights in real-time
                </Typography>
            </Box>

            <Grid display={"flex"} flexDirection={"column"} maxWidth={1200} padding={3} container spacing={3}>
                <DelayedFlights />
                <Departures />
            </Grid>
        </Box>
    )
}

export default FlightsPage