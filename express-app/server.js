const express = require('express');
const cors = require("cors");

const app = express();

const candidates = [
  { id: 1, name: "Hari", skills: ["react", "node", "mongodb"], experience: 3 },
  { id: 2, name: "Anjali", skills: ["react", "typescript"], experience: 2 },
  { id: 3, name: "Rahul", skills: ["node", "express", "aws"], experience: 5 },
  { id: 4, name: "Sneha", skills: ["python", "django"], experience: 1 },
  { id: 5, name: "Arjun", skills: ["react", "node"], experience: 4 },
];

app.listen(5005,()=>{
    console.log('server started running on port 5005');
})

app.use(express.json());

app.use(cors());

app.get("/candidates",(req,res)=> {
    res.status(200).json(candidates);
})

app.get("/candidates/:id",(req,res)=> {
    const id = Number(req.params.id);
    const candidate = candidates.find(c => c.id === id);
    if(!candidate) return res.status(404).json({message: "candidate not found"});
    res.status(200).json(candidate);
})

app.post("/create", (req,res) => {
    const requestBody = req.body;
    console.log(requestBody);
    const data= {
        id: candidates.length + 1,
        name: requestBody.name,
        skills: [requestBody.skills],
        experience: requestBody.experience
    }
    candidates.push(data);
    res.status(201).json({
        message: "candidate created",
        data: data
    })
})

module.exports = app;