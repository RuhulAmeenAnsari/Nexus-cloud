const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const UserSession = require('../models/userSession');
const jwt = require('jsonwebtoken');
const { games, getGameConfig } = require('../config/games');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try {
        const decoded = jwt.verify(token, "Super Secret Key");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Get all games
router.get('/', async (req, res) => {
    try {
        // Get games from both the database and config
        const dbGames = await Game.find();
        const configGames = Object.entries(games).map(([id, game]) => ({
            id,
            name: game.name,
            description: game.description,
            genre: game.genre,
            streamingConfig: game.streamingConfig,
            thumbnailUrl: game.thumbnailUrl,
            mainScreenUrl: game.mainScreenUrl,
            screenshots: game.screenshots
        }));

        // Combine and deduplicate games
        const allGames = [...dbGames, ...configGames];
        const uniqueGames = Array.from(new Map(allGames.map(game => [game.id, game])).values());

        res.json(uniqueGames);
    } catch (error) {
        console.error('Error getting games list:', error);
        res.status(500).json({ message: 'Failed to get games list' });
    }
});

// Get game by ID
router.get('/:id', async (req, res) => {
    try {
        const gameId = req.params.id;

        // Try to get game from database first
        let game = await Game.findById(gameId);

        // If not in database, try to get from config
        if (!game) {
            const gameConfig = getGameConfig(gameId);
            if (!gameConfig) {
                return res.status(404).json({ message: 'Game not found' });
            }

            // Remove sensitive information
            const { executablePath, launcherPath, ...safeGameConfig } = gameConfig;
            game = {
                id: gameId,
                ...safeGameConfig
            };
        }

        res.json(game);
    } catch (error) {
        console.error('Error fetching game:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get all available games
router.get('/', (req, res) => {
    try {
        const gamesList = Object.entries(games).map(([id, game]) => ({
            id,
            name: game.name,
            streamingConfig: game.streamingConfig
        }));
        res.json(gamesList);
    } catch (error) {
        console.error('Error getting games list:', error);
        res.status(500).json({ message: 'Failed to get games list' });
    }
});

// Get specific game configuration
router.get('/:gameId', (req, res) => {
    try {
        const { gameId } = req.params;
        console.log(`Fetching configuration for game: ${gameId}`);

        const gameConfig = getGameConfig(gameId);
        if (!gameConfig) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.json({
            id: gameId,
            ...gameConfig
        });
    } catch (error) {
        console.error('Error getting game configuration:', error);
        res.status(500).json({ message: 'Failed to get game configuration' });
    }
});

// Start game session
router.post('/:id/start', verifyToken, async (req, res) => {
    try {
        const gameId = req.params.id;
        const gameConfig = getGameConfig(gameId);

        if (!gameConfig) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Create a new session
        const session = new UserSession({
            userId: req.user._id,
            gameId: gameId,
            startTime: new Date(),
            streamQuality: req.body.streamQuality || 'high',
            inputDevice: req.body.inputDevice || 'keyboard',
            latencyMode: req.body.latencyMode || 'normal'
        });

        await session.save();

        res.json({
            message: 'Game session started',
            sessionId: session._id,
            game: {
                id: gameId,
                name: gameConfig.name,
                streamingConfig: gameConfig.streamingConfig
            }
        });
    } catch (error) {
        console.error('Error starting game session:', error);
        res.status(500).json({ message: 'Failed to start game session' });
    }
});

// End game session
router.post('/:id/stop', verifyToken, async (req, res) => {
    try {
        const gameId = req.params.id;
        const session = await UserSession.findOneAndUpdate(
            {
                userId: req.user._id,
                gameId: gameId,
                endTime: null
            },
            {
                endTime: new Date()
            },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({ message: 'Active session not found' });
        }

        res.json({
            message: 'Game session stopped',
            sessionId: session._id,
            duration: session.endTime - session.startTime
        });
    } catch (error) {
        console.error('Error stopping game session:', error);
        res.status(500).json({ message: 'Failed to stop game session' });
    }
});

// Update session settings
router.put('/sessions/:sessionId/settings', verifyToken, async (req, res) => {
    try {
        const session = await UserSession.findOneAndUpdate(
            {
                _id: req.params.sessionId,
                userId: req.user._id,
                endTime: null
            },
            {
                $set: {
                    ...(req.body.streamQuality && { streamQuality: req.body.streamQuality }),
                    ...(req.body.inputDevice && { inputDevice: req.body.inputDevice }),
                    ...(req.body.latencyMode && { latencyMode: req.body.latencyMode })
                }
            },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({ message: 'Active session not found' });
        }

        res.json({
            message: 'Session settings updated',
            session: {
                id: session._id,
                streamQuality: session.streamQuality,
                inputDevice: session.inputDevice,
                latencyMode: session.latencyMode
            }
        });
    } catch (error) {
        console.error('Error updating session settings:', error);
        res.status(500).json({ message: error.message });
    }
});

// List all games
router.get('/', async (req, res) => {
    try {
        const games = require('../config/games').listGames();
        res.json(games);
    } catch (error) {
        console.error('Error listing games:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 