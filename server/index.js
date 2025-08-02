import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import authRoutes from "./src/routes/auth.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); 

// Debug route to confirm server is running
app.get("/", (req, res) => {
  res.send("Server is live");
});

// Routes
app.use("/api/v1/auth", authRoutes);


connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed", err);
  });
