import express from "express";

const app = express();
app.use(express.json());

let botStatus = {
  connected: false,
  user: null,
  startedAt: Date.now()
};

app.get("/", (req, res) => {
  res.json({
    name: "MordeKiller",
    status: "running"
  });
});

app.get("/status", (req, res) => {
  res.json({
    connected: botStatus.connected,
    user: botStatus.user,
    uptime: process.uptime()
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    memory: process.memoryUsage(),
    node: process.version
  });
});

app.post("/restart", (req, res) => {
  res.json({
    success: true,
    message: "Restart requested."
  });

  setTimeout(() => process.exit(0), 1000);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
