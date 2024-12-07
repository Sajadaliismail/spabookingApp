const express = require('express');
const route = require('./server/routes');
const path = require('path');

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// API routes
app.use('/api', route);

// Catch-all route to serve React's index.html for unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(3010, () => {
    console.log('Server is running on 3010');
});
