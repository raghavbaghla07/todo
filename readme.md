# Project Flow + thought process

## Requirements

- Create a new todo
- Fetch all todos
- Fetch a single todo by ID
- Update a todo
- Delete a todo
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

- bacause we cannot directly require env as we are not exporting anything from file.
- dotenv package takes .env file, parse it in key-value pair, and them add environment variables to inbuilt object of node js i.e process.env
- require is meant for json or js modules not for plain text like .env files

##

- created a server using express.
- created a database
