
import { createContext, useContext } from "react";
import { useState } from "react";
const BookingsContext = createContext();

function formatDate(date) {
    const formattedDate = new Intl.DateTimeFormat("sk-SK", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false

    }).format(date);

    return formattedDate;

}

function BookingsProvider({ children }) {
    const [bookRefId, setBookRefId] = useState("");
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit() {
        if (!bookRefId) return;
        try {
            setIsLoading(true)
            const res = await fetch(`/api/bookings/${bookRefId}`);
            const data = await res.text();
            const parsedData = JSON.parse(data);
            setResult(parsedData);
            setIsLoading(false)
        } catch (err) {
            console.error("Error fetching data", err);
        }
    }
    return (
        <BookingsContext.Provider value={{ result, bookRefId, setBookRefId, handleSubmit, formatDate, isLoading }}>
            {children}
        </BookingsContext.Provider>
    );
}

function useBookings() {
    const context = useContext(BookingsContext);
    if (!context) {
        throw new Error("useBookings must be used within a BookingsProvider");
    }
    return context;
}

export { BookingsProvider, useBookings };
