const express = require("express");
const cors = require("cors");
const budget = require("./controllers/budget");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/transactions", budget);

app.get("/", (req, res)=>{
    res.send(`Welcome to the Budgeting Server`);
});

app.get("*", (req,res)=>{
    res.status(404).json({error: "Page not found"})
});

module.exports = app;