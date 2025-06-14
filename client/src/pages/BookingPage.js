import { Grid, Box, Typography, Breadcrumbs, Link } from "@mui/material"
import { Home, BookOnline } from "@mui/icons-material"
import Bookings from "../components/Bookings"
import Pass from "../components/Pass"
import { Link as RouterLink } from 'react-router-dom'

function BookingPage() {
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
                        <BookOnline sx={{ mr: 0.5, fontSize: 20 }} />
                        Booking Management
                    </Typography>
                </Breadcrumbs>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                    📋 Booking Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Search bookings and find passenger travel companions
                </Typography>
            </Box>

            <Grid display={"flex"} flexDirection={"column"} maxWidth={1200} padding={3} container spacing={3}>
                <Pass />
                <Bookings />
            </Grid>
        </Box>
    )
}

export default BookingPage