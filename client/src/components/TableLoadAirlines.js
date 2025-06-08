import { DataGrid } from "@mui/x-data-grid";
import { useLoadAirlines } from "../context/LoadAirlinesContext";

function TableLoadAirlines() {
    const columns = [
        { field: 'flight_id', headerName: 'Flight No.', width: 120 },
        { field: 'passengers', headerName: 'Passengers', width: 120 },
        { field: 'total_seats', headerName: 'Total Seats', width: 120 },
        { field: 'aircraft_capacity', headerName: 'Aircraft Capacity', width: 120 }
    ]
    const { result, page, pageSize, setPage, setPageSize } = useLoadAirlines();

    console.log(result?.results)

    return (
        <DataGrid
            rows={result?.results || []}
            columns={columns}
            rowCount={result?.total || []}
            getRowId={(row) => row.flight_id}
            pageSizeOptions={[10, 50, 100]}
            paginationMode="server"
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={({ page: newPage, pageSize: newPageSize }) => {
                setPage(newPage);
                setPageSize(newPageSize);
            }}
            loading={!result || result.results === undefined}
        />
    )
}

export default TableLoadAirlines
