# Task Manager Application

Welcome to the Task Manager project! This application is a full-stack web application built manage daily tasks. It features a simple, interactive frontend and a secure backend.

This README is designed for beginners. It will guide you step-by-step on how to run this project on your own computer, explain some of the choices made while building it, and highlight what you can learn from it.

---

## 🚀 Setting Up the Project Locally

To run this project on your computer, you will need to run three different pieces: the Database, the Backend, and the Frontend.

### Prerequisites

Before you start, make sure you have installed:
- **Java (JDK 21)**: Required to run the Spring Boot backend.
- **Node.js**: Required to run the React/Vite frontend.
- **Docker**: (Optional but highly recommended) The easiest way to run the PostgreSQL database locally without installing it manually on your computer.

### Step 1: Start the Database

The application uses PostgreSQL to store user and task data. We have provided a `docker-compose.yml` file to make starting the database incredibly easy.

1. Open your terminal and navigate to the root folder of the project.
2. Run the following command:
   ```bash
   docker-compose up -d
   ```
This command downloads the PostgreSQL database and starts it in the background. It will be accessible on port `5432` with the username `postgres` and password `postgres`.

### Step 2: Start the Backend (Spring Boot)

The backend handles the business logic, security, and database communication.

1. Open a new terminal window.
2. Navigate to the root folder of the project.
3. Run the application using the Maven Wrapper provided in the project:
   - **On Windows:** `.\mvnw spring-boot:run`
   - **On Mac/Linux:** `./mvnw spring-boot:run`

The backend will start and run on `http://localhost:8080`.

### Step 3: Start the Frontend (Vite + React)

The frontend is what you see and interact with in your browser.

1. Open a new terminal window.
2. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
3. Install the required JavaScript packages:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

The terminal will give you a local link (usually `http://localhost:5173`). Click it or type it into your browser to see the app!

---

## 🧠 Technical Decisions

When building software, developers have to pick which tools to use. Here is what I chose and why:

- **Backend Framework (Spring Boot):** I chose Java and Spring Boot because it is widely used in the industry, very secure, and excellent for building RESTful APIs. It handles a lot of complex configuration.
- **Frontend Framework (React with Vite):** React is excellent for building interactive user interfaces. Paired it with Vite instead of older tools like Create React App because Vite starts up instantly and makes the development experience much faster.
- **Database (PostgreSQL):** Picked PostgreSQL because it is an extremely reliable, open-source relational database. It structures data neatly into tables (like Excel spreadsheets) which is perfect for Tasks and Users.
- **Security (JWT - JSON Web Tokens):** When a user logs in, the backend gives them a "token". The frontend stores this token and sends it with every future request. This is a secure, modern way to keep users logged in without storing session data on the server.

---

## 🤔 Assumptions

While designing this project, I made a few assumptions about how it would be used:

1. **Single User per Task:** I assumed that a task belongs to only one user. There are no features for sharing tasks between different users in this version.

---

## ⚖️ Tradeoffs

A tradeoff is when you sacrifice one thing to gain another. Here are the main tradeoffs in this project:

1. **Using Docker for the Database in Local**
   - *Pro:* You don't have to spend time figuring out how to install and configure PostgreSQL directly on Windows or Mac.
   - *Con:* You have to install Docker Desktop, which can be heavy on computer resources.
2. **Stateless Authentication (JWT) vs. Sessions**
   - *Pro:* The backend doesn't have to remember who is logged in, making it easier to host cheaply.
   - *Con:* If a user gets hacked, it is harder to instantly "revoke" or cancel their token before it naturally expires.

---

Enjoy building and exploring! If you break something, don't worry—that's the best way to learn.