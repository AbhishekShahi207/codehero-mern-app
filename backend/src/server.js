import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";


const app=express()

const __dirname=path.resolve()
console.log(__dirname)
const PORT =ENV.PORT || 3001

app.get('/hii',(req,res)=>{
    res.status(200).json({message:"Success"})
})


//deployement code
if(ENV.NODE_ENV === "production"){
    //take the dist folder from frontend and make it as static asset
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    //sending index.html file from dist folder
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on port ",PORT)
})