const WebSocket = require('ws');
const { spawn } = require('child_process');
const path = require('path');
const { getGameConfig } = require('./config/games');

class GameStreamingServer {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.activeSessions = new Map();
        this.setupWebSocketServer();
        console.log('WebSocket Game Streaming Server initialized');
    }

    setupWebSocketServer() {
        this.wss.on('connection', (ws, req) => {
            console.log('New streaming connection received');

            // Extract gameId from URL: /stream/gameId
            const gameId = req.url.split('/').pop();
            console.log(`Stream request for game: ${gameId}`);

            if (!gameId) {
                console.error('No game ID provided');
                ws.close(4000, 'Game ID is required');
                return;
            }

            // Get game configuration
            const gameConfig = getGameConfig(gameId);
            if (!gameConfig) {
                console.error(`Game configuration not found for ID: ${gameId}`);
                ws.close(4001, 'Game configuration not found');
                return;
            }

            // Store session information
            const sessionId = Date.now().toString();
            const session = {
                ws,
                gameId,
                gameConfig,
                gameProcess: null,
                ffmpegProcess: null,
                startTime: Date.now()
            };
            this.activeSessions.set(sessionId, session);

            ws.on('message', async (message) => {
                try {
                    const data = JSON.parse(message);
                    console.log(`Received message type: ${data.type} for game: ${gameId}`);

                    switch (data.type) {
                        case 'init':
                            await this.initializeGame(sessionId);
                            break;
                        case 'input':
                            this.handleGameInput(sessionId, data.input);
                            break;
                        case 'quality':
                            this.updateStreamQuality(sessionId, data.quality);
                            break;
                        case 'stop':
                            this.stopGame(sessionId);
                            break;
                    }
                } catch (error) {
                    console.error('Error processing message:', error);
                    ws.send(JSON.stringify({ type: 'error', message: error.message }));
                }
            });

            ws.on('close', () => {
                console.log(`Connection closed for session: ${sessionId}`);
                this.stopGame(sessionId);
            });

            ws.on('error', (error) => {
                console.error(`WebSocket error for session ${sessionId}:`, error);
                this.stopGame(sessionId);
            });
        });
    }

    async initializeGame(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session) return;

        try {
            console.log(`Initializing game: ${session.gameId}`);

            // Launch game process
            const gameProcess = spawn(session.gameConfig.executablePath, session.gameConfig.launchOptions || [], {
                stdio: ['pipe', 'pipe', 'pipe'],
                detached: true,
                shell: true,
                windowsHide: false
            });

            session.gameProcess = gameProcess;

            // Setup FFmpeg streaming
            const { width, height, fps, bitrate, codec, preset, crf, tune } = session.gameConfig.streamingConfig;

            const ffmpegArgs = [
                '-f', 'gdigrab',
                '-framerate', fps.toString(),
                '-i', 'desktop',
                '-vf', `scale=${width}:${height}`,
                '-c:v', codec,
                '-preset', preset,
                '-crf', crf.toString(),
                '-tune', tune,
                '-b:v', bitrate,
                '-f', 'mpegts',
                '-'
            ];

            console.log('Starting FFmpeg with args:', ffmpegArgs.join(' '));
            const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);

            session.ffmpegProcess = ffmpegProcess;

            ffmpegProcess.stdout.on('data', (data) => {
                if (session.ws.readyState === WebSocket.OPEN) {
                    session.ws.send(data);
                }
            });

            ffmpegProcess.stderr.on('data', (data) => {
                console.log(`FFmpeg output: ${data}`);
            });

            // Handle process errors
            gameProcess.on('error', (error) => {
                console.error(`Game process error: ${error.message}`);
                session.ws.send(JSON.stringify({ type: 'error', message: 'Game process error' }));
                this.stopGame(sessionId);
            });

            ffmpegProcess.on('error', (error) => {
                console.error(`FFmpeg process error: ${error.message}`);
                session.ws.send(JSON.stringify({ type: 'error', message: 'Streaming process error' }));
                this.stopGame(sessionId);
            });

            console.log(`Game ${session.gameId} initialized successfully`);
            session.ws.send(JSON.stringify({ type: 'init', status: 'success' }));

        } catch (error) {
            console.error('Error initializing game:', error);
            session.ws.send(JSON.stringify({ type: 'error', message: error.message }));
            this.stopGame(sessionId);
        }
    }

    handleGameInput(sessionId, input) {
        const session = this.activeSessions.get(sessionId);
        if (!session || !session.gameProcess) return;

        try {
            // Process input based on type
            switch (input.type) {
                case 'keydown':
                case 'keyup':
                    // Handle keyboard input
                    break;
                case 'mousemove':
                    // Handle mouse movement
                    break;
                case 'mousedown':
                case 'mouseup':
                    // Handle mouse clicks
                    break;
            }
        } catch (error) {
            console.error(`Error handling input for session ${sessionId}:`, error);
        }
    }

    updateStreamQuality(sessionId, quality) {
        const session = this.activeSessions.get(sessionId);
        if (!session || !session.ffmpegProcess) return;

        // Implementation for quality updates
        console.log(`Updating stream quality for session ${sessionId} to ${quality}`);
    }

    stopGame(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (!session) return;

        console.log(`Stopping game session ${sessionId}`);

        if (session.gameProcess) {
            try {
                session.gameProcess.kill();
            } catch (error) {
                console.error(`Error killing game process: ${error.message}`);
            }
        }

        if (session.ffmpegProcess) {
            try {
                session.ffmpegProcess.kill();
            } catch (error) {
                console.error(`Error killing FFmpeg process: ${error.message}`);
            }
        }

        session.ws.close();
        this.activeSessions.delete(sessionId);
    }

    shutdown() {
        console.log('Shutting down streaming server...');
        for (const sessionId of this.activeSessions.keys()) {
            this.stopGame(sessionId);
        }
        this.wss.close();
    }
}

module.exports = GameStreamingServer; 