// app.js — titik masuk aplikasi.
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("./middlewares/logger");
const cekApiKey = require("./middlewares/cekApiKey");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const smartphoneRoutes = require("./routes/smartphoneRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({ pesan: "API Smartphone Tugas 1 — Kuis Refactor", versi: "1.0.0" });
});

// Rute smartphone: GET tanpa API key; POST/PUT/DELETE dilindungi cekApiKey
app.use("/smartphones", smartphoneRoutes);

// Error handler terpusat & 404
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;