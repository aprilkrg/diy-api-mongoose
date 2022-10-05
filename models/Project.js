const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String
    }
})