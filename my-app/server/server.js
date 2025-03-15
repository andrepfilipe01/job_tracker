const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:secret@localhost:27017/?authSource=admin";

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected via Docker"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Job Schema & Model
const jobSchema = new mongoose.Schema({
  company: String,
  location: String,
  position: String,
  date: String,
  status: { type: String, default: "Pending" },
  job_link: String,
});
const Job = mongoose.model("Job", jobSchema);

// API Routes
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    console.log("Sending Jobs:", jobs); // Debugging line
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});


app.post("/api/jobs", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

app.put("/api/jobs/:id", async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedJob);
});

app.delete("/api/jobs/:id", async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid job ID" });
  }

  try {
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
