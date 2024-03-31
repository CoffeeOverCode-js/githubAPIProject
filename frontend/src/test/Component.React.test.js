// Imports the React library for JSX rendering
import React from "react";
import renderer from 'react-test-renderer';
// Imports component to be tested
import Form from "../Components/Form";

// Tests to see if the content renders correctly
test('renders correctly', () => {
    // Creates a snapshot of the form and converts it to JSON
    const tree = renderer
        .create(<Form />)
        .toJSON();
        // Compares the rendered component with the snapshot
    expect(tree).toMatchSnapshot();
});