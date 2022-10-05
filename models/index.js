const mongoose = require("mongoose")

const dbName = "projectsDb"

const uri = `mongodb://127.0.0.1/${dbName}`
mongoose.connect(uri)
const db = mongoose.connection

// once vs open ????
db.once("open", () => {
    console.log(`mongodb connected @ ${db.host}:${db.port}`)
})
db.on("error", (err) => {
    console.warn("ERROR WITH MONGOOSE\n", err)
})

module.export = {
    Project: require("./Project")
}