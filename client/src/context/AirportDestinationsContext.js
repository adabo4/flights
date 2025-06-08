import { useContext, createContext, useState, useEffect, useCallback } from "react"

const AirportDestinationsContext = createContext()

const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:3001';

function AirportDestinationProvider({ children }) {
    const [airport, setAirport] = useState("");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [submittedAirport, setSubmittedAirport] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState(null)


    const handleSubmit = () => {
        if (!airport) return;
        setPage(0);
        setSubmittedAirport(airport);
    };

    const fetchDepartures = useCallback(async () => {
        if (!submittedAirport) return;

        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/airports/${submittedAirport}/destinations?page=${page}&pageSize=${pageSize}`);
            const data = await res.json();
            console.log(data)
            setResult(data);
        } catch (error) {
            console.error("Fetch failed:", error);
        } finally {
            setIsLoading(false);
        }
    }, [submittedAirport, page, pageSize]);


    useEffect(() => {
        fetchDepartures();
    }, [fetchDepartures]);


    return (
        <AirportDestinationsContext.Provider value={{ result, airport, page, pageSize, setPage, setAirport, setPageSize, handleSubmit, isLoading }} >
            {children}
        </AirportDestinationsContext.Provider>
    )
}


function useAirportDestinations() {
    const context = useContext(AirportDestinationsContext)
    return context
}

export { AirportDestinationProvider, useAirportDestinations }