import { PassengersProvider } from "./PassengersContext";
import { BookingsProvider } from "./BookingsContext";
import { DelayedFlightsProvider } from "./DelayedFlightsContext"
import { TopAirlinesProvider } from "./TopAirlinesContext";
import { DeparturesProvider } from "./DeparturesContext";
import { LoadAirlinesProvider } from "./LoadAirlinesContext";
import { AirportDestinationProvider } from "./AirportDestinationsContext";

export default function ContextProviders({ children }) {
    return (
        <PassengersProvider>
            <BookingsProvider>
                <DelayedFlightsProvider>
                    <TopAirlinesProvider>
                        <DeparturesProvider>
                            <LoadAirlinesProvider>
                                <AirportDestinationProvider>
                                    {children}
                                </AirportDestinationProvider>
                            </LoadAirlinesProvider>
                        </DeparturesProvider>
                    </TopAirlinesProvider>
                </DelayedFlightsProvider>
            </BookingsProvider>
        </PassengersProvider>
    );
}
