import { requireAuth } from '@clerk/express';
import User from '../models/User.js';

//when we pass array of midleware in express ,then it flatten the array and execute them one by one
export const protectRoute=[
    requireAuth(),
    async (req,res,next)=>{
        try {
            const clerkId = req.auth().userId
            if(!clerkId) return res.status(401).json({msg:"Unauthorirzed-Invalid Token"})

                //find user in db using clerkID

                const user =await User.findOne({clerkId:clerkId})

            if(!user) return res.status(404).json({msg:"User not found"})

                //attact user to every next user
                req.user=user

                next()
        } catch (error) {
            console.log('Error in protectRoute middlewares',error)
            res.status(500).json({message:"internal server Error"})
        }
    }
]
