import { Grid, Box, Typography, Breadcrumbs, Link } from "@mui/material"
import { Home, Business } from "@mui/icons-material"
import TopAirlines from "../components/TopAirlines"
import LoadAirlines from "../components/LoadAirlines"
import AirportDestinations from "../components/AirportDestinations"
import { Link as RouterLink } from 'react-router-dom'

function AirlinesPage() {
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
                        <Business sx={{ mr: 0.5, fontSize: 20 }} />
                        Airline Management
                    </Typography>
                </Breadcrumbs>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                    📊 Airline Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Analyze airline performance and discover destination networks
                </Typography>
            </Box>

            <Grid display={"flex"} flexDirection={"column"} maxWidth={1200} padding={3} container spacing={3}>
                <TopAirlines />
                <LoadAirlines />
                <AirportDestinations />
            </Grid>
        </Box>
    )
}

export default AirlinesPage