const express = require("express")
const router = express.Router()
const Project = require("../models/Project")

// INDEX ALL PROJECTS
// GET /projects
router.get("/", async(req,res) => {
    try{
        const allProjects = await Project.find({})
        return res.status(200).json({allProjects})
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: "Server Error"})
    }
})

// SHOW ONE PROJECT
// GET /projects/:id
router.get("/:id", async(req,res) => {
    try{
        const oneProject = await Project.findOne({
            _id: req.params.id
        })
        return res.status(200).json({oneProject})
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: "Server Error"})
    }
})

// UPDATE ONE PROJECT
// PUT /projects/:id
router.put("/:id", async(req,res) => {
    try{
        const updatedProject = await Project.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                title: req.body.title,
                deployed: req.body.deployed
            }, 
            {
                new: true
            }
        )
        return res.status(200).json({updatedProject})
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: "Server Error"})
    }
})

// ADD SKILL(technologies) TO PROJECT
// POST /projects/:id/skill
router.post("/:id/skill", async(req,res) => {
    try{
        const oneProject = await Project.findOne({
            _id: req.params.id
        })
        const newSkill = {
            name: req.body.name,
            description: req.body.description
        }
        console.log("DATA\n", oneProject, "\n", newSkill)
        oneProject.technologies.push(newSkill)
        await oneProject.save()
        return res.status(200).json({oneProject})
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: "Server Error"})
    }
})

module.exports = router