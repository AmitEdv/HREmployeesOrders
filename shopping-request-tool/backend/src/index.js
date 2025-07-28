const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.post("/requests", (req, res) => {
  const { user_name, note } = req.body;

  if (!user_name || !note) {
    return res.status(400).json({ error: "Missing user name or note" });
  }

  try {
    const request = db.insertRequest(user_name, note);
    res.status(201).json({ message: "Request submitted", request });
  } catch (err) {
    res.status(500).json({ error: "DB insert failed: " + err.message });
  }
});

app.get("/requests", (req, res) => {
  try {
    const requests = db.getAllRequests();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "DB read failed: " + err.message });
  }
});

app.delete("/requests", (req, res) => {
  try {
    db.clearAllRequests();
    res.status(200).json({ message: "All requests deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete: " + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});