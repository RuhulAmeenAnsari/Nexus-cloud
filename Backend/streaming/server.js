const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store active game sessions
const gameSessions = new Map();

class GameSession {
    constructor(gameId, userId) {
        this.gameId = gameId;
        this.userId = userId;
        this.ffmpeg = null;
        this.websocket = null;
    }

    async startStream(executablePath) {
        // Start the game process
        const game = spawn(executablePath);

        // Start FFmpeg for screen capture and encoding
        this.ffmpeg = spawn('ffmpeg', [
            '-f', 'gdigrab',  // Windows screen capture
            '-framerate', '60',
            '-i', 'desktop',
            '-c:v', 'libx264',
            '-preset', 'ultrafast',
            '-tune', 'zerolatency',
            '-f', 'rawvideo',
            '-'
        ]);

        // Pipe FFmpeg output to WebSocket
        this.ffmpeg.stdout.on('data', (data) => {
            if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
                this.websocket.send(data);
            }
        });

        // Handle errors
        this.ffmpeg.stderr.on('data', (data) => {
            console.error(`FFmpeg Error: ${data}`);
        });

        game.on('close', (code) => {
            console.log(`Game process exited with code ${code}`);
            this.stopStream();
        });
    }

    stopStream() {
        if (this.ffmpeg) {
            this.ffmpeg.kill();
            this.ffmpeg = null;
        }
        if (this.websocket) {
            this.websocket.close();
            this.websocket = null;
        }
        gameSessions.delete(this.gameId);
    }
}

// WebSocket connection handler
wss.on('connection', (ws, req) => {
    console.log('New client connected');

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);

            switch (data.type) {
                case 'start-stream':
                    const { gameId, userId, executablePath } = data;
                    let session = gameSessions.get(gameId);

                    if (!session) {
                        session = new GameSession(gameId, userId);
                        gameSessions.set(gameId, session);
                    }

                    session.websocket = ws;
                    await session.startStream(executablePath);
                    break;

                case 'input':
                    // Handle keyboard/mouse input
                    const { key, mouseX, mouseY, mouseButton } = data;
                    // TODO: Implement input handling using node-robotjs
                    break;

                case 'stop-stream':
                    const session = gameSessions.get(data.gameId);
                    if (session) {
                        session.stopStream();
                    }
                    break;
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        // Clean up any active sessions for this client
        for (const [gameId, session] of gameSessions.entries()) {
            if (session.websocket === ws) {
                session.stopStream();
            }
        }
    });
});

// API endpoints
app.post('/api/stream/start', async (req, res) => {
    try {
        const { gameId, userId, executablePath } = req.body;
        const session = new GameSession(gameId, userId);
        await session.startStream(executablePath);
        gameSessions.set(gameId, session);
        res.json({ success: true, message: 'Stream started successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/stream/stop', (req, res) => {
    const { gameId } = req.body;
    const session = gameSessions.get(gameId);
    if (session) {
        session.stopStream();
        res.json({ success: true, message: 'Stream stopped successfully' });
    } else {
        res.status(404).json({ success: false, error: 'Session not found' });
    }
});

const PORT = process.env.STREAMING_PORT || 8080;
server.listen(PORT, () => {
    console.log(`Streaming server running on port ${PORT}`);
}); 