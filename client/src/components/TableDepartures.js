import { DataGrid } from "@mui/x-data-grid";
import { useDepartures } from "../context/DeparturesContext";

function TableDepartures() {
    const columns = [
        { field: 'flight_id', headerName: 'Flight ID', flex: 1 },
        { field: 'flight_no', headerName: 'Flight No.', flex: 1 },
        { field: 'scheduled_departure', headerName: 'Scheduled Departure', flex: 1 }
    ]
    const { result, page, pageSize, setPage, setPageSize } = useDepartures();
    return (
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
    )
}

export default TableDepartures
