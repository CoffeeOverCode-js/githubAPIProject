// Import necessary modules and packages
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; // Sets the port for the server
const chalk = require("chalk");
const cors = require("cors");
const axios = require("axios");
const helmet = require("helmet");

// Sets up the Middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Uses Helmet for security

// Defines a route for the homepage
app.get("/", (req, res) => {
  res.send(`Welcome to Port: ${PORT}`);
});

// Github personal access token
const token =
  "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";

// Route for fetching user data based
app.get("/user/:username", async (req, res) => {
  try {
    // Recieves username from req parameters
    const username = req.params.username;
    const githubApi = `https://api.github.com/users/${username}`;

    // Sets the Authorization header with the token
    const headers = {
      Authorization: `token ${token}`,
    };

    // Makes a GET request to the GitHub API using axois
    const response = await axios.get(githubApi, { headers });
    const userData = response.data;

    // Sends the user data as JSON in the response
    res.json(userData);
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API" });
  }
});

// Route for fetching user repositories based on the GitHub username
app.get("/repo/:username", async (req, res) => {
  try {
    // Recieves username from req parameters
    const username = req.params.username;
    const githubApi = `https://api.github.com/users/${username}/repos`;

    // Sets the Authorization header with the token
    const headers = {
      Authorization: `token ${token}`,
    };

    // Makes a GET request to the GitHub API
    const response = await axios.get(githubApi, { headers });
    const userData = response.data;

    // Sends the users repository data as JSON in the response
    res.json(userData);
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API" });
  }
});

// Starts the server and listens to the specified port
app.listen(PORT, () => {
  console.log(chalk.green(`Listening Engaged: ${PORT}`));
});
