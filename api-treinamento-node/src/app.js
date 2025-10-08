const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API de Treinmaneto está no ar!" });
});

app.get("/status", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/users", userRoutes);

module.exports = app;
