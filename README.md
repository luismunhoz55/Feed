
# Simple Messaging Platform

## Description

This project is a simple messaging platform similar to Twitter but much simpler in functionality. It allows users to post messages and interact with other users' posts.

## Setup

To set up the project, follow these steps:

1. Navigate to the `web` directory:

   ```
   cd web
   ```
2. Install dependencies:

   ```
   npm install
   ```
3. Run the development server:

   ```
   npm run dev
   ```

   If successful, the website will be running. Note that the backend is not set up yet, so the functionality will be limited at this stage.
4. Next, navigate to the `server` directory:

   ```
   cd ../server
   ```
5. Install backend dependencies:

   ```
   npm install
   ```
6. Set up the database by running the migration command:

   ```
   npx prisma migrate dev
   ```

   This command generates the necessary tables and creates the database. Once completed, you can proceed to run the server.
7. Finally, start the backend server:

   ```
   npm run dev
   ```

   Now, with both the server and web application running, you can create an account and test the application.

## Usage

1. Create an account on the platform.
2. Post messages and interact with other users' posts.

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
