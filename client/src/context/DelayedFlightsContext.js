import { useContext, useState, createContext, useEffect, useCallback } from "react";

const DelayedFlightsContext = createContext();

function DelayedFlightsProvider({ children }) {
    const [result, setResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [delay, setDelay] = useState("")
    const [submittedDelay, setSubmittedDelay] = useState("");


    const handleSubmit = () => {
        if (!delay) return;
        setPage(0);
        setSubmittedDelay(delay);
    };

    const fetchFlights = useCallback(async () => {
        if (!submittedDelay) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/flights/late-departure/${submittedDelay}?page=${page}&limit=${pageSize}`);
            const data = await res.json();
            setResult(data);

        } catch (error) {
            console.error("Fetch failed:", error);
        } finally {
            setIsLoading(false);
        }
    }, [submittedDelay, page, pageSize]);


    useEffect(() => {
        fetchFlights();
    }, [fetchFlights]);






    // async function handleSubmit(currentPage = page, currentPageSize = pageSize) {

    //     if (!delay) return;

    //     try {
    //         setIsLoading(true);
    //         const res = await fetch(`http://localhost:3000/flights/late-departure/${delay}?page=${currentPage}&limit=${currentPageSize}`)
    //         const data = await res.json()
    //         console.log(data)
    //         // setRows(data.results)
    //         // setRowCount(data.total)
    //         setResult(data)

    //     } catch (error) {
    //         console.error("Fetch failed:", error);

    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    return <DelayedFlightsContext.Provider value={{
        result,
        isLoading,
        pageSize,
        page,
        setPage,
        setPageSize,
        delay,
        setDelay,
        handleSubmit
    }}>
        {children}
    </DelayedFlightsContext.Provider>
}

function useDelayedFlights() {
    const context = useContext(DelayedFlightsContext);
    if (!context) {
        throw new Error("useBookings must be used within a BookingsProvider");
    }
    return context;
}

export { useDelayedFlights, DelayedFlightsProvider }