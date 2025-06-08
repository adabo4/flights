import { useContext, createContext, useState, useCallback, useEffect } from "react";

const TopAirlinesContext = createContext();

const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:3001';

const endpoint = `/top-airlines`

function TopAirlinesProvider({ children }) {
    const [limit, setLimit] = useState("")
    const [submittedLimit, setSubmittedLimit] = useState("") // NEW
    const [result, setResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const getAirlines = useCallback(async () => {
        if (!submittedLimit) return;
        setIsLoading(true)

        try {
            const res = await fetch(`${API_BASE_URL}${endpoint}?limit=${submittedLimit}&page=${page}&pageSize=${pageSize}`)
            const data = await res.json()
            setResult(data)
        } catch (err) {
            console.error("Fetch error:", err)
        } finally {
            setIsLoading(false)
        }
    }, [submittedLimit, page, pageSize])

    function handleSubmit() {
        setPage(0) // Reset to first page
        setSubmittedLimit(limit) // Triggers useEffect
    }

    useEffect(() => {
        if (submittedLimit) {
            getAirlines()
        }
    }, [submittedLimit, page, pageSize, getAirlines])

    return (
        <TopAirlinesContext.Provider value={{
            handleSubmit,
            limit,
            setLimit,
            result,
            page,
            setPage,
            pageSize,
            setPageSize,
            isLoading
        }}>
            {children}
        </TopAirlinesContext.Provider>
    )
}


function useTopAirlines() {
    const context = useContext(TopAirlinesContext);
    if (!context) throw new Error("TopAirlinesContext used outside of provider.")
    return context
}

export { TopAirlinesProvider, useTopAirlines }