# Project Flow + thought process

## Features

- Create a new todo
- Fetch all todos
- Update a todo
- Delete a todo
- Fetch a single todo by ID
- Implement search functionality with debouncing on the frontend
- Pagination

## packages:

1. express

- preferring Express over the Node.js for creating server because Express provides:
  1.  built-in middleware support
  2.  easier routing
  3.  request and response helpers
  4.  better error handling.

  ( with node we can still create servers, but we have to manually handle url, body etc and it creates a lot of boiler-plate code)

2. mongodb
3. dotenv

- because we cannot directly require env as we are not exporting anything from file.
- require is meant for json or js modules not for plain text like .env files
- dotenv package takes .env file, parse it in key-value pair, and them add environment variables to inbuilt object of node js i.e process.env

4. mongoose
5. validator

##

- created a server using express.
- created a database
- connecting to the database before connecting to server as if we run the server first and user accessed something, our app will crash as our db is not connected we will run into erros
