
import { chatClient } from "../lib/stream.js"

export const getStreamToken=async(req,res)=>{

    try {
        const token =chatClient.createToken(req.user.clerkId)//using clerkId instead of userID becasue thorugh inngest we passsed clerkId to stream  

        res.status(200).json({
            token,
            userId:req.user.clerkId,
            userName:req.user.name,
            userImage:req.user.image,
        })
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log("Error in getStream Token constroller",error)
    }
}