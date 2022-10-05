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
Export any model you create from the module exports in index.js
```js
module.exports = {
    Project: require("./Project")
}
```

## Build the models
Require mongoose in the Project.js file. Then build the schemas for the embedded model (Skill) and the parent model we'll export by name (Project).
```js
const mongoose = require("mongoose")

const SkillSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    }
}, {
    timestamps: true
})

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String
    },
    deployed: {
        type: Boolean
    },
    technologies: [SkillSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model("Project", ProjectSchema)
```


## Write to db
Create a file where we will test queries to the database.
```bash
touch testDb.js
```
Require the models directory and save it to a variable.
```js 
const db = require("./models")
```
Create a new project
```js
const createProject = async () => {
    try {
        const newProject = await db.Project.create({
            title: "diy api",
            deployed: true
        })
        console.log("NEW PROJ", newProject)
    } catch(err) {
        console.log(err)
    }
}
createProject()
```
Comment out the invocation of createProject.

Find that project by looking for the first deployed=true project.
```js
const findProject = async () => {
    try {
        const foundProject = await db.Project.findOne({
            deployed: true
        })
        console.log("found PROJ", foundProject)
    } catch(err) {
        console.log(err)
    }
}
findProject()
```
Comment out the invocation of findProject.

Save the id that it returns to you as a string variable.
```js
const projectId = "633d99446f02dc45c2337cf9"
```
Update that project. `findOneAndUpdate` needs 3 objects, the search clause, the updated data, and {new: true} so it shows it to us. 
```js
const updateProject = async () => {
    try {
        const updatedProject = await db.Project.findOneAndUpdate(
            {
                _id: projectId
            },
            {
                deployed: false
            },
            {
                new: true
            }
        )
        console.log("UPDATED PROJ", updatedProject)
    } catch(err) {
        console.log(err)
    }
}
updateProject()
```
Comment out the invocation of updateProject.

Find a project by the same saved id, and delete. Do not console log the project, only a string.
```js
const deleteProject = async () => {
    try {
        const deletedProject = await db.Project.findOneAndDelete({
            _id: projectId
        })
        console.log("DELETED PROJ")
    } catch(err) {
        console.log(err)
    }
}
deleteProject()
```