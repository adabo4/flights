
import { createContext, useContext } from "react";
import { useState, useEffect, useCallback } from "react";
const PassengersContext = createContext();

function PassengersProvider({ children }) {
    const [passengerId, setPassengerId] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [submittedPassengerId, setSubmittedPassengerId] = useState("");


    async function handleSubmit(e) {
        e.preventDefault();
        setResult(null);
        if (!passengerId) return;
        setPage(0);
        setSubmittedPassengerId(passengerId);
    }

    const fetchPassengers = useCallback(async () => {
        if (!submittedPassengerId) return;
        setLoading(true)
        try {
            const res = await fetch(`http://localhost:3000/passengers/${submittedPassengerId}/companions?page=${page}&limit=${pageSize}`);
            const data = await res.text();
            const parsedData = JSON.parse(data);
            setResult(parsedData);
            console.log(data)
        } catch (err) {
            console.error("Error fetching data", err);
        } finally {
            setLoading(false);
        }
    }, [submittedPassengerId, page, pageSize])

    useEffect(() => {
        fetchPassengers();
    }, [fetchPassengers]);

    return (
        <PassengersContext.Provider value={{
            result,
            passengerId,
            setPassengerId,
            handleSubmit,
            page,
            setPage,
            pageSize,
            setPageSize,
            loading,
            setLoading
        }}>
            {children}
        </PassengersContext.Provider>
    );
}

function usePassengers() {
    const context = useContext(PassengersContext);
    if (!context) {
        throw new Error("usePassengers must be used within a PassengersProvider");
    }
    return context;
}

export { PassengersProvider, usePassengers };
