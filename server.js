import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import weatherRoutes from "./routes/weather.js";
import favoritesRoutes from "./routes/favorites.js";
import aiAgentRoutes from "./routes/aiAgent.js";
import cors from "cors";




dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/favorites", favoritesRoutes);
app.use("/api/ai-agent", aiAgentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));