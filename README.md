# Notes App

A full-stack Notes Application built with **Nuxt.js**, **NestJS**, and **MongoDB**. The application provides a backend API for managing notes and a frontend interface for interacting with them.

## Tech Stack

### Frontend

- **Nuxt.js** – Vue.js framework for building the user interface.
- **Vue.js** – Component-based frontend development.

### Backend

- **NestJS** – Node.js framework for building a scalable REST API.
- **TypeScript** – Type-safe application development.
- **MongoDB** – NoSQL database for storing application data.
- **Mongoose** – MongoDB object modeling for Node.js.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aidajhangiryan-lab/notes-app.git
cd notes-app
```

### 2. Backend Setup (NestJS)

```bash
cd backend
```

```bash
npm install
```

Configure your `.env` file:

```bash
npm run start:dev
```

### 3. Database Setup (MongoDB)

The application connects to MongoDB using the connection string configured in the backend environment variables.

### 4. Frontend Setup (Nuxt)

```bash
cd frontend
```

```bash
npm install
```

Configure your `.env` file:

```bash
npm run dev
```
