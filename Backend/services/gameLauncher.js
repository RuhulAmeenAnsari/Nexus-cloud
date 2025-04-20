const { spawn } = require('child_process');
const WebSocket = require('ws');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

// Store active game processes
const activeGames = new Map();

class GameLauncher {
    constructor() {
        this.streamConfig = {
            width: 1920,
            height: 1080,
            fps: 60,
            bitrate: '5000k',
            codec: 'libx264',
            preset: 'ultrafast',
        };
    }

    static async launchGame(gameId, executablePath) {
        try {
            // Check if game is already running
            if (activeGames.has(gameId)) {
                return { success: false, error: 'Game is already running' };
            }

            // Validate executable path
            if (!fs.existsSync(executablePath)) {
                return { success: false, error: 'Executable path does not exist' };
            }

            // Launch the game process
            const gameProcess = spawn(executablePath, [], {
                stdio: ['ignore', 'pipe', 'pipe'],
                detached: true
            });

            // Store the process
            activeGames.set(gameId, gameProcess);

            // Handle process events
            gameProcess.on('error', (error) => {
                console.error(`Game process error for ${gameId}:`, error);
                activeGames.delete(gameId);
            });

            gameProcess.on('exit', (code, signal) => {
                console.log(`Game process exited for ${gameId} with code ${code} and signal ${signal}`);
                activeGames.delete(gameId);
            });

            return { success: true };
        } catch (error) {
            console.error('Error launching game:', error);
            return { success: false, error: error.message };
        }
    }

    async startStreaming(gameId, ws) {
        try {
            console.log(`Starting stream for game ${gameId}`);

            const gameProcess = activeGames.get(gameId);
            if (!gameProcess) {
                console.error(`Game ${gameId} not found in active games`);
                throw new Error('Game not found or not running');
            }

            // Create FFmpeg command for screen capture
            console.log('Setting up FFmpeg stream');
            const command = ffmpeg()
                .input('desktop')
                .inputFormat('gdigrab')
                .inputOptions([
                    '-framerate', this.streamConfig.fps.toString(),
                    '-offset_x', '0',
                    '-offset_y', '0',
                    '-video_size', `${this.streamConfig.width}x${this.streamConfig.height}`
                ])
                .outputOptions([
                    '-c:v', this.streamConfig.codec,
                    '-preset', this.streamConfig.preset,
                    '-b:v', this.streamConfig.bitrate,
                    '-f', 'webm',
                    '-g', '30',
                    '-keyint_min', '30',
                    '-sc_threshold', '0'
                ])
                .on('error', (err) => {
                    console.error('FFmpeg error:', err.message);
                    ws.send(JSON.stringify({ type: 'error', message: err.message }));
                });

            // Pipe FFmpeg output to WebSocket
            const stream = command.pipe();
            stream.on('data', (chunk) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({
                        type: 'video',
                        chunk: Array.from(chunk)
                    }));
                }
            });

            // Store stream in active games
            this.activeGames.get(gameId).stream = command;
            console.log(`Stream started successfully for game ${gameId}`);

            return {
                success: true,
                message: 'Streaming started successfully'
            };
        } catch (error) {
            console.error('Error starting stream:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async handleInput(gameId, inputData) {
        try {
            const gameProcess = activeGames.get(gameId);
            if (!gameProcess) {
                return { success: false, error: 'Game process not found' };
            }

            // Send input to the game process
            gameProcess.stdin.write(JSON.stringify(inputData) + '\n');
            return { success: true };
        } catch (error) {
            console.error('Error handling input:', error);
            return { success: false, error: error.message };
        }
    }

    static async stopGame(gameId) {
        try {
            const gameProcess = activeGames.get(gameId);
            if (!gameProcess) {
                return { success: false, error: 'Game process not found' };
            }

            // Kill the process and its children
            process.kill(-gameProcess.pid);
            activeGames.delete(gameId);

            return { success: true };
        } catch (error) {
            console.error('Error stopping game:', error);
            return { success: false, error: error.message };
        }
    }

    getGameStatus(gameId) {
        const game = this.activeGames.get(gameId);
        if (!game) {
            return {
                running: false,
                status: 'not_found'
            };
        }

        return {
            running: true,
            status: 'running',
            uptime: Date.now() - game.startTime
        };
    }
}

module.exports = new GameLauncher(); 