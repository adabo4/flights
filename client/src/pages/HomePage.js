import { Stack, Button } from "@mui/material"
import { Link } from 'react-router-dom';
function HomePage() {
    return (
        <>

            <h1>this is a HomePage</h1>
            <Stack spacing={2} direction="row" mt={4}>
                <Button variant="contained" component={Link} to="/flights">Manage Flights</Button>
                <Button variant="contained" component={Link} to="/bookings">Manage Bookings</Button>
                <Button variant="contained" component={Link} to="/airlines">Manage Airlines</Button>
            </Stack>

        </>
    )
}

export default HomePage
