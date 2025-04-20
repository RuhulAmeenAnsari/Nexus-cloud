const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Create necessary directories if they don't exist
const gamesDir = path.join(__dirname, 'games');
if (!fs.existsSync(gamesDir)) {
    fs.mkdirSync(gamesDir, { recursive: true });
}

// Start WebSocket server
require('./websocket');

// API endpoint to get game executable path
app.get('/api/games/:gameId/executable', (req, res) => {
    const gameId = req.params.gameId;
    const gamePath = path.join(gamesDir, gameId, 'game.exe');

    console.log(`Request for game executable: ${gamePath}`);

    if (fs.existsSync(gamePath)) {
        console.log(`Found executable at: ${gamePath}`);
        res.json({ executablePath: gamePath });
    } else {
        console.error(`Executable not found at: ${gamePath}`);
        res.status(404).json({ error: 'Game executable not found' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Streaming server running on port ${PORT}`);
    console.log(`WebSocket server running on port 8080`);
}); 