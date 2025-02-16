import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;


//add new tea
app.post("/teas",(req,res)=>{
    const {name, price}=req.body;
    const nextTea = {id : nextId++,name,price};
    teaData.push(nextTea);
    res.status(201).send(nextTea);
})

//get all tea
app.get("/teas",(req,res)=>{
    res.status(200).send(teaData);
})

//get a tea by id
app.get("/teas/:id",(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Tea not found")
    }
    res.status(200).send(tea)
})

//update the tea
app.put("/teas/:id",(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Tea not found")
    }
    const {name,price}=req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send("ok");
})


//delete the tea
app.delete("/teas/:id",(req,res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))

    if(index == -1){
        return res.status(404).send("Tea not found")
    }
    teaData.splice(index, 1);
    res.status(204).send("Delete")
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})