import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}));


app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(express.json());
app.use(cookieParser()); 

// Debug route to confirm server is running
app.get("/", (req, res) => {
  res.send("Server is live");
});

// Routes

import authRoutes from "./src/routes/auth.route.js";
import contactRoutes from "./src/routes/contacts.route.js";


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/contact", contactRoutes)


connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed", err);
  });
