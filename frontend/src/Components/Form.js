import React, { useState } from 'react';

const Form = ({ username, setUsername, userJSON, setUserJSON, error, setError, repoJSON, setRepoJSON, repoNames, setRepoNames, commitJSON, setCommitJSON, limitedRepos, setLimitedRepos  }) => {


    async function fetchData() {
        setCommitJSON({})
        try {
            // Fetch user data
            const userResponse = await fetch(`http://localhost:8080/user/${username}`);
            if (!userResponse.ok) {
                setError(true);
                setUserJSON({ message: "User Not Found" });
                setCommitJSON({message: "User Not Found"})
                throw new Error(`HTTP error! Status: ${userResponse.status}`);
            }
            setError(false);
            const userData = await userResponse.json();
            setUserJSON(userData);
    
            // Fetch repository data
            const repoResponse = await fetch(`http://localhost:8080/repo/${username}`);

            if (!repoResponse.ok) {
              setError(true);
              setRepoJSON({ message: "Repositories Not Found" });
              throw new Error(`HTTP error! Status: ${repoResponse.status}`);
            }
            
            setError(false);
            const repoData = await repoResponse.json();
            if (repoData.length >= 20) {
                repoData.slice(0, 20);
            }
            // Slice the repoData to include only the first 5 repositories
            const slicedRepoData = repoData.slice(0, 4);
            
            setRepoJSON(repoData);
            setLimitedRepos(slicedRepoData)
            
    
            // Extract repository names
            const repoNames = repoData.map(repo => repo.name);
            setRepoNames(repoNames)
            const commitObj = [];
            
            // Loops through the slicedRepoData to find all the commits of the different repos
            for (let i = 0; i < slicedRepoData.length; i++) {
                const commitResponse = await fetch(`https://api.github.com/repos/${username}/${repoNames[i]}/commits`
                );
                
                if (!commitResponse.ok) {
                    setError(true);
                    setCommitJSON({ message: "Commits Not Found" });
                    throw new Error(`HTTP error! Status: ${commitResponse.status}`);
                }
    
                setError(false);
                const commitData = await commitResponse.json();
                commitObj.push(commitData[0]);
            }
            // Sets the relevant data
            setCommitJSON(commitObj);
        } catch (e) {
            console.error('Error:', e);
        }
    }
    


    // Function that calls the fetch data when Submit button is clicked
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    // Returns the HTML Layout of the component
    return (
        <div>
            <h1 className='display-4'>Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button type="submit" className='btn btn-default'>Submit</button>
            </form>
        </div>
    );
};

export default Form;
