# Task Trackr (MERN Stack)

A full-stack Task Tracker web application built using MongoDB, Express.js, React, and Node.js. It features a premium light-mode UI, dynamic state updates, and full CRUD capabilities.

## Features
- **CRUD Operations:** Create, Read, Update, and Delete tasks.
- **Filtering & Sorting:** Filter by status (Pending, In Progress, Completed) and sort by newest or priority.
- **Premium UI:** Aesthetic, responsive design with micro-animations and toast notifications.
- **Global State Management:** Uses React Context API for seamless updates without page reloads.

## Tech Stack
- **Frontend:** React (Vite), CSS3, Axios
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB (Atlas / Local)

---

## Local Setup & Installation

If you are an evaluator running this project locally, please follow these steps:

### Prerequisites
- Node.js installed on your machine.
- A MongoDB Atlas cluster **OR** a local MongoDB instance running on your machine.

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file in the `backend` directory.
3. Configure your environment variables. 

   **Important Note on Corporate Networks:** If you are running this on a strict office/corporate network, DNS SRV lookups (used by MongoDB Atlas `mongodb+srv://` links) or outbound port 27017 might be blocked, resulting in a `querySrv ECONNREFUSED` error. 
   
   If this happens, please use a local MongoDB instance by setting your `.env` like this:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/tasktracker
   ```
   *Otherwise, if using Atlas, use your standard connection string.*

4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a **new** terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).
