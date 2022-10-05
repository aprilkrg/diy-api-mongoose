const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("./models")

const PORT = 8000

app.use(express.json())

app.use("/projects", require("./controllers/projects"))

app.listen(PORT, () => {
    console.log(`live and listening on port ${PORT}`)
})