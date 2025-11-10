import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { dbconnect } from "./lib/db.js";
import cors from "cors"
import {serve} from "inngest/express";
import {inngest,functions} from "./lib/inngest.js";
import { clerkMiddleware } from '@clerk/express';
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js"

const app = express();

const __dirname = path.resolve();
console.log(__dirname);
const PORT = ENV.PORT || 3001;

//middlewares
app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(clerkMiddleware())//this adds auth field to request object :req.auth


//Routes
app.use("api/chat",chatRoutes)



//inngest part
app.use("/api/inngest",serve({client:inngest,functions}))



app.get("/hello", (req, res) => {
  res.status(200).json({ message: "hello" });
});





//deployement code
if (ENV.NODE_ENV === "production") {
  //take the dist folder from frontend and make it as static asset
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  //sending index.html file from dist folder
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}



const startServer = async () => {
  try {
    await dbconnect();
    app.listen(PORT, () => {
      console.log("server is running on port ", PORT);
    });
  } catch (error) {
    console.log("❌ Error Starting the server :", error);
  }
};
startServer();
