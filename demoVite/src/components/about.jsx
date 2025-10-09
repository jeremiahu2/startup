export default function About() {
    return (
        <main className="container text-center">
            <h1 className="mb-3">About the Pie Vote App</h1>
            <img 
                src="Pie.jpg"
                alt="Pie Picture"
                className="img-fluid mb-3"
                style={{maxWidth: "300px"}}
            />
            <p className="lead mb-4">
                The Pie Vote App lets users vote for their favorite pie flavor,
                see live results, and chat with other pie fans!
            </p>
            <h3>Future Features:</h3>
            <ul className="list-group mx-auto mb-4" style={{maxWidth: "400px"}}>
                <li className="list-group-item">Database storage of votes</li>
                <li className="list-group-item">Live chat via WebSockets</li>
                <li className="list-group-item">Pie chart visualization using Chart.js</li>
            </ul>
            <blockquote className="blockquote">
                <p className="mb-0"><em>"Any way you slice it, pie brings people together."</em></p>
            </blockquote>
            <footer className="text-center mt-5 py-3 border-top">
                <span>Created by Jeremiah Barton</span><br />
                <a href="https://github.com/jeremiahu2/startup">GitHub</a>
            </footer>
        </main>
    );
}