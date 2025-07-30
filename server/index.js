import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURI = process.env.DATABASE_URI;

app.use(
    cors({
        origin: [process.env.ORIGIN],
        methods: ["GET","POST","PUT","PATCH","DELETE"],
        credentials: true
    })
)


app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express)
app.use(cookieParser);


const server = app.listen(port, () => {
    console.log(`Server is running at http:/localhost:${port}`);
})

connectDB()
.then( () => {
    app.listen(port, () => {
        console.log(`Server is running at http:/localhost:${port}`)
    })
})
.catch(err => {
    console.log("MongoDB Connection Failed!!", err);
})


// import routers

import authRoutes from "./src/routes/auth.route.js";



app.use("api/v1/auth", authRoutes);