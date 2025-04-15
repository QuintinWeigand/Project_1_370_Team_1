# Installation Guide

This guide will help you set up the project locally on your machine using Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. [Docker](https://www.docker.com/)
2. [Git](https://git-scm.com/)

## Steps to Set Up the Project

1. **Clone the Repository**

   Open a terminal and run the following command to clone the repository:

   ```bash
   git clone <repository-url>
   ```

   Replace `<repository-url>` with the actual URL of the GitHub repository.

2. **Navigate to the Project Directory**

   ```bash
   cd <repository-folder>
   ```

   Replace `<repository-folder>` with the name of the folder created after cloning the repository.

3. **Set Up Docker**

   Ensure Docker is running on your system. Then, build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

   This will set up the MongoDB database and any other services defined in the `docker-compose.yml` file.

4. **Access the Application**

   Open your web browser and navigate to:

   ```
   http://localhost:3000
   ```

   You should see the application running locally.

## Additional Notes

- To stop the Docker containers, press `Ctrl+C` in the terminal where `docker-compose up` is running, or run:

  ```bash
  docker-compose down
  ```

- If you encounter any issues, ensure Docker is properly installed and configured.
