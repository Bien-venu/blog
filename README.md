# Simple Blog Frontend

## Overview
This repository contains the frontend for a simple blog application. The frontend is built using React.js and styling managed through TailwindCSS.

## Technologies Used
- **Frontend Framework:** React.js
- **Styling:** TailwindCSS
- **Development Tool:** Vite

## Features
- User Authentication (Login and Registration)
- Blog Post Management
  - View a list of all blog posts
  - View a single post with comments
  - Create, edit, and delete posts (authenticated users only)
  - Add comments to posts (authenticated users only)
  

## API Endpoints
The frontend interacts with the following backend API endpoints:

### Authentication
| Method | Endpoint        | Description                    |
|--------|-----------------|--------------------------------|
| POST   | /auth/register  | Register a new user            |
| POST   | /auth/login     | Log in with username and password |

### Blog Post
| Method | Endpoint       | Description                             |
|--------|----------------|-----------------------------------------|
| POST   | /posts          | Create a new blog post (Authenticated)  |
| GET    | /posts          | Get a list of all blog posts            |
| GET    | /posts/:id      | Get a specific blog post by ID           |
| PUT    | /posts/:id      | Update a blog post (Authenticated)      |
| DELETE | /posts/:id      | Delete a blog post (Authenticated)      |

### Comments
| Method | Endpoint          | Description                                |
|--------|-------------------|--------------------------------------------|
| POST   | /comments         | Add a comment to a blog post (Authenticated) |
| GET    | /comments/:postId  | Get all comments for a specific blog post  |
| PUT    | /comments/:id      | Update a comment (Authenticated)          |
| DELETE | /comments/:id      | Delete a comment (Authenticated)          |

## Setup and Installation

## Environment Setup
1. git clone this repository && cd to the project directory
2. run `npm install` to install dependencies
3. create a `.env` file in the root project directory
4. copy the `.env.example` to the `.env` file and update it accordingly
5. run `npm run dev` to run project
6. the REACT_APP_BACKEND_SERVER_URL is https://blog-backend-7xb4.onrender.com/api
6. And the local repository run on http://localhost:5173