# **Florin County Council Community Library Booking System**

## **Overview**

The Florin County Council Community Library Booking System is a sophisticated web-based application designed to modernize the way library resources are managed and reserved. It caters to the growing need for digital transformation in community services. The system not only simplifies the reservation process for a range of library resources but also provides real-time occupancy insights. This initiative aims to enhance the user experience, improve library operations, and foster an interactive community environment.

## **Installation Guide**

### **Prerequisites**

- **Node.js**: A versatile JavaScript runtime.
- **PostgreSQL**: A robust, open-source database system.
- **NPM (Node Package Manager)**: Essential for managing JavaScript packages.

### **Setting Up the Project**

### 1. Cloning and Navigating to the Repository

- Clone the repository using:
  ```bash
  git clone https://github.com/Bill2703/Library-App.git

  ```
- Navigate to the server directory:

  ```bash

  cd server

  ```

### 2. Installing Dependencies

- Install Node.js from [Node.js Official Site](https://nodejs.org/).
- Install Node.js and all necessary dependencies, including Express, PostgreSQL client (pg), and others.

  ```bash

npm install nodemon pg dotenv express cors

  ```

- The command above installs all dependencies listed in your **`package.json`** file.

### 3. Database Configuration

- Log in to ElephantSQL and create a new instance.
- Once the instance is created, copy the URL link provided by ElephantSQL.

### 4. Environment Setup

- Inside `server` directory, create a **`.env`** file. This file will store your environment variables.
- Populate it with necessary environment variables:

  ```

  PORT=3000
  DB_URL=YOUR_ELEPHANTSQL_URL

  ```

- Replace **`YOUR_ELEPHANTSQL_URL`** with the URL link you copied from ElephantSQL in the previous step. This sets up the database connection for your application.

### 5. Running the Server

- Start the server using:

  ```bash
  npm start

  ```

- For development, **`npm run dev`** can be used to leverage Nodemon for hot reloading.

### 6. Accessing the Application

- The server will be accessible at **`http://localhost:3000`**.

### 7. Database Initialization

- Without closing the terminal running the server, open a new terminal window to set up the database: Set up the necessary database tables and seed them, if required, using:

  ```bash
  npm run setup-db

  ```

## **Known Bugs and Issues**

### **Current Challenges**

---

_This document is subject to updates and improvements. Last updated on 24/11/23._
