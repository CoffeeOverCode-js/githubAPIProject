import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/style.css";
import Form from "./Components/Form";
import Repos from "./Components/Repos";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  // Initializes state variables using useState hooks to manage component state
  const [username, setUsername] = useState("");
  const [userJSON, setUserJSON] = useState({});
  const [repoJSON, setRepoJSON] = useState({});
  const [limitedRepos, setLimitedRepos] = useState({});
  const [commitJSON, setCommitJSON] = useState({});
  const [repoNames, setRepoNames] = useState([]);
  const [error, setError] = useState(true);

  // Initializes function to render the repositories
  const repoRenderer = () => {
    // Checks to see if limitedRepos is not an array
    if (!Array.isArray(limitedRepos)) {
      return null;
    }

    // Maps through the limitedRepos array to render repository details
    const repoList = limitedRepos.map((repo, index) => {
      // Check if there is a corresponding commit for this repo
      const commit = commitJSON[index];

      return (
        <div>
          <br />
          <li key={index}>
            <h3 className="display-6">{repo.name}</h3>
            {commit ? (
              <div>
                <span>
                  <b>Last Commit: </b>
                  {commit.commit.author.date}
                </span>{" "}
                <br />
                <span>
                  <b>Created at: </b> {repo.created_at}
                </span>{" "}
                <br />
                {repo.description === null ? (
                  <p>Description: N/A</p>
                ) : (
                  <span>
                    <b>Description: </b>
                    {repo.description}
                  </span>
                )}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </li>
        </div>
      );
    });

    // Renders the repoList or an error message if there's no data
    return <div>{error ? <p>No Data</p> : <ul>{repoList}</ul>}</div>;
  };

  return (
    // Uses React Router for navigation to different endpoints
    <Routes>
      <Route
        exact
        path="/"
        element={
          <div id="container">
            <div id="left-side">
              {userJSON === 0 ? (
                <p>Loading...</p>
              ) : (
                <div>
                  {/* Renders Form component */}
                  <Form
                    username={username}
                    setUsername={setUsername}
                    userJSON={userJSON}
                    setUserJSON={setUserJSON}
                    error={error}
                    setError={setError}
                    repoJSON={repoJSON}
                    setRepoJSON={setRepoJSON}
                    repoNames={repoNames}
                    setRepoNames={setRepoNames}
                    commitJSON={commitJSON}
                    setCommitJSON={setCommitJSON}
                    limitedRepos={limitedRepos}
                    setLimitedRepos={setLimitedRepos}
                  />
                  {/* Renders user details */}
                  {Object.keys(userJSON).length === 0 ? (
                    <h1 className="display-4">No User JSON...</h1>
                  ) : (
                    <div>
                      {error ? (
                        <p>User Not Found</p>
                      ) : (
                        <div>
                          <div>
                            <h1 className="display-6">
                              Username: {userJSON.login}
                            </h1>
                            <img
                              src={userJSON.avatar_url}
                              alt="Profile Picture"
                              className="rounded-circle"
                            />
                          </div>
                          <p className="lead">Name: {userJSON.name}</p>
                          <p className="lead">
                            {userJSON.bio === null
                              ? "Bio: User does not have a bio"
                              : `Bio: ${userJSON.bio}`}
                          </p>
                          <p className="lead">
                            {userJSON.public_repos === null
                              ? "Public Repos: User has no public repos"
                              : `Public Repos: ${userJSON.public_repos}`}
                          </p>
                          <Link to={userJSON.html_url} className="btn btn-link">
                            <p className="lead">Github Profile</p>
                          </Link>{" "}
                          <br />
                          {repoJSON.length === 0 ? (
                            <p>No Repos</p>
                          ) : (
                            <Link to="/repos" className="btn btn-link">
                              <p className="lead">View Repos</p>
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="right-side">
              <h1 className="display-6">Repos</h1>
              {/* Renders repositories */}
              {repoRenderer()}
            </div>
          </div>
        }
      />
      {/* Route for the Repo component */}
      <Route exact path="/repos" element={<Repos repoJSON={repoJSON} />} />
    </Routes>
  );
}

export default App;
