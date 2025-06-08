function Table({ result }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Flights Count</th>
                    <th>Flights</th>
                </tr>
            </thead>
            <tbody>
                {result && result.results.map((res) => (
                    <tr key={res.id}>
                        <td>{res.id}</td>
                        <td>{res.name}</td>
                        <td>{res.flights_count}</td>
                        <td>{res.flights.join(", ")}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}

export default Table
