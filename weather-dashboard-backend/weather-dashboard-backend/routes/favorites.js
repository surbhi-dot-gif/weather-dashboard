import express from "express";
import Favorite from "../models/Favorite.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add favorite
router.post("/", verifyToken, async (req, res) => {
  try {
    const favorite = new Favorite({ userId: req.user.id, city: req.body.city });
    await favorite.save();
    res.json(favorite);
  } catch (err) {
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

// Get favorites
router.get("/", verifyToken, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// Delete favorite
router.delete("/:city", verifyToken, async (req, res) => {
  try {
    await Favorite.deleteOne({ userId: req.user.id, city: req.params.city });
    res.json({ message: "Favorite removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});

export default router;
