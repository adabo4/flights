import { DataGrid } from "@mui/x-data-grid"
import { useDelayedFlights } from "../context/DelayedFlightsContext"

function TableDelayedFlights() {
    const columns = [
        { field: 'flight_id', headerName: 'Flight ID', flex: 1 },
        { field: 'flight_no', headerName: 'Flight No.', flex: 1 },
        { field: 'delay', headerName: 'Delay (min.)', flex: 1 }
    ]
    const { result, page, pageSize, setPage, setPageSize } = useDelayedFlights();
    return (
        <>
            <DataGrid
                rows={result?.results || []}
                getRowId={(row) => row.flight_id}
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
    )
}

export default TableDelayedFlights
