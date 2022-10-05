- build the server
- connect to db
- build the model
- write to db
- create controllers

embedding > referencing 
- mongo paradigm - information that is accessed together should be stored together 
"references" are what mongo calls their version of foreign keys === NOT the preferred way 
to "embed" a document within another document we provide the sub-document as the data type in the schema. 
the sub document is not really it's own model, we save the parent document whenever we make changes


# STEPS

## Set up server
Install the packages for a node/express project and create a server file.
```bash
npm init -y
npm i express mongoose
touch index.js
```
Create the gitignore and write to it.
```bash
touch .gitignore
echo node_modules >> .gitignore
```
Create the express app, and invoke an instance of it. Require the mongoose package, which we will configure later. Set the port and create the listener.
```js
const express = require("express")
const mongoose = require("mongoose")
const app = express()

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Broadcasting on port ${PORT}`)
})
```

## Connect to database
Create the directories and files for the model, and it's export `index.js`.
```bash
mkdir models
touch models/index.js models/Projects.js
```
Create the database.
```bash
mongo
use projectDb
```
Just like the server file in `index.js`, require the mongoose package and set a variable for the database name.
```js
const mongoose = require("mongoose")
const dbName = "projectsDb"
```
Set the uri string so mongoose can use it for a connection. Create a variable to hold the mongoose connection. Then provide functions for mongoose to execute in certain circumstances.
```js
const uri = `mongodb://127.0.0.1/${dbName}`
mongoose.connect(uri)
const db = mongoose.connection
db.once("once", () => {
    console.log(`mongodb connected @ ${db.host}:${db.port}`)
})
db.on("error", (err) => {
    console.warn("ERROR WITH MONGOOSE \n", err)
})
```