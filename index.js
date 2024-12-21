const fs = require("fs");
const express = require("express");
const { data } = require("react-router-dom");
const app = express(); 
app.use(express.json());
file="todoserver/todos.json"
app.get("/", (req, res)=>{
    fs.readFile(file,"utf-8", (err, data)=>{
        if(err) return res.status(500).json({
            message: err.message,
        });
        else{
            // res.status(200).send(data);
            let fdata = JSON.parse(data);
            let string="";
            for(let i = 0;i < fdata.length;i++){
                string = string+`${fdata[i].id}.)`+fdata[i].todo +"\n"+"<br>"
            }
            res.send(string)
        }
    })
})
app.post("/", (req, res)=>{
    const {todo} = req.body;
    fs.readFile(file,"utf-8", (err,data)=>{
        if(err) return res.status(500).json({
            message: err.message,
        });
        else{
            let fdata = JSON.parse(data);
            fdata.push({
                id:fdata.length+1,
                todo:todo,
            })
            fs.writeFile(file, JSON.stringify(fdata,null,2),"utf8",(err) => {
                if(err){
                    res.status(500).json({
                        message: err,
                    })
                }
                else{
                    res.status(200).json({
                        message:"todo added"
                    })
                }
            })
        }
    })
})
app.delete("/", (req, res)=>{
    const{id} = req.body;
    fs.readFile(file,"utf-8",(err,data)=>{
        if(err) return res.status(500).json({
            message:err.message,
        })
        else{
            let fdata=JSON.parse(data);
            fdata.splice(id-1,1);
            for(let i=0;i<fdata.length;i++){
                fdata[i].id=i+1;
            }
            fs.writeFile(file, JSON.stringify(fdata,null,2),"utf-8",(err) => {
                if(err){
                    res.status(500).json({
                        message:err.message,
                    })
                }
                else{
                    res.status(200).json({
                        message: "succesfully deleted",
                    })
                }
            })
        }
    })
})
app.listen(3000)