// components/Navbar.jsx
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme,
    alpha,
    Chip
} from "@mui/material";
import {
    FlightTakeoff,
    BookOnline,
    Business,
    Menu as MenuIcon,
    Home
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

    const navItems = [
        {
            label: "Home",
            path: "/",
            icon: <Home sx={{ mr: 1, fontSize: 20 }} />,
            color: "#1976d2"
        },
        {
            label: "Flights",
            path: "/flights",
            icon: <FlightTakeoff sx={{ mr: 1, fontSize: 20 }} />,
            color: "#1976d2"
        },
        {
            label: "Bookings",
            path: "/bookings",
            icon: <BookOnline sx={{ mr: 1, fontSize: 20 }} />,
            color: "#7b1fa2"
        },
        {
            label: "Airlines",
            path: "/airlines",
            icon: <Business sx={{ mr: 1, fontSize: 20 }} />,
            color: "#d32f2f"
        }
    ];

    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchor(null);
    };

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderBottom: `1px solid ${alpha('#fff', 0.1)}`
            }}
        >
            <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
                {/* Logo/Brand */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <FlightTakeoff sx={{ mr: 1, fontSize: 28 }} />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #fff, #e3f2fd)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Flight Hub
                    </Typography>
                    <Chip
                        label="Pro"
                        size="small"
                        sx={{
                            ml: 1,
                            bgcolor: alpha('#fff', 0.2),
                            color: 'white',
                            fontSize: '0.7rem',
                            height: 20,
                            cursor: 'default',  // ← Add this to prevent click cursor
                            pointerEvents: 'none'  // ← Add this to make it non-clickable
                        }}
                    />
                </Box>

                {/* Desktop Navigation */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                sx={{
                                    color: 'white',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    px: 2,
                                    py: 1,
                                    borderRadius: 2,
                                    transition: 'all 0.3s ease',
                                    bgcolor: isActivePath(item.path) ? alpha('#fff', 0.2) : 'transparent',
                                    '&:hover': {
                                        bgcolor: alpha('#fff', 0.1),
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                {item.icon}
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                )}

                {/* Mobile Menu Button */}
                {isMobile && (
                    <IconButton
                        color="inherit"
                        onClick={handleMobileMenuOpen}
                        sx={{ ml: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {/* Mobile Menu */}
                <Menu
                    anchorEl={mobileMenuAnchor}
                    open={Boolean(mobileMenuAnchor)}
                    onClose={handleMobileMenuClose}
                    PaperProps={{
                        sx: {
                            mt: 1,
                            borderRadius: 2,
                            minWidth: 200,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                        }
                    }}
                >
                    {navItems.map((item) => (
                        <MenuItem
                            key={item.path}
                            component={Link}
                            to={item.path}
                            onClick={handleMobileMenuClose}
                            sx={{
                                py: 2,
                                px: 3,
                                backgroundColor: isActivePath(item.path) ? alpha(item.color, 0.1) : 'transparent',
                                color: isActivePath(item.path) ? item.color : 'text.primary',
                                '&:hover': {
                                    backgroundColor: alpha(item.color, 0.05)
                                }
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </MenuItem>
                    ))}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
