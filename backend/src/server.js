import express from "express";
import { ENV } from "./lib/env.js";
const app=express()


const PORT =ENV.PORT || 3001

app.get('/',(req,res)=>{
    res.status(200).json({message:"Success"})
})


app.listen(PORT,()=>{
    console.log("server is running on port ",PORT)
})