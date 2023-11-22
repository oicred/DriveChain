import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [uri, setUri] = useState('');
    const [contents, setContents] = useState([]);

    // Function to submit content
    const submitContent = async () => {
        try {
            await axios.post('http://localhost:3000/api/submitContent', { uri });
            fetchContents(); // Refresh the content list after submission
        } catch (error) {
            console.error('Error submitting content:', error);
        }
    };

    // Function to fetch contents
    const fetchContents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/contents');
            setContents(response.data);
        } catch (error) {
            console.error('Error fetching contents:', error);
        }
    };

    // Fetch contents on component mount
    useEffect(() => {
        fetchContents();
    }, []);

    return (
        <div>
            <h1>DriveChain Content Submission</h1>
            <input
                type="text"
                value={uri}
                onChange={(e) => setUri(e.target.value)}
                placeholder="Enter content URI"
            />
            <button onClick={submitContent}>Submit Content</button>

            <h2>Submitted Contents</h2>
            <ul>
                {contents.map((content, index) => (
                    <li key={index}>{content.uri} - Earnings: {content.earnings}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
