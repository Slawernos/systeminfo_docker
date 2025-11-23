const express = require("express");
const os = require("os");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

function bytesToGb(bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2);
}

app.get("/api/system", (req, res) => {
  const cpus = os.cpus();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();

  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    uptimeSeconds: os.uptime(),
    loadAverage: os.loadavg(), // 1,5,15 min
    cpu: {
      model: cpus?.[0]?.model || "unknown",
      cores: cpus.length
    },
    memory: {
      totalGb: bytesToGb(totalMem),
      freeGb: bytesToGb(freeMem),
      usedGb: bytesToGb(totalMem - freeMem)
    },
    networkInterfaces: os.networkInterfaces(),
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SysInfo server running on http://0.0.0.0:${PORT}`);
});
