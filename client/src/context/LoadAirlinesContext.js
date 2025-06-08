import { useContext, createContext, useState, useCallback, useEffect } from "react";

const LoadAirlinesContext = createContext();

const BASE_URL = `http://localhost:3000`
const endpoint = `/airlines`

function LoadAirlinesProvider({ children }) {
    const [flightNo, setFlightNo] = useState("")
    const [submittedflightNo, setSubmittedFlightNo] = useState("") // NEW
    const [result, setResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);


    const getAirlines = useCallback(async () => {
        if (!submittedflightNo) return;
        setIsLoading(true)

        try {
            const res = await fetch(`${BASE_URL}${endpoint}/${submittedflightNo}/load?page=${page}&pageSize=${pageSize}`)
            const data = await res.json()
            console.log(data)
            setResult(data)
        } catch (err) {
            console.error("Fetch error:", err)
        } finally {
            setIsLoading(false)
        }
    }, [submittedflightNo, page, pageSize])

    function handleSubmit() {
        setFlightNo("")
        setSubmittedFlightNo(flightNo)
    }

    useEffect(() => {
        if (submittedflightNo) {
            getAirlines()
        }
    }, [submittedflightNo, getAirlines])

    return (
        <LoadAirlinesContext.Provider value={{
            handleSubmit,
            flightNo,
            setFlightNo,
            result,
            isLoading,
            page,
            setPage,
            pageSize,
            setPageSize
        }}>
            {children}
        </LoadAirlinesContext.Provider>
    )
}


function useLoadAirlines() {
    const context = useContext(LoadAirlinesContext);
    if (!context) throw new Error("LoadAirlinesContext used outside of provider.")
    return context
}

export { LoadAirlinesProvider, useLoadAirlines }