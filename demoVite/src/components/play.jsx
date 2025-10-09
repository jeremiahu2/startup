export default function Play() {
    return (
        <main className="container text-center">
            <h1 classNAme="mb-3">Vote for Your Favorite Pie</h1>
            <form className="mx-auto" style={{maxWidth: "400px"}}>
                {[
                    ["apple", "Apple Pie 🍎"],
                    ["pumpkin", "Pumpkin Pie 🎃"],
                    ["cherry", "Cherry Pie 🍒"]
                    ["peach", "Peach Pie 🍑"],
                ].map(([id, label]) => (
                    <div key={id} className="mb-3 form-check">
                        <input className="form-check-input" type="radio" name="pie" id={id} />
                        <label className="form-check-label" htmlFor={id}>{label}</label>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary me-2">Vote</button>
                <button type="reset" className="btn btn-secondary">Reset</button>
            </form>
            <footer className="text-center mt-5 py-3 border-top">
                <span>Created by Jeremiah Barton</span><br />
                <a href="https://github.com/jeremiahu2/startup">Github</a>
            </footer>
        </main>
    );
}