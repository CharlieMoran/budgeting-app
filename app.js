const express = require("express");
const cors = require("cors");
const budgeting = require("./controllers/budget");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/transactions", budgeting);

app.get("/", (require, response)=>{
    response.send(`Welcome to the Budgeting Server`);
});

app.get("*", (require,response)=>{
    res.status(404).json({error: "Page not found"})
});

module.exports = app;