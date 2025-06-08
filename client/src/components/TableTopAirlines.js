import { DataGrid } from "@mui/x-data-grid"
import { useTopAirlines } from "../context/TopAirlinesContext"

function TableTopAirlines() {
    const columns = [
        { field: 'flight_no', headerName: 'Flight No.', width: 120 },
        { field: 'passenger_count', headerName: 'Count', width: 120 }
    ]

    const {
        result,
        page,
        pageSize,
        setPage,
        setPageSize,
        isLoading
    } = useTopAirlines()

    return (
        <DataGrid
            columns={columns}
            rows={result?.results || []}
            getRowId={(row) => row.flight_no}
            rowCount={result?.total || 0}
            pageSizeOptions={[10, 50, 100]}
            paginationMode="server"
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={({ page: newPage, pageSize: newPageSize }) => {
                setPage(newPage);
                setPageSize(newPageSize);
            }}
            loading={isLoading}
        />
    )
}

export default TableTopAirlines
