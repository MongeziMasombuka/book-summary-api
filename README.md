# 📚 Book Summary API

A RESTful API for users to create, retrieve, update, and delete book summaries. Built with Node.js, Express, MongoDB, and JWT-based authentication.

---

## 🚀 Features

- User registration and authentication (JWT)
- Create, read, update, delete book summaries
- Tagging support (e.g., `fiction`, `self-help`)
- Protected routes for authenticated users
- Timestamps for tracking changes

---

## 🛠️ Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- dotenv

---

## 📦 API Endpoints (/api/auth)

### Auth

| Method | Endpoint    | Description                             | Auth Required     |
|--------|-------------|-----------------------------------------|-------------------|
| POST   | `/register` | Register a new user                     | ❌ No             |
| POST   | `/login`    | Log in an existing user                 | ❌ No             |
| POST   | `/logout`   | Log out and clear refresh token         | ✅ Yes (cookie)   |
| POST   | `/refresh`  | Get new access token via refresh token  | ✅ Yes (cookie)   |

> 📝 The refresh token is stored in an **HTTP-only cookie**.  
> 🔐 Access tokens must be sent as a **Bearer token** in the `Authorization` header for protected routes.


### Book Summaries (`/api/summaries`)

| Method | Endpoint               | Description                    | Auth Required         |
|--------|------------------------|--------------------------------|-----------------------|
| GET    | `/api/summaries`       | Get all summaries              | ❌ No                 |
| GET    | `/api/summaries/:id`   | Get a single summary by ID     | ❌ No                 |
| POST   | `/api/summaries`       | Create a new summary           | ✅ Yes (access token) |
| PUT    | `/api/summaries/:id`   | Update a summary (if owner)    | ✅ Yes (access token) |
| DELETE | `/api/summaries/:id`   | Delete a summary (if owner)    | ✅ Yes (access token) |


---

## 🧪 Sample Summary Payload

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "summary": "A practical guide to building good habits and breaking bad ones.",
  "tags": ["self-help", "productivity"]
}
````

---

## 🔐 Authentication

* Use JWT for protected routes.
* Pass token in headers as:

  ```http
  Authorization: Bearer <your_token_here>
  ```

---

## 🧰 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/book-summary-api.git
cd book-summary-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the server

```bash
npm run dev
```

Server runs at: [http://localhost:5000](http://localhost:5000)

---

## 🗃 Project Structure

```
/models         -> Mongoose models
/routes         -> Route definitions
/controllers    -> Business logic (optional)
middleware/     -> Auth middleware
.env            -> Environment variables
server.js       -> App entry point
```

---

## ✅ TODO

* [ ] Add Swagger/OpenAPI documentation
* [ ] Add GET /api/summaries query parameters to support filters, pagination, or sorting
* [ ] Add unit tests with Jest or Mocha
* [ ] Deploy to Render, Railway, or Vercel

---


