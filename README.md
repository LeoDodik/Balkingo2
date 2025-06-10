# Balkingo Project - Backend and Frontend

## Project Overview
Balkingo is a language learning platform aimed at helping Croatian, Bosnian, and Serbian speakers learn German. The project is built with a **Spring Boot** backend, and the frontend uses **AngularJS** for a dynamic, responsive interface.

## Tech Stack
- **Backend**:
  - **Spring Boot** (Java)
  - **Spring Data JPA** (for database interaction)
  - **PostgreSQL** (future integration)
  - **Gradle** (for project build and dependency management)

- **Frontend**:
  - **AngularJS** (JavaScript framework for single-page applications)
  - **HTML/CSS** (for structure and styling)
  - **Bootstrap** (for responsive design)

- **Version Control**:
  - **Git** for source code management
  - **GitHub** as the remote repository

---

## Features
1. **User Authentication**: Allows users to register, log in, and manage their profile.
2. **Dashboard**: Displays a user panel with personalized content and lessons.
3. **Lesson Management**: Users can browse and complete lessons in various categories.
4. **Progress Tracking**: Tracks user progress and provides feedback on learning.

---

## Backend Setup Instructions

### Prerequisites
- **Java 17** (or newer)
- **Gradle** (for project build)
- **IDE**: IntelliJ IDEA (Community or Ultimate Edition)

### Steps to Set Up the Backend:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/balkingo.git
    cd balkingo/backend
    ```

2. **Build the Project**:
    Use Gradle to build the project:
    ```bash
    ./gradlew build
    ```

3. **Run the Backend Application**:
    You can run the backend with the following command:
    ```bash
    ./gradlew bootRun
    ```
    The application will start on `http://localhost:8080`.

---

## Frontend Setup Instructions

### Prerequisites
- **Node.js** (>= 12.0.0)
- **npm** (Node package manager)

### Steps to Set Up the Frontend:

1. **Clone the Repository** (if not done already):
    ```bash
    git clone https://github.com/yourusername/balkingo.git
    cd balkingo/frontend
    ```

2. **Install Dependencies**:
    Use npm to install the necessary dependencies:
    ```bash
    npm install
    ```

3. **Run the Frontend Application**:
    Start the frontend development server:
    ```bash
    npm start
    ```
    The frontend will be available at `http://localhost:4200`.


## ✅ How to Add Bootstrap 5 to Your Angular Project

### 1. Install Bootstrap via npm  
In your `balkingo/frontend` directory, run:

```bash
npm install bootstrap


### Open angular.json and locate the build > options > styles and scripts arrays. Then add:

"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
# Balkingo2
