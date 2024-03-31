// Import necessary modules and packages
import express from "express";
import chalk from "chalk";
import cors from "cors";
import axios from "axios";
import helmet from "helmet";
const app = express();
const PORT = process.env.PORT || 8080; // Sets the port for the server

// Sets up the Middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Uses Helmet for security

// Defines a route for the homepage
app.get("/", (req, res) => {
  res.send(`Welcome to Port: ${PORT}`);
});

// Route for fetching user data based
app.get("/user/:username", async (req, res) => {
  try {
    // Recieves username from req parameters
    const username = req.params.username;
    const githubApi = `https://api.github.com/users/${username}`;

    // Makes a GET request to the GitHub API using axois
    const response = await axios.get(githubApi);
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

    // Makes a GET request to the GitHub API
    const response = await axios.get(githubApi);
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
