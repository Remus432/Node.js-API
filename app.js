// Import modules
const express = require("express");
const path = require("path");
const request = require("request");
const cors = require("cors");


// Init Express App
const app = express();

// Middleware HTTP Requests
app.use(cors());

// Set View Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// Homepage
app.get("/", (req, res) => {
    res.send("Welcome to the Chuck Norris API");
})

// Jokes
app.get("/jokes", (req, res) => {
    request({
        url: "https://api.icndb.com/jokes",
        json: true
    }, (error, response, body) => {
        console.log(error);
        console.log(response.statusCode);
        const data = body.value;
        console.log(data);
        res.render("index", {
            jokes: data,
            answer: "Chuck Norris"
        });
    })
});


// Random Jokes
app.get("/jokes/random", (req, res) => {
    request({
        url: "https://api.icndb.com/jokes/random",
        json: true,
    }, (error, response, body) => {
        console.log(error);
        console.log(response.statusCode);
        const data = body.value.joke;
        res.send(`<h1>${data}</h1>`);
    })
})


// API Endpoint
app.get("/api/jokes", (req, res) => {
    request({
        url: "https://api.icndb.com/jokes",
        json: true
    }, (error, response, body) => {
        console.log(error);
        console.log(response.statusCode);
        const data = body.value;
        console.log(data);
        res.json(data);
    })
});


app.get("/api/jokes/random", (req, res) => {
    request({
        url: "https://api.icndb.com/jokes/random",
        json: true,
    }, (error, response, body) => {
        console.log(error);
        console.log(response.statusCode);
        const data = body.value;
        res.json(data);
    })
})

// Listen To Port
app.listen(3000, () => console.log("Server running on port 3000..."));