# ResultAnalyser

A robust full-stack web application for academic result management and analysis, featuring secure role-based backend APIs for student and course administration. Designed to empower educational institutes with scalable data handling, automated analysis, and insightful visualizations.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
    - [Authentication](#authentication)
    - [Admin APIs](#admin-apis)
    - [Student APIs](#student-apis)
    - [Course APIs](#course-apis)
    - [Marks Entry & Analysis](#marks-entry--analysis)
- [Database Models](#database-models)
- [Usage with Postman](#usage-with-postman)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

- **Admin Management:** Secure creation and authentication for admin users.
- **Student Management:** Add, organize, and manage students in divisions (A, B, etc.), bulk creation, and search.
- **Course Management:** Create, update, and assign courses to students or batches.
- **Marks Entry:** Record and update marks for internal and external assessments.
- **Result Analysis:** Visualize student performance using interactive dashboards (Chart.js).
- **Security:** JWT-based authentication and role-based access control.
- **RESTful APIs:** Well-structured endpoints for backend operations; designed for usage with Postman or other API clients.
- **Bulk Operations:** Efficient APIs for batch data insertion and updates.

---

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT
- **Frontend (optional):** React.js, Chart.js
- **Testing/API Usage:** Postman
- **Other:** JavaScript (ES6+), REST APIs

---

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rock-02/ResultAnalysis.git
   cd ResultAnalysis
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in `server/` with:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   ```

4. **Start the server**
   ```bash
   npm start
   ```

---

## API Documentation

### Authentication

#### Register Admin

`POST /create/admin`

**Payload**
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

**Response**
```json
{
  "msg": "Admin created successfully",
  "admin": { /* admin details */ }
}
```

#### Admin Login

`POST /login`

**Payload**
```json
{
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

**Response**
```json
{
  "msg": "Login Successful",
  "token": "JWT_TOKEN_HERE"
}
```

> Use the received JWT token in the `Authorization` header (`Bearer TOKEN`) for all subsequent admin requests.

---

### Admin APIs

#### Create a Student

`POST /create/student`

**Payload**
```json
{
  "name": "Student Name",
  "usn": "01fe22bcs001",
  "semester": "3",
  "email": "student@example.com",
  "division": "A"
}
```

**Response**
```json
{
  "msg": "Student created successfully",
  "student": { /* student details */ }
}
```

#### Bulk Create Students

`GET /create`

> Automatically adds a batch of students (configured in backend). No payload required.

**Response**
```json
{
  "msg": "Students created successfully",
  "students": [ /* list of student objects */ ]
}
```

#### Get Students by Semester and Division

`POST /get`

**Payload**
```json
{
  "semester": "3",
  "division": "A"
}
```

**Response**
```json
{
  "len": 25,
  "students": [ /* student objects */ ]
}
```

#### Get Students by Semester (All Divisions)

`GET /getstudents/:sem`

**Response**
```json
{
  "len": 50,
  "aDivision": [ /* students in A */ ],
  "bDivision": [ /* students in B */ ],
  "cDivision": [ /* students in C */ ]
}
```

---

### Student APIs

#### Get Single Student

`POST /getone`

**Payload**
```json
{
  "usn": "01fe22bcs001"
}
```

**Response**
```json
{
  "student": { /* student details */ }
}
```

---

### Course APIs

#### Create a Course

`POST /create/course`

**Payload**
```json
{
  "courseName": "Mathematics",
  "courseId": "MATH301",
  "semester": "3",
  "credits": 4
}
```

**Response**
```json
{
  "msg": "Course created successfully",
  "course": { /* course details */ }
}
```

#### Assign Courses to Students (Batch)

`GET /join`

> Assigns predefined courses to students based on their semester.

**Response**
```json
{
  "msg": "added Successfully!"
}
```

---

### Marks Entry & Analysis

#### Enter/Update Marks for a Student

`POST /marks`

**Payload**
```json
{
  "usn": "01fe22bcs001",
  "exam": "isa1",        // or "isa2", "esa"
  "courseId": "MATH301",
  "marks": 83
}
```

**Response**
```json
{
  "msg": "marks of isa1 of student is updated successfully",
  "student": { /* student details including marks */ }
}
```

---

### Password Reset (Admin)

#### Send Password Reset Mail

`POST /restetpassword`

**Payload**
```json
{
  "email": "admin@example.com"
}
```

**Response**
```json
{
  "msg": "Password Reset Mail Sent Successfully"
}
```

#### Reset Password

`POST /reset/:token`

**Payload**
```json
{
  "newPassword": "newpassword",
  "confirmPassword": "newpassword"
}
```

**Response**
```json
{
  "msg": "Password reset successfully"
}
```

---

## Database Models

### Student Model

```js
{
  name: String,
  email: String,
  usn: String,
  semester: String,
  division: String,
  course: [ObjectId], // references Course
  marks: [
    {
      course: ObjectId, // references Course
      isa1: Number,
      isa2: Number,
      esa: Number
    }
  ]
}
```

### Course Model

```js
{
  courseName: String,
  courseId: String,
  semester: String,
  credits: Number
}
```

### Admin Model

```js
{
  name: String,
  email: String,
  password: String,
  resetToken: String
}
```

---

## Usage with Postman

1. **Login as Admin** and get JWT token.
2. **Set JWT token** in `Authorization` header for all protected endpoints.
3. **Use API endpoints** for student and course management, marks entry, and analysis.
4. **Test and automate** workflows for bulk operations, assignments, and result data management.

---

## Contributing

Contributions are welcome!  
- Fork the repo
- Create a feature branch
- Submit a pull request

---

## License

MIT License

---

## Author

- [Tarun S Maidur](https://github.com/rock-02)

---

> For questions, issues, or feature requests, please open an issue in the repository.
