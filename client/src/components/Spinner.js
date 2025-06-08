import { CircularProgress } from '@mui/joy';

function Spinner() {
    return (
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
            <CircularProgress />;
        </div>
    )
}

export default Spinner;
