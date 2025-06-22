# 📖 Library Management API with Express, TypeScript & MongoDB

### Deploy Link: library-management-system-five-drab.vercel.app

## 🎯 Objective

Develop a Library Management System using Express, TypeScript, and MongoDB (via Mongoose) with complete CRUD operations for books and borrowing functionality.

## 🚀 Features

- Full book management (create, read, update, delete)
- Book borrowing system with availability control
- Aggregation pipelines for reporting
- Robust validation and error handling
- Filtering and sorting capabilities

## 🔧 Core Requirements

- Express.js with TypeScript
- MongoDB via Mongoose
- Following exact API specifications

## 📚 Models

### Book Model

| Field         | Type    | Validation                                                             |
| ------------- | ------- | ---------------------------------------------------------------------- |
| `title`       | string  | Required                                                               |
| `author`      | string  | Required                                                               |
| `genre`       | string  | `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY` |
| `isbn`        | string  | Required, unique                                                       |
| `description` | string  | Optional                                                               |
| `copies`      | number  | Required, ≥ 0                                                          |
| `available`   | boolean | Default: `true`                                                        |

### Borrow Model

| Field      | Type     | Validation           |
| ---------- | -------- | -------------------- |
| `book`     | ObjectId | Required (ref: Book) |
| `quantity` | number   | Required, > 0        |
| `dueDate`  | Date     | Required future date |

## 🌟 API Endpoints

### 1. Create Book

`POST /api/books`

```json
// Request
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}

// Response
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
2. Get All Books
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

Query Parameters:

filter: Genre filter

sortBy: Field to sort

sort: asc or desc

limit: Results count (default: 10)

json
// Response
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  ]
}
3. Get Book by ID
GET /api/books/:bookId

json
// Response
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
4. Update Book
PUT /api/books/:bookId

json
// Request
{
  "copies": 50
}

// Response
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
5. Delete Book
DELETE /api/books/:bookId

json
// Response
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
6. Borrow a Book
POST /api/borrow

json
// Request
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

// Response
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
7. Borrowed Books Summary
GET /api/borrow

json
// Response
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
❌ Error Handling
json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
🛠️ Setup
Clone repository

Install dependencies: npm install


Run dev server: npm run dev

💻 Tech Stack
Backend: Express + TypeScript

Database: MongoDB (Mongoose)

Deployment: Vercel
```
