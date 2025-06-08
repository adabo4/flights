
import { usePassengers } from '../context/PassengersContext';
import { DataGrid } from '@mui/x-data-grid';

function TablePassengers() {


    const { result, page, pageSize, setPage, setPageSize } = usePassengers();

    if (!Array.isArray(result?.results)) {
        return <div>Error: result.results is not an array.</div>;
    }

    const columns = [
        { field: 'name', headerName: 'Passenger Name', flex: 1 },
        { field: 'id', headerName: 'Passenger ID', flex: 1 },
        { field: 'flights_count', headerName: 'Number of Flights', flex: 1 },
        { field: 'flights', headerName: 'Compations', flex: 1 }
    ]

    return (
        <>
            {/* <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table sx={{ maxWidth: 1200 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Passenger Name</TableCell>
                            <TableCell align="right">Passenger ID</TableCell>
                            <TableCell align="right">Number of Flights</TableCell>
                            <TableCell align="right">Companions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.results.slice(0, visibleCount).map((row, index) => (
                            <TableRow
                                key={row.id || index} 
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.flights_count}</TableCell>
                                <TableCell align="right">{row.flights.join(", ")}</TableCell> 
                            </TableRow>
                        ))} 

                    </TableBody>
                </Table>
            </TableContainer> */}

            <DataGrid
                rows={result?.results || []}
                getRowId={(row) => row.id}
                columns={columns}
                rowCount={result?.total || 0}
                pageSizeOptions={[10, 50, 100]}
                paginationMode="server"
                paginationModel={{ page, pageSize }}
                onPaginationModelChange={({ page: newPage, pageSize: newPageSize }) => {
                    setPage(newPage);
                    setPageSize(newPageSize);
                }}
                loading={!result}
            />



        </>
    );
}

export default TablePassengers;
