const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { getGameConfig } = require('../config/games');

// Default streaming configuration
const defaultStreamConfig = {
    width: 1280,
    height: 720,
    fps: 60,
    bitrate: '4000k',
    codec: 'h264',
    preset: 'veryfast',
    crf: 23
};

// Store active game processes
const activeGames = new Map();

class GameExecutor {
    constructor() {
        this.streamConfig = { ...defaultStreamConfig };
    }

    async launchGame(gameId, executablePath) {
        try {
            console.log(`Attempting to launch game ${gameId} from ${executablePath}`);

            // Check if game is already running
            if (activeGames.has(gameId)) {
                console.warn(`Game ${gameId} is already running`);
                return { success: false, error: 'Game is already running' };
            }

            // Get game configuration
            const gameConfig = getGameConfig(gameId);
            if (!gameConfig) {
                console.error(`Game configuration not found for ${gameId}`);
                return { success: false, error: 'Game configuration not found' };
            }

            // Validate executable path
            if (!fs.existsSync(executablePath)) {
                console.error(`Executable not found at path: ${executablePath}`);
                return { success: false, error: 'Game executable not found' };
            }

            // Create game process
            console.log(`Spawning game process: ${executablePath}`);
            const gameProcess = spawn(executablePath, gameConfig.launchOptions || [], {
                stdio: ['pipe', 'pipe', 'pipe'],
                detached: true,
                shell: true,
                windowsHide: false
            });

            // Store process
            activeGames.set(gameId, {
                process: gameProcess,
                ws: null,
                ffmpeg: null
            });

            // Handle process events
            gameProcess.on('error', (error) => {
                console.error(`Game process error for ${gameId}:`, error);
                this.stopGame(gameId);
            });

            gameProcess.on('exit', (code) => {
                console.log(`Game process exited with code ${code} for ${gameId}`);
                this.stopGame(gameId);
            });

            console.log(`Game ${gameId} launched successfully with PID ${gameProcess.pid}`);
            return { success: true };
        } catch (error) {
            console.error('Error launching game:', error);
            return { success: false, error: error.message };
        }
    }

    async startStreaming(gameId, ws) {
        try {
            console.log(`Starting stream for game ${gameId}`);
            const gameSession = activeGames.get(gameId);
            if (!gameSession) {
                console.error(`Game ${gameId} not found in active games`);
                return { success: false, error: 'Game not running' };
            }

            // Store WebSocket connection
            gameSession.ws = ws;

            // Start FFmpeg process for streaming
            const ffmpegArgs = [
                '-f', 'gdigrab',
                '-framerate', this.streamConfig.fps.toString(),
                '-i', 'desktop',
                '-c:v', this.streamConfig.codec,
                '-preset', this.streamConfig.preset,
                '-b:v', this.streamConfig.bitrate,
                '-crf', this.streamConfig.crf.toString(),
                '-s', `${this.streamConfig.width}x${this.streamConfig.height}`,
                '-f', 'mpegts',
                '-'
            ];

            console.log('Starting FFmpeg with args:', ffmpegArgs);
            const ffmpegProcess = spawn('ffmpeg', ffmpegArgs, {
                stdio: ['pipe', 'pipe', 'pipe']
            });

            // Store FFmpeg process
            gameSession.ffmpeg = ffmpegProcess;

            // Handle FFmpeg output
            ffmpegProcess.stdout.on('data', (data) => {
                if (ws.readyState === 1) {
                    ws.send(data);
                }
            });

            ffmpegProcess.stderr.on('data', (data) => {
                console.log(`FFmpeg output: ${data}`);
            });

            ffmpegProcess.on('error', (error) => {
                console.error('FFmpeg error:', error);
                this.stopGame(gameId);
            });

            ffmpegProcess.on('exit', (code) => {
                console.log(`FFmpeg process exited with code ${code}`);
                this.stopGame(gameId);
            });

            console.log(`Stream started successfully for game ${gameId}`);
            return { success: true };
        } catch (error) {
            console.error('Error starting stream:', error);
            return { success: false, error: error.message };
        }
    }

    async handleInput(gameId, inputData) {
        try {
            console.log(`Handling input for game ${gameId}:`, inputData);
            const gameSession = activeGames.get(gameId);
            if (!gameSession) {
                console.error(`Game ${gameId} not found in active games`);
                return { success: false, error: 'Game not running' };
            }

            const { process } = gameSession;

            switch (inputData.inputType) {
                case 'keyboard':
                    if (inputData.action === 'down') {
                        process.stdin.write(`keydown ${inputData.key}\n`);
                    } else if (inputData.action === 'up') {
                        process.stdin.write(`keyup ${inputData.key}\n`);
                    }
                    break;

                case 'mouse':
                    if (inputData.action === 'move') {
                        process.stdin.write(`mousemove ${inputData.x} ${inputData.y}\n`);
                    } else if (inputData.action === 'click') {
                        process.stdin.write(`mouseclick ${inputData.button}\n`);
                    }
                    break;

                default:
                    console.warn(`Invalid input type: ${inputData.inputType}`);
                    return { success: false, error: 'Invalid input type' };
            }

            return { success: true };
        } catch (error) {
            console.error('Error handling input:', error);
            return { success: false, error: error.message };
        }
    }

    async stopGame(gameId) {
        try {
            console.log(`Stopping game ${gameId}`);
            const gameSession = activeGames.get(gameId);
            if (!gameSession) {
                console.warn(`Game ${gameId} not found when attempting to stop`);
                return { success: false, error: 'Game not running' };
            }

            const { process, ffmpeg, ws } = gameSession;

            // Stop FFmpeg process
            if (ffmpeg) {
                console.log('Stopping FFmpeg process');
                ffmpeg.kill();
            }

            // Stop game process
            if (process) {
                console.log(`Killing process with PID ${process.pid}`);
                try {
                    // For Windows, we need to use taskkill
                    const { exec } = require('child_process');
                    exec(`taskkill /F /T /PID ${process.pid}`, (error) => {
                        if (error) {
                            console.error(`Error killing process ${process.pid}:`, error);
                        }
                    });
                } catch (error) {
                    console.error(`Error killing process:`, error);
                }
            }

            // Close WebSocket connection
            if (ws && ws.readyState === 1) {
                console.log('Closing WebSocket connection');
                ws.close();
            }

            // Remove from active games
            activeGames.delete(gameId);
            console.log(`Game ${gameId} stopped successfully`);

            return { success: true };
        } catch (error) {
            console.error('Error stopping game:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = new GameExecutor(); 