import React from 'react';
import { Link } from 'react-router-dom';

// Component for rendering a list of repositories
const Repos = ({ repoJSON }) => {

    // Function to render the list of repositories
    const repoRenderer = () => {
        // Checks if repoJSON is not an array or is empty
        if (!Array.isArray(repoJSON)) {
            return null; 
        }

        // Maps through the repoJSON array to create a list of repository links
        const repoList = repoJSON.map((repo, index) => {
            return (
                <li key={index}>
                    {/* Creates a link to the repository's HTML URL */}
                    <Link to={repo.html_url} target='_blank' className='btn btn-link'>
                        {/* Displays the repository name */}
                        <h3 className='display-6'>{repo.name}</h3>
                    </Link>
                </li>
            );
        });

        // Renders the list of repositories inside a div
        return (
            <div>
                <ul>{repoList}</ul>
            </div>
        );
    };

    // Renders the Repos component
    return (
        <div id="repo-container">
            {/* Title for the Repos component */}
            <h1 className='display-3'>Repos</h1>
            {/* Link to navigate back to the homepage */}
            <Link to="/" className='btn btn-link'>Homepage</Link>
            {/* Renders the repository list */}
            {repoRenderer()}
        </div>
    );
};

export default Repos; 
