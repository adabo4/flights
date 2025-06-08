import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function TableBookings({ result, formatDate }) {

    const columns = [
        { label: "Ticket No.", align: "left" },
        { label: "Passenger ID", align: "right" },
        { label: "Passenger Name", align: "right" },
        { label: "Boarding No.", align: "right" },
        { label: "Flight No.", align: "right" },
        { label: "Seat", align: "right" },
        { label: "Aircraft Code", align: "right" },
        { label: "Arrival Airport", align: "right" },
        { label: "Departure Airport", align: "right" },
        { label: "Scheduled Arrival", align: "right" },
        { label: "Scheduled Departure", align: "right" }
    ];


    return (
        <>
            {
                result.result && (
                    <TableContainer component={Paper} sx={{ overflowX: "auto", maxWidth: 1200, margin: "auto" }}>
                        <Table size="small" aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={`column-${column.label}`} align={column.align}>{column.label}</TableCell>
                                    ))}
                                </TableRow>

                            </TableHead>
                            <TableBody>

                                {
                                    result?.result?.boarding_passes.map((row, index) => (
                                        <TableRow
                                            key={`${row.id}-${index}`}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell align='right' component="th" scope="row">
                                                {row.passenger_id}
                                            </TableCell>
                                            <TableCell align="right">{row.passenger_name}</TableCell>
                                            <TableCell align="right">{row.boarding_no}</TableCell>
                                            <TableCell align="right">{row.flight_no}</TableCell>
                                            <TableCell align="right">{row.seat}</TableCell>
                                            <TableCell align="right">{row.aircraft_code}</TableCell>
                                            <TableCell align="right">{row.arrival_airport}</TableCell>
                                            <TableCell align="right">{row.departure_airport}</TableCell>
                                            <TableCell align="right">{formatDate(new Date(row.scheduled_arrival))}</TableCell>
                                            <TableCell align="right">{formatDate(new Date(row.scheduled_departure))}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer >
                )
            }

        </>
    )
}

export default TableBookings
