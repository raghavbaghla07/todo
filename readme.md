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
6. jsonwebtoken
7. bcrypt
8. cookie-parser

#

- created a server using express.
- created a database
- connecting to the database before connecting to server as if we run the server first and user accessed something,
  our app will crash as our db is not connected we will run into erros
- designed schema for how user and todo should look like, used validator package to check if user is writing a valid email and a check for strong password
- added custom method to userSchema so that when a user logs in,
  we will share him a jwt token,
  that will be used to verify if the data accessed by the user is the one to whom it belongs to

  ### But why are we are sending the token if user is already signedin?

- Reason: HTTP requests are stateless,
  it does not remember anything once an event happened
  so we need to verify again.

- password verification method:
  when a user enters a password, so here bcrypt takes the input pass, and then it compares it with the password that is stored inside the database in hashed format

  ### but as bcrpt will generates a hash on our password and compares it with the one stored in db, would not that be different as hash that was created while storing it in db would be different to that of that is generated for current input
  - bcrypt uses a salt.. and we give this as input while we are signing up.. that hash value contains the salt and while we are comparing the input and the value stored in db it use that salt and if the password is same the hash value that would be generated would be same

  - wrote a .pre() middleware that will hash the password before saving it into the db whenever user.save() will be called, and there would be a check if password is modified, if yes, a new hash would be generated and saved inside the passord in db

- created a auth middleware in which:
  - we extract the token from req.cookie
  - token verification using jwt
  - if present we will store this in req.user and called the next

-
