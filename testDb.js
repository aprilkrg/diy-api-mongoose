const db = require("./models")

const createProject = async () => {
    try{
        const newProject = await db.Project.create({
            title: "diy api",
            deployed: false
        })
        console.log("NEW PROJ\n", newProject)
    } catch(err) {
        console.log("MONGOOSE ERROR \n", err)
    }
}
createProject()