# GraphQL Transaction API

This is a Node.js-based GraphQL API for managing and querying transactions. The API is built with Apollo Server, Express, and Prisma. It connects to a PostgreSQL database to store and retrieve transaction data.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Server](#running-the-server)
- [Testing](#testing)
- [Schema](#schema)
- [License](#license)

## Features

- Create and query transactions using GraphQL.
- Simple and scalable architecture with Apollo Server and Express.
- Prisma ORM for easy database interaction with PostgreSQL.
- Comprehensive unit tests using Jest and Supertest.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v12.x or later)
- npm (v6.x or later)
- PostgreSQL database

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Wolfof420Street/gpn-be.git
   cd gpn-be

2. **Install dependencies:**

    ```bash

    npm install
    Set up Prisma:

3. **Initialize Prisma and configure your database connection:**

    ```bash

    npx prisma init
    Update the DATABASE_URL in the .env file with your PostgreSQL connection string:
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb"


4. **Run database migrations:**

    Apply the Prisma schema to your database:**

    ```bash

    npx prisma migrate dev --name init

5. **Generate Prisma client:**

    ```bash

    npx prisma generate

**Running the Server**

Start the server with the following command:

    npm start

By default, the server will run on http://localhost:3000. You can access the GraphQL Playground at http://localhost:3000/graphql.

**Testing**
This project uses Jest and Supertest for unit testing.

**Run all tests:**

   
    npm test
    
Run tests with coverage:


    npm test -- --coverage

**Schema**

The Prisma schema defines a Transaction model with the following fields:

**prisma**

model Transaction {
  id          Int     @id @default(autoincrement())
  timestamp   String
  type        String
  txHash      String
  gasUsed     Int
  gasPrice    Int?
  gasLimit    Int
  gasFee      Int
  link        String
  from        String
}

**The GraphQL schema provides the following operations:**


***Queries***
transactions(address: String!): [Transaction]
Retrieves a list of transactions filtered by the from address.


***Mutations***
createTransaction(...)


Creates a new transaction with the specified details.


**License**
This project is licensed under the MIT License - see the LICENSE file for details.