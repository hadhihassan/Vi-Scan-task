# Blog Application

## Overview

The **Blog Application** is a full-stack project designed to manage blogs efficiently. It allows users to register, log in, create, view, update, and delete blog posts. The application is built with a modern tech stack, featuring React for the front-end, Node.js for the back-end, and PostgreSQL as the database. The project is hosted on a Vercel and Render for accessibility.

## Features

### User Management
- **Sign Up**: Register with email, username, and password.
- **Login**: Secure authentication using email/username and password.
- **Profile Management**: Update username, email, and profile picture.

### Blog Post Management
- **Create Post**: Logged-in users can create blog posts with:
  - Poster (image upload).
  - Title.
  - Content (rich text editor with bold, italic, underline options).
- **View Posts**:
  - View a paginated list of all blog posts.
  - View details of a specific blog post.
- **Update Post**: Edit blog posts created by the user.
- **Delete Post**: Remove blog posts created by the user.

### Front-End
- Framework: React.
- **Responsive Design**: Fully responsive for mobile and desktop devices.
- **UI Framework**: MUI for a modern and responsive design.
- **Dynamic Interactivity**: Implemented using React components and hooks.

### Back-End
- Framework: Node.js with Express.
- **REST API**: Supports CRUD operations for blogs and user management.
- **Authentication**: Secured with JWT (JSON Web Tokens).

### Database Integration
- Database: PostgreSQL with Prisma ORM.
- **Model Design**:
  - User table for managing user data.
  - BlogPost table with relationships and constraints for posts.

### Hosting
- Hosted on: [Render/Vercel/Cyclic] (choose one based on your hosting).
- Live Application Link: [(https://vi-scan-task-myg5.vercel.app/)].

---

## Project Structure

The project follows a clean structure for maintainability:

- **`frontend/`**: Contains the React front-end code.
- **`backend/`**: Contains the Node.js back-end code with routes, controllers, and Prisma schema.

---

## Setup Instructions

### Prerequisites
- Node.js
- PostgreSQL

### Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/hadhihassan/Vi-Scan-task
    ```

2. **Setup Back-End**:
    ```bash
    cd ./backend
    npm install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the `backend` folder:
    ```bash
    PORT=
    JWT_SECRET=
    NODE_ENV=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    DATABASE_URL=
    CLIENT_URL=http:
    ```

4. **Run Migrations**:
    ```bash
    npx prisma migrate dev
    ```

5. **Start the Server**:
    ```bash
    npm run start
    ```

6. **Setup Front-End**:
    ```bash
    cd ./frontend
    npm install
    ```

7. **Start the Front-End**:
    ```bash
    npm run dev
    ```

8. **Access the Application**:
    Open your browser at `https://localhost:5172/`.

---
