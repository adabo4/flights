
import { Grid } from "@mui/joy"
import TopAirlines from "../components/TopAirlines"
import LoadAirlines from "../components/LoadAirlines"
import AirportDestinations from "../components/AirportDestinations"



function AirlinesPage() {
    return (
        <>
            <Grid display={"flex"} flexDirection={"column"} maxWidth={1200} padding={5} container spacing={1}>
                <TopAirlines></TopAirlines>
                <LoadAirlines></LoadAirlines>
                <AirportDestinations></AirportDestinations>
            </Grid>
        </>
    )
}

export default AirlinesPage
