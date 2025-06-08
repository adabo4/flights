import { useContext, createContext, useState, useEffect, useCallback } from "react"


const DeparturesContext = createContext()


function DeparturesProvider({ children }) {
    const [airport, setAirport] = useState("");
    const [day, setDay] = useState("");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [submittedAirport, setSubmittedAirport] = useState("")
    const [submittedDay, setSubmittedDay] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState(null)


    const handleSubmit = () => {
        if (!airport && !day) return;
        setPage(0);
        setSubmittedAirport(airport);
        setSubmittedDay(day)
    };

    const fetchDepartures = useCallback(async () => {
        if (!submittedAirport && !submittedDay) return;

        setIsLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/departures?airport=${submittedAirport}&day=${submittedDay}&page=${page}&pageSize=${pageSize}`);
            const data = await res.json();
            console.log(data)
            setResult(data);
        } catch (error) {
            console.error("Fetch failed:", error);
        } finally {
            setIsLoading(false);
        }
    }, [submittedAirport, submittedDay, page, pageSize]);


    useEffect(() => {
        fetchDepartures();
    }, [fetchDepartures]);


    return (
        <DeparturesContext.Provider value={{ result, airport, day, page, pageSize, setPage, setDay, setAirport, setPageSize, handleSubmit, isLoading }} >
            {children}
        </DeparturesContext.Provider>
    )
}

function useDepartures() {
    const context = useContext(DeparturesContext)
    return context
}

export { DeparturesProvider, useDepartures }
