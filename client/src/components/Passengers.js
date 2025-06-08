
// import TablePassengers from "./TablePassengers";
// import { usePassengers } from "../context/PassengersContext";
// import Spinner from "./Spinner";


// function Passengers() {
//     const { result, handleSubmit, passengerId, setPassengerId, loading } = usePassengers()

//     return (
//         <div>
//             <label htmlFor="">Booking ID</label>
//             <input
//                 type="text"
//                 value={passengerId}
//                 onChange={(e) => setPassengerId(e.target.value)}
//             />
//             <button onClick={handleSubmit}>Submit</button>

//             {loading && <Spinner></Spinner>}

//             {!loading && result && (
//                 <TablePassengers result={result}></TablePassengers>
//             )}

//             {!loading && result?.results?.length === 0 && (
//                 <p>No passengers found.</p>
//             )}
//         </div>
//     );
// }

// export default Passengers;
