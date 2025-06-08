import { Grid } from "@mui/joy"
import DelayedFlights from "../components/DelayedFlights"
import Departures from "../components/Departures"


function FlightsPage() {
    return (
        <>
            <Grid display={"flex"} flexDirection={"column"} maxWidth={1200} padding={5} container spacing={1}>
                <DelayedFlights />
                <Departures />
            </Grid>
        </>
    )
}

export default FlightsPage
