import { DataGrid } from "@mui/x-data-grid";
import { useAirportDestinations } from "../context/AirportDestinationsContext";

function TableAirportDestinations() {
    const columns = [
        { field: 'arrival_airport', headerName: 'Airport', width: 120 }
    ]
    const { result, page, pageSize, setPage, setPageSize } = useAirportDestinations();

    const rows = (result?.results || []).map((row, index) => ({
        id: `airport-${index}`,
        arrival_airport: row
    }));
    return (
        <DataGrid
            rows={rows}
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

export default TableAirportDestinations
