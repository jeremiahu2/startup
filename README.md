# Pie Vote

[My Notes](notes.md)

This application can be used as polling or census program. Simply provide a link to it, and users can answer the provided questions.


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

If you ever need to send out a poll or take a census of a small group, this application can help you with that. Users simply sign in to the application and answer the questions. The applications will save the answers and who answered what and create a simple report. You can then review and use that report.

### Design

Login Page

<img width="424" height="832" alt="Startup1" src="https://github.com/user-attachments/assets/07b7862a-0a6b-472e-95d1-e3885f9461f5" />


Sample Question Page

<img width="424" height="828" alt="Startup2" src="https://github.com/user-attachments/assets/85b7454b-d8d6-4da2-a62c-33e592868106" />

This application will have a login screen where users will enter their username, and multiple question pages where they will answer various questions.


### Key features

- Saves and reports on who filled out the forms
- Reports the answers to questions in the forms
- Creates a chart to display the total users and answers to questions

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses two HTML pages. One for logging in and one for answering questions
- **CSS** - Good application style, whitespace, and contrast in the forms and login
- **React** - Will provide login, display, and apply users answers
- **Service** - Backend service with endpoints for:
  - logging in
  - retrieving question
  - submitting answers
- **DB/Login** - Store users, questions, and answers in database. Usernames securely stored in database. Can't vote without username
- **WebSocket** - As each user answers, their answers are broadcast to the report

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://startup.260domain.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - `index.html`, `play.html`, `scores.html`, `about.html` in project root.
- [x] **Proper HTML element usage** - Used `<header>`, `<footer>`, `<main>`, `<nav>`, `<img>`, `<a>`, `<fieldset>`, `<input>`, `<button>`, `<form>`, `<table>` in their respective pages.
- [x] **Links** - Navigation links connect pages: Home → Vote → Scores → About.
- [x] **Text** - About page includes descriptive text about the app.
- [x] **3rd party API placeholder** - `about.html` contains a `<div>` for a future inspirational quote.
- [x] **Images** - `about.html` displays a placeholder image (`designDiagram.png`).
- [x] **Login placeholder** - `index.html` form simulates login and account creation.
- [x] **DB data placeholder** - `scores.html` table shows sample voting results.
- [x] **WebSocket placeholder** - `play.html` contains a `<textarea>` to show chat messages for demonstration

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I implemented a consistent header, footer, and main section across all pages using semantic HTML and styled them with CSS and Bootstrap for a clean layout. 
- [x] **Navigation elements** - I built a responsive navigation bar using Bootstrap’s navbar component and ensured that active links are highlighted. Navigation works consistently across all pages.
- [x] **Responsive to window resizing** - I used Bootstrap’s grid system, media queries, and flexible CSS units to make sure the site looks good on desktop, tablet, and mobile screen sizes.
- [x] **Application elements** - I styled login forms, vote options, tables, and buttons using custom CSS and Bootstrap to create a visually consistent and usable interface.  
- [x] **Application text content** - I ensured all text elements (headings, paragraphs, labels) are properly styled, readable, and aligned with the overall visual design.  
- [x] **Application images** - I included SVG graphics and icons for logos and interactive elements, making sure they are responsive and visually integrated with the page design.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I set up the project using Vite as the build tool and confirmed that the app runs locally using `npm run dev`.
- [x] **Components** - I created .jsx files and made them reflect my previous HTML pages as React components. These include:
  - `home.jsx` – Displays the welcome message and login.
  - `about.jsx` – Displays the app’s purpose and future features.
  - `play.jsx` – Allows users to “vote” or interact with the app.
  - `scores.jsx` – Shows pie voting results.
- [x] **Router** - I implemented React Router (`react-router-dom`) for client-side navigation between pages. Each route corresponds to one of the main components, allowing users to switch views without reloading the page.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - I added reactivity across the app. The Home page stores user login data (email and password) using localStorage, and the Play page stores votes, which the Scores page displays after pulling them from localStorage. 
- [x] **Hooks** - I implemented React hooks useState and useEffect to manage local state and lifecycle events. Each instance updates reactively based on user interaction and stored data.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - I created a backend service using Node.js and Express, which provides endpoints for registration, login, logout, a restricted secret endpoint, and fetching a quote from a third-party API (ZenQuotes).
- [x] **Static middleware for frontend** - I configured Express to serve static frontend files.
- [x] **Calls to third party endpoints** - I implemented a quote endpoint in the backend that fetches quotes from the ZenQuotes API and sends them to the frontend.
- [x] **Backend service endpoints** - The backend provides register, login, logout, quote, and a secret endpoint.
- [x] **Frontend calls service endpoints** - The frontend Home page uses calls register, login, and logout, while the About page calls quote with Fetch.
- [x] **Supports registration, login, logout, and restricted endpoint** - The application supports full authentication flow where users can register and log in, log out, and the secret endpoint verifies the session cookie and only allows access to authenticated users.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Stores data in MongoDB** - My backend connects to MongoDB Atlas using the `db.js` file to persist user and application data.
- [x] **Stores credentials in MongoDB** - I updated signup and login endpoints to validate users from the database.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
