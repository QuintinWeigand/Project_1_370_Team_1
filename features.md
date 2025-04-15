# Features of the Python Code Executor

## Purpose
The Python Code Executor is a web-based application designed to allow users to write, execute, and log Python code directly in their browser. It leverages Pyodide, a Python runtime for the web, to execute Python code without requiring any local Python installation. The application also integrates with a backend server to manage user authentication and maintain a history of executed code.

## Key Features

### 1. **Python Code Execution**
- Users can write Python code in a text area and execute it directly in the browser.
- The application uses Pyodide to run Python code and capture the output or errors.

### 2. **User Authentication**
- Users can register and log in to the application.
- Logged-in users can save their code execution history for future reference.

### 3. **Code Execution History**
- Logged-in users can view a history of their executed Python code along with the corresponding output.
- Users can re-run previous code snippets directly from the history.
- Option to clear the history is also available.

### 4. **Anonymous Mode**
- Users who do not log in can still execute Python code but cannot save their execution history.

### 5. **Database Integration**
- The application uses MongoDB to store user credentials and code execution logs.
- A status indicator shows the connection status of the database.

### 6. **Dockerized Setup**
- The entire application, including the backend server and MongoDB, is containerized using Docker.
- Easy setup and deployment with `docker-compose`.

### 7. **Responsive Design**
- The user interface is designed to be simple and responsive, ensuring usability across different devices.

### 8. **Error Handling**
- Provides clear error messages for invalid Python code or backend issues.

### 9. **Real-Time Feedback**
- A spinner indicates when the Python code is being executed.
- Database connection status is updated in real-time.

### 10. **Security Features**
- Passwords are hashed using bcrypt before being stored in the database.

## Future Enhancements
- Implement advanced code editing features like syntax highlighting and auto-completion.
- Provide detailed analytics for code execution history.
