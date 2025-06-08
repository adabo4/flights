// components/Navbar.jsx
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Airline Dashboard
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/bookings">Bookings</Button>
                    <Button color="inherit" component={Link} to="/flights">Flights</Button>
                    <Button color="inherit" component={Link} to="/airlines">Airlines</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
