import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Paper,
    Avatar,
    Chip,
    alpha,
    useTheme
} from "@mui/material";
import {
    FlightTakeoff,
    BookOnline,
    Business,
    Schedule,
    LocationOn,
    AccessTime,
    Group,
    TrendingUp
} from "@mui/icons-material";
import { Link } from 'react-router-dom';

function HomePage() {
    const theme = useTheme();

    const pageFeatures = [
        {
            title: "Manage Flights",
            description: "Track departures, delays, and real-time flight information across global airports",
            icon: <FlightTakeoff sx={{ fontSize: 40 }} />,
            color: "#1976d2",
            route: "/flights",
            features: ["Flight Departures", "Delayed Flights"],
            stats: "500+ Airports"
        },
        {
            title: "Manage Bookings",
            description: "Search bookings, find passenger companions, and manage reservation details",
            icon: <BookOnline sx={{ fontSize: 40 }} />,
            color: "#7b1fa2",
            route: "/bookings",
            features: ["Booking Search", "Passenger Companions"],
            stats: "Instant Lookup"
        },
        {
            title: "Manage Airlines",
            description: "Analyze airline performance, load factors, and discover destination networks",
            icon: <Business sx={{ fontSize: 40 }} />,
            color: "#d32f2f",
            route: "/airlines",
            features: ["Top Airlines", "Load Analytics", "Destinations"],
            stats: "Global Coverage"
        }
    ];

    const FeatureCard = ({ feature }) => (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                border: `1px solid ${alpha(feature.color, 0.2)}`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                bgcolor: alpha('#fff', 0.95), // Semi-transparent white
                backdropFilter: 'blur(10px)', // Glassmorphism effect
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 24px ${alpha(feature.color, 0.15)}`,
                    borderColor: feature.color,
                    bgcolor: alpha('#fff', 0.98)
                },

            }}
        >
            <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                        sx={{
                            bgcolor: alpha(feature.color, 0.1),
                            color: feature.color,
                            width: 64,
                            height: 64,
                            mr: 2
                        }}
                    >
                        {feature.icon}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight="bold" color="text.primary">
                            {feature.title}
                        </Typography>
                        <Chip
                            label={feature.stats}
                            size="small"
                            sx={{
                                bgcolor: alpha(feature.color, 0.1),
                                color: feature.color,
                                fontWeight: 500,
                                mt: 0.5,
                                cursor: 'default',
                                pointerEvents: 'none'
                            }}
                        />
                    </Box>
                </Box>

                <Typography variant="body1" color="text.secondary" mb={3} lineHeight={1.6}>
                    {feature.description}
                </Typography>

                <Box mb={2}>
                    <Typography variant="subtitle2" color="text.primary" fontWeight="bold" mb={1}>
                        Features:
                    </Typography>
                    {feature.features.map((feat, index) => (
                        <Chip
                            key={index}
                            label={feat}
                            size="small"
                            variant="outlined"
                            sx={{
                                mr: 1,
                                mb: 1,
                                borderColor: alpha(feature.color, 0.3),
                                color: feature.color,
                                cursor: 'default',
                                pointerEvents: 'none'
                            }}
                        />
                    ))}
                </Box>
            </CardContent>

            <CardActions sx={{ p: 4, pt: 0 }}>
                <Button
                    component={Link}
                    to={feature.route}
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                        bgcolor: feature.color,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': {
                            bgcolor: alpha(feature.color, 0.8)
                        }
                    }}
                >
                    Get Started
                </Button>
            </CardActions>
        </Card>
    );

    return (
        <Box
            sx={{
                minHeight: '100vh',
                py: 4,
                background: `linear-gradient(rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%23a78bfa;stop-opacity:1" /><stop offset="50%" style="stop-color:%236366f1;stop-opacity:1" /><stop offset="100%" style="stop-color:%23ec4899;stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(%23sky)" /></svg>')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <Container maxWidth="lg">
                {/* Hero Section with Airplane Image */}
                <Paper
                    elevation={0}
                    sx={{
                        background: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.05)), url('/images/airplane-hero.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: `1px solid ${alpha('#fff', 0.2)}`,
                        borderRadius: 4,
                        color: 'white',
                        p: 6,
                        mb: 6,
                        textAlign: 'center',
                        backdropFilter: 'blur(10px)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 100%)',
                            zIndex: 1
                        },
                        '& > *': {
                            position: 'relative',
                            zIndex: 2
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                        <FlightTakeoff sx={{ fontSize: { xs: 40, md: 60 }, mr: 2, color: 'white' }} />
                        <Typography variant="h1" fontWeight="bold" sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}>
                            Flight Hub
                        </Typography>
                    </Box>

                    <Typography variant="h4" fontWeight="bold" mb={2} sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        Flight Management Hub
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.95, maxWidth: 700, mx: 'auto', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                        Your comprehensive platform for flight tracking, booking management,
                        and airline analytics. Choose a category to get started.
                    </Typography>

                    {/* Floating Elements */}
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Chip
                            label="✈️ Real-time Tracking"
                            sx={{
                                bgcolor: alpha('#fff', 0.2),
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${alpha('#fff', 0.3)}`,
                                cursor: 'default',
                                pointerEvents: 'none'
                            }}
                        />
                        <Chip
                            label="🌍 Global Coverage"
                            sx={{
                                bgcolor: alpha('#fff', 0.2),
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${alpha('#fff', 0.3)}`,
                                cursor: 'default',
                                pointerEvents: 'none'
                            }}
                        />
                        <Chip
                            label="📊 Advanced Analytics"
                            sx={{
                                bgcolor: alpha('#fff', 0.2),
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${alpha('#fff', 0.3)}`,
                                cursor: 'default',
                                pointerEvents: 'none'
                            }}
                        />
                    </Box>
                </Paper>

                {/* Feature Cards - Centered with Middle Card More Right */}
                <Grid container spacing={4} mb={6}>
                    {pageFeatures.map((feature, index) => (
                        <Grid item xs={12} key={index}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                                    alignItems: 'center',
                                    justifyContent: 'center', // Center the content
                                    gap: { xs: 3, md: index === 1 ? 9 : 5 }, // Bigger gap for middle card
                                    mb: 4,
                                    px: { xs: 0, md: 2 },
                                    // Push middle card more to the right
                                    pl: { xs: 0, md: index === 1 ? 10 : 2 },
                                    pr: { xs: 0, md: index === 1 ? 2 : 8 }
                                }}
                            >
                                <Box sx={{
                                    width: { xs: '100%', md: '75%' }, // Slightly smaller for better balance
                                    maxWidth: { xs: 800, md: index === 1 ? 700 : 750 } // Middle card smaller
                                }}>
                                    <FeatureCard feature={feature} />
                                </Box>
                                <Box sx={{
                                    flex: 1,
                                    maxWidth: { md: '25%' },
                                    textAlign: 'center',
                                    display: { xs: 'none', md: 'flex' }, // Hide on mobile
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            opacity: 0.5,
                                            fontWeight: 'bold',
                                            fontSize: { md: '4rem', lg: '5rem' },
                                            color: feature.color,
                                            textShadow: `2px 2px 8px ${alpha(feature.color, 0.1)}`,
                                            cursor: 'default',
                                            pointerEvents: 'none'
                                        }}
                                    >
                                        0{index + 1}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* Stats Footer */}
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        p: 4,
                        bgcolor: alpha('#fff', 0.95),
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${alpha('#fff', 0.2)}`
                    }}
                >
                    <Typography variant="h6" textAlign="center" mb={3} color="text.primary">
                        Platform Statistics
                    </Typography>
                    <Grid container spacing={4} textAlign="center">
                        <Grid item xs={6} md={3}>
                            <Typography variant="h4" fontWeight="bold" color="primary">
                                500+
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Airports Covered
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Typography variant="h4" fontWeight="bold" color="success.main">
                                24/7
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Real-time Updates
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Typography variant="h4" fontWeight="bold" color="warning.main">
                                100K+
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Flights Tracked
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Typography variant="h4" fontWeight="bold" color="error.main">
                                Global
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Network Coverage
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default HomePage;