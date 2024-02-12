# Blockchain-Skill-test

This project is a blockchain-based application, consists of a backend built with Node.js and a frontend created with React. This document outlines the setup instructions, changes made, and areas for future improvement.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Changes Made](#changes-made)
3. [Areas of Improvement](#areas-of-improvement)

## Setup Instructions <a name="setup-instructions"></a>

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm. You can check your Node.js and npm version by running `node -v` and `npm -v` in your terminal. If you have a different version, you can use [nvm](https://github.com/nvm-sh/nvm) to switch to the required version.
- You have installed Yarn. You can check if Yarn is installed by running `yarn -v` in your terminal. If Yarn is not installed, you can install it by running `npm install --global yarn`.
- You have installed and setup [MySQL](https://dev.mysql.com/downloads/mysql/) server. If MySQL is not installed, you can install it by running `sudo apt install mysql-server`.

### Installing

To setup the project on your local machine:

1. Clone the repository
    ```bash
    git clone https://github.com/Shayawnn/Blockchain-Skill-test.git
    ```
2. Navigate to the project directory
    ```bash
    cd Blockchain-Skill-test
    ```
3. Install the required dependencies:
   ```bash
    yarn install
    ```
4. Navigate to the `backend` directory
    ```bash
    cd backend
    ```
5. Install the required dependencies:
   ```bash
    yarn install
    ```
6. Create a database as per the `DB_DATABASE` configuration and update the following configurations based on the provided `.env` template:
   ```bash
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=[Your_DB_Username]
    DB_PASS=[Your_DB_Password]
    DB_DATABASE=[Your_DB_Name]
    PORT=5000
    SECRET_JWT=[Your_Secret_JWT]
    EMAIL_SERVICE=gmail
    EMAIL=[Your_Email]
    EMAIL_PWD=[Your_Email_Password]
    COINMARKET_APIKEY=[Your_CoinMarket_API_Key]
    ```
7. To run the project, navigate to the project directory:
   ```bash
    npm run dev
    ```
The application will open in your default browser at `http://localhost:3000/`.

### MySQL Setup

1. **Install and Run MySQL Server**:
If you haven't already, you need to install MySQL Server. Once installed, make sure it is running. You can verify this using tools like MySQL Workbench, phpMyAdmin, or command-line tools.

2. **Create the Database**:
Before you can import the SQL files, you need to create a database. This can be done through a MySQL client or command-line interface. The name of the database should match the one specified in your `.env` file (`DB_DATABASE`).
   - For example, if you are using the MySQL command-line client, you can create the database with:
   ```mysql
   CREATE DATABASE mgldefi;
   ```

3. **Import the SQL Files**:
Once the database is created, you need to import the SQL files into this database. These files contain the necessary table structures and possibly some initial data required for your application.
   - You can import these files using a MySQL client or the command line. For instance, using the command line, you can execute:
   ```bash
   mysql -u [username] -p mgldefi < backend/src/db/mgldefi.sql
   ```
   and
   ```bash
   mysql -u [username] -p mgldefi < backend/src/db/new_mgldefi.sql
   ```
   Replace `[username]` with your MySQL username and /path/to/ with the actual path to the SQL files.

4. **Verify the Database Structure**:
After importing, use a MySQL client to check that the tables were created successfully and that the structure matches what your application expects.

## Changes Made <a name="changes-made"></a>

### Backend

- **Database Configuration**: Updated the database host in `backend/.env` from `HOST=localhost:3306` to `DB_HOST=localhost` and added `DB_PORT=3306`.
- **Database Connection**: Modified `backend/src/db/db-connection.js` to include `DB_PORT` in the `mysql2.createPool` configuration.

### Frontend

- **Server URL**: Defined a new `SERVER_URL` in `src/constants/env.js` as `http://localhost:5000/api/` to ensure the frontend can communicate with the backend.
- **ETH Price Display**: In `src/components/views/WalletProfile.js`, imported `useEffect` from `React` and defined `fetchEthPrice` function to fetch the current ETH price and display it on the profile page.

## Areas of Improvement <a name="areas-of-improvement"></a>

### `AccountReg.js` (Registration Component)

1. **Form Validation and Submission**:
- The `register` function is triggered on a button click, not on form submission. This could bypass form validation checks. It's better to tie the registration logic to the `onFinish` attribute of the Ant Design `Form` component.
- Remove the `onClick` handler from the register button and use `onFinish={register}` in the `Form` component.

2. **Error Handling**: 
- The Axios requests in the `register` function should include error handling to manage any issues that occur during the request.

### `Register.js`

1. **Form Validation**:
- Similar to the registration component, use the `Form` component’s `onFinish` attribute for handling form submission. This ensures that the form is validated before attempting to log in.

2. **Password Initialization**:
- The `password` state is initialized with the string `"password"`. This should be an empty string for security reasons.

3. **Error Handling**:
- Implement error handling for the login process. This is crucial for informing the user if something goes wrong during login.

### General Recommendations

1. **Security Enhancements**:
- Implement more robust error handling and input validation both on the frontend and backend.
- Review and strengthen the JWT implementation for improved security.

2. **Performance Optimization**:
- Optimize database queries for faster response times.
- Implement caching mechanisms for frequently requested data like ETH prices.

3. **Scalability Considerations**:
- Design the backend to handle increased loads and scalability for future enhancements.

