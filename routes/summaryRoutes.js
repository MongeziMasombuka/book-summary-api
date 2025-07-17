import express from "express";
const router = express.Router();
import Summary from "../models/Summary.js";
import mongoose from "mongoose";
import { protect } from "../middleware/authMiddleware.js";

// @route           GET /api/summaries
// @description     Get all book summaries
// @access          Public
// @query           _limit (optional limit for summaries returned)
router.get("/", async (req, res, next) => {
  try {
    const limit = parseInt(req.query._limit);
    const query = Summary.find().sort({ createdAt: -1 });

    if (!isNaN(limit)) {
      query.limit(limit);
    }

    const summaries = await query.exec();
    res.json(summaries);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @route           GET /api/summaries/:id
// @description     Get single book summary
// @access          Public
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error("Summary Not Found");
    }

    const summary = await Summary.findById(id);

    if (!summary) {
      res.status(404);
      throw new Error("Summary Not Found");
    }
    res.json(summary);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @route           POST /api/summaries
// @description     Create new book summary
// @access          Private
router.post("/", protect, async (req, res, next) => {
  try {
    const { title, author, summary, tags } = req.body || {};

    if (!title?.trim() || !author?.trim() || !summary?.trim()) {
      res.status(400);
      throw new Error("Title, author, and summary are required");
    }

    const newSummary = new Summary({
      title,
      author,
      summary,
      tags:
        typeof tags === "string"
          ? tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : Array.isArray(tags)
          ? tags
          : [],
      user: req.user.id,
    });

    const savedSummary = await newSummary.save();
    res.status(201).json(savedSummary);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @route           DELETE /api/summaries/:id
// @description     Delete book summary
// @access          Private
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error("Summary Not Found");
    }

    const summary = await Summary.findById(id);

    if (!summary) {
      res.status(404);
      throw new Error("Summary not found");
    }

    // Check if user owns summary
    if (summary.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to delete this summary");
    }

    await summary.deleteOne();

    res.json({ message: "Summary deleted successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @route           PUT /api/summaries/:id
// @description     Update book summary
// @access          Private
router.put("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error("Summary Not Found");
    }

    const summary = await Summary.findById(id);

    if (!summary) {
      res.status(404);
      throw new Error("Summary not found");
    }

    // Check if user owns summary
    if (summary.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to update this summary");
    }

    const { title, author, summary: summaryText, tags } = req.body || {};

    if (!title?.trim() || !author?.trim() || !summaryText?.trim()) {
      res.status(400);
      throw new Error("Title, author, and summary are required");
    }

    summary.title = title;
    summary.author = author;
    summary.summary = summaryText;
    summary.tags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    const updatedSummary = await summary.save();

    res.json(updatedSummary);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
