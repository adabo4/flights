import Bookings from "../components/Bookings"
import Pass from "../components/Pass"
import { Grid } from "@mui/joy"



function BookingPage() {
    return (
        <>
            <Grid display={"flex"} flexDirection={"column"} maxWidth={1200} padding={5} container spacing={1}>
                <Pass></Pass>
                <Bookings></Bookings>
            </Grid>
        </>
    )
}

export default BookingPage
