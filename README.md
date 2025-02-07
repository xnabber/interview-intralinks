# Bookmarks

A web application built with Angular that allows users to manage their bookmarks efficiently. This app provides features like adding, editing, searching, and deleting bookmarks while ensuring data integrity through custom validators. The application uses NgRx for state management and Angular Material for a modern UI.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## Features

- **CRUD Operations**: Add, edit, search, and delete bookmarks.
- **Duplicate Validator**: Prevents users from adding duplicate bookmarks.
- **HTTP Validator**: Ensures valid URLs are entered for bookmarks.
- **State Management**: Utilizes NgRx for managing application state.
- **Responsive Design**: Built with Angular Material for a clean and responsive UI.
- **JSON Server**: Simulates a backend API for storing and retrieving bookmark entries.

---

## Technologies Used

- **Frontend Framework**: Angular
- **State Management**: NgRx (for store management)
- **UI Library**: Angular Material
- **Backend Simulation**: JSON Server
- **Validators**: Custom Angular validators for duplicate and HTTP URL checks
- **Development Tools**: TypeScript, RxJS

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- JSON Server (`npm install -g json-server`)

### Steps to Run the Application

1. **Clone the Repository**
   ```bash
   git clone https://github.com/xnabber/interview-intralinks/tree/develop
   cd bookmarks
   ```

2. **Switch to the Develop Branch**
   ```bash
   git checkout develop
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start JSON Server**
   - Navigate to the `db.json` file location (usually in the root directory).
   - Start the JSON Server:
     ```bash
     json-server --watch db.json --port 3000
     ```

5. **Run the Angular Application**
   ```bash
   ng serve
   ```
   Open your browser and navigate to `http://localhost:4200`.

6. **Explore the Application**
   - Add new bookmarks.
   - Edit existing bookmarks.
   - Search for bookmarks by name or URL.
   - Delete unwanted bookmarks.

---

## Screenshots

Below are some screenshots showcasing the functionality of the application:

| ![Photo 1](https://github.com/xnabber/interview-intralinks/blob/develop/Bookmarker/photos/photo1.png) | ![Photo 2](https://github.com/xnabber/interview-intralinks/blob/develop/Bookmarker/photos/photo2.png) | ![Photo 3](https://github.com/xnabber/interview-intralinks/blob/develop/Bookmarker/photos/photo3.png) |
|-------------------------------|-------------------------------|-------------------------------|
| **Bookmark List View**        | **Search Results**            | **Add/Edit Bookmark Form**    |

---

## Contributing

We welcome contributions to improve this project! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Clone the forked repository and switch to the `develop` branch.
3. Create a new branch for your feature or bug fix.
4. Make your changes and ensure all tests pass.
5. Submit a pull request detailing your changes.

For any questions or issues, feel free to open an issue in the repository.

---
