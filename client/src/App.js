import HomePage from "./pages/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContextProviders from "./context/ContextProviders";
import BookingPage from "./pages/BookingPage"
import FlightsPage from "./pages/FlightsPage";
import AirlinesPage from "./pages/AirlinesPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>

      <ContextProviders>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/flights" element={<FlightsPage />}></Route>
            <Route path="/airlines" element={<AirlinesPage />}></Route>
          </Routes>
        </BrowserRouter>
      </ContextProviders>
    </div>
  );
}

export default App;
