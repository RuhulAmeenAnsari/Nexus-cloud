const fs = require('fs');
const path = require('path');

const games = {
    'gta5': {
        id: 'gta5',
        name: 'Grand Theft Auto V',
        executablePath: 'C:\\Program Files (x86)\\Grand Theft Auto V\\GTA5.exe',
        launcherPath: 'C:\\Program Files (x86)\\Grand Theft Auto V\\GTAVLauncher.exe',
        launchOptions: [
            '-windowed',          // Run in windowed mode
            '-borderless',        // Borderless window
            '-width', '1920',     // Set window width
            '-height', '1080',    // Set window height
            '-dx11',             // Use DirectX 11
            '-norestrictions'     // Disable startup flow
        ],
        streamingConfig: {
            width: 1920,
            height: 1080,
            fps: 60,
            bitrate: '6000k',
            codec: 'h264_nvenc',  // Using NVIDIA hardware encoding
            preset: 'p1',         // Low-latency preset for NVENC
            crf: 20,             // Better quality setting
            tune: 'zerolatency',  // Minimize latency
            pixelFormat: 'yuv420p' // Widely compatible pixel format
        },
        inputConfig: {
            keyboard: true,
            mouse: true,
            gamepad: true,
            mouseSensitivity: 1.0,
            mouseSmoothing: false
        },
        captureConfig: {
            method: 'desktop',    // Capture method (desktop or game)
            offsetX: 0,           // Capture region offset X
            offsetY: 0,           // Capture region offset Y
            captureArea: 'window' // Capture specific window
        }
    },
    // Add more games here
    'game1': {
        name: 'Your Game Name',
        executablePath: 'C:\\Path\\To\\Your\\Game.exe',
        launchArgs: ['-windowed', '-noborder'], // Optional launch arguments
        streamingConfig: {
            width: 1920,
            height: 1080,
            fps: 60,
            bitrate: '5000k'
        }
    }
};

function validateExecutablePath(execPath) {
    try {
        return fs.existsSync(execPath);
    } catch (error) {
        console.error(`Error validating path ${execPath}:`, error);
        return false;
    }
}

function getGameConfig(gameId) {
    const game = games[gameId];
    if (!game) {
        throw new Error(`Game configuration not found for ID: ${gameId}`);
    }

    if (!validateExecutablePath(game.executablePath)) {
        throw new Error(`Game executable not found at: ${game.executablePath}`);
    }

    return game;
}

function addGame(gameConfig) {
    if (!gameConfig.id || !gameConfig.name || !gameConfig.executablePath) {
        throw new Error('Game configuration must include id, name, and executablePath');
    }

    try {
        validateExecutablePath(gameConfig.executablePath);
        games[gameConfig.id] = gameConfig;
        return true;
    } catch (error) {
        throw new Error(`Failed to add game: ${error.message}`);
    }
}

function removeGame(gameId) {
    if (!games[gameId]) {
        throw new Error(`Game with ID ${gameId} not found`);
    }
    delete games[gameId];
    return true;
}

function listGames() {
    return Object.values(games).map(({ id, name }) => ({ id, name }));
}

module.exports = {
    getGameConfig,
    addGame,
    removeGame,
    listGames,
    validateExecutablePath
}; 