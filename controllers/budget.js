const express = require("express");
const { response } = require("../app");
const app = require("../app");

const transArray = require("../models/transactions").sort((a, b)=>{
    return a.date < b.date ? 1: a.date > b.date ? -1 : 0;
});

console.log(transArray);
const budgeting = express.Router();

budgeting.get("/", (request, response) => {
    console.log("Get Request");
    response.json(
        transArray.sort((a, b) => {
            return a.date < b.date ? 1: a.date > b.date ? -1 : 0;
        })
    );
});

budgeting.get("/:id", (request, response)=>{
    const {id} = request.params;
    console.log(`Get request to id: ${id}`);
    transArray[id] ? response.json(transArray[id]) : response.redirect("/transactions");
});

budgeting.post("/", (request, response)=> {
    console.log("Post request");
    transArray.push(request.body);
    response.status(201).json(transArray[transArray.length -1]);
});

budgeting.delete("/:id", (request, response) => {
    let {id} = request.params;
    console.log(`Delete request for id: ${id}`);
    transArray[id] ? 
    response.status(200).json(transArray.splice(id, 1)[0]) :
    response.status(404).json({error: "id not found"});
});

budgeting.put("/:id", (request, response) => {
    let { id } = request.params;
    console.log(`Put request for id: ${id}`);
    if (transArray[id]) {
      transArray[id] = request.body;
      response.status(200).json(transArray[id]);
    } else {
      response.status(404).json({ error: "index not found" });
    }
  });

  module.exports = budgeting;