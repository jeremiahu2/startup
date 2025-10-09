export default function Home() {
  return (
    <main className="container text-center">
      <h1 className="mb-3">Welcome to the Pie Vote App</h1>
      <p className="lead mb-4">
        Vote on your Favorite Pie Flavor, see the most poular flavors, and chat with other pie fans!
      </p>
      <form method="get" action="/play" className="mx-auto" style={{maxWidth: "400px"}}>
        <div className="mb-3 input-group">
          <span className="input-group-text">@</span>
          <input type="text" className="form-control" placeholder="your@email.com"/>
        </div>
        <div className="mb-3 input-group">
          <span className="input-group-text">🔒</span>
          <input type="password" className="form-control" placeholder="password"/>
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Login</button>
          <button type="submit" className="btn btn-secondary">Create</button>
        </div>
      </form>
      <footer className="text-center mt-5 py-3 border-top">
        <span>Created by Jeremiah Barton</span><br />
        <a href="https://github.com/jeremiahu2/startup">Github</a>
      </footer>
    </main>
  );
}
