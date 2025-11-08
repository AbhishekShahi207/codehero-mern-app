import mongoose from "mongoose";
import { ENV } from "./env.js";

export const dbconnect  =async()=>{
  try {
    if(!ENV.DB_URL){
      throw new Error("Db url in not defined in the environment varibale")
    }
      const db=await mongoose.connect(ENV.DB_URL)
      console.log("✅Database Connected Successfully",db.connection.host)

  } catch (error) {
    console.log("❌Error in Connecting database",error)
    process.exit(1)//0 meeans success and 1 means failure
  }
}