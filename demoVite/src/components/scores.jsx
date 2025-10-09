export default function Scores() {
    return (
        <main className="container text-center">
            <h1 className="mb-3">Pie Voting Results</h1>
            <table className="table table-striped table-bordered mx-auto" style={{maxWidth: "400px"}}>
                <thead className="table-dark">
                    <tr>
                        <th>Flavor</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Apple</td><td>0</td></tr>
                    <tr><td>Pumpkin</td><td>0</td></tr>
                    <tr><td>Cherry</td><td>0</td></tr>
                    <tr><td>Pecan</td><td>0</td></tr>
                </tbody>
            </table>
            <footer className="text-center mt-5 py-3 border-top">
                <span>Created by Jeremiah Barton</span><br />
                <a href="https://github.com/jeremiahu2/startup">GitHub</a>
            </footer>
        </main>
    );
}