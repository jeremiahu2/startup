# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## Startup CSS Assignment Learnings

- Learned how to combine custom CSS with a framework (Bootstrap) to get the desired styling while maintaining responsiveness.  
- Practiced semantic HTML and proper layout using header, footer, main, nav, form, and tables.  
- Learned to style forms, buttons, tables, and other UI components consistently across multiple pages.  
- Implemented responsive design with media queries and Bootstrap classes to support desktop, tablet, and mobile screen sizes.  
- Learned to override Bootstrap defaults without breaking the grid or responsive behavior.  
- Practiced flexbox layout for aligning elements like login forms and vote options.  
- Learned to maintain a consistent visual design across multiple pages including typography, spacing, and hover effects.  
- Learned version control habits: committing changes often with descriptive messages to demonstrate ownership.  
- Learned to deploy a static site using the deployFiles.sh script and ensure it works on a production environment.  
- Learned to document my work in notes.md, including challenges, solutions, and design decisions.

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```

### Final Notes
1) What is the default port for HTTP/HTTPS/SSH?
   - HTTP -> 80
   - HTTPS -> 443
   - SSH -> 22 
2) What does an HTTP status code in the range of 300/400/500 indicate?
   - 300 level -> Redirection
   - 400 level -> Client Error
   - 500 level -> Server Error
3) What does the HTTP header content-type allow you to do?
   - Tells the client or server how to interpret the request/response body
   Such as:
     - application/json
     - text/html
     - application/x-www-form-urlencoded
   - Enables automatic parsing (e.g., JSON → JavaScript object)
4) What does a “Secure cookie”/”Http-only cookie”/”Same-site cookie” do? https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
   - Secure
     - Cookie is only sent over HTTPS
     - Prevents interception via HTTP
   - HttpOnly
     - Cookie cannot be accessed by JavaScript
     - Prevents XSS attacks
   - SameSite
     - Controls cross-site cookie behavior
     - Values:
       - Strict: only same-site requests
       - Lax: safe cross-site navigation
       - None: allows cross-site (must be Secure)
5) Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /api/document?
   
6) Given the following Express service code: What does the following front end JavaScript that performs a fetch return?
   - fetch() returns a Promise
   - Resolves to a Response object
   - .json() returns another Promise resolving to parsed JSON
7) Given the following MongoDB query, select all of the matching documents {name:Mark}
   - Matches documents where:
     - The name field exists
     - The value is exactly "Mark"
     - Case-sensitive
     - Does not match "mark" or "Markus"
8) How should user passwords be stored?
   - Hashed and salted
   - Use:
     - bcrypt
     - argon2
   - ❌ Never store:
     - Plaintext passwords
     - Encrypted passwords (reversible)
9) Assuming the following node.js websocket code in the back end, and the following front end websocket code, what will the - front end log to the console?
   - 
10) What is the websocket protocol intended to provide?
   - 
11) What do the following acronyms stand for? JSX, JS, AWS, NPM, NVM
    - JSX -> JavaScript XML
    - JS -> JavaScript
    - AWS -> Amazon Web Services
    - NPM -> Node Package Manager
    - NVM -> Node Version Manager 
12) Assuming an HTML document with a body element. What text content will the following React component generate?  The react component will use parameters.
   - 
13) Given a set of React components that include each other, what will be generated
   - 
14) What does a React component with React.useState do?
   - Adds state to a functional component
   - Triggers re-render when state changes
15) What are React Hooks used for?
   - Add React features to function components:
     - State
     - Lifecycle logic
     - Context
     - Refs
     - Performance optimization
16) What does the State Hook/Context Hook/Ref Hook/Effect Hook/Performance Hook do? https://react.dev/reference/react/hooks
   - State Hook (useState)
     - Stores local component state
   - Context Hook (useContext)
     - Access shared/global state
   - Ref Hook (useRef)
     - Access DOM or persist values without re-render
   - Effect Hook (useEffect)
     - Side effects (fetching, subscriptions)
   - Performance Hooks
     - `useMemo`, `useCallback`
     - Prevent unnecessary recalculations
17) Given React Router code, select statements that are true.
   - 
18) What does the package.json file do?
   - Defines:
     - Dependencies
     - Scripts
     - Project metadata
   - Enables reproducible builds
19) What does the fetch function do?
   - Makes HTTP requests from browser or Node
   - Returns a Promise resolving to a Response
20) What does node.js do?
   - Runs JavaScript outside the browser
   - Used for:
     - Servers
     - CLI tools
     - Build systems
21) What does pm2 do?
   - Process manager for Node.js
   - Keeps apps alive
   - Restarts on crash
   - Supports clustering
22) What does Vite do?
   - Frontend build tool
   - Fast dev server
   - Optimized production builds
   - Used with React, Vue, etc.
