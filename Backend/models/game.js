const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    screenshots: [{
        type: String
    }],
    players: {
        type: Number,
        default: 0
    },
    playTime: {
        type: Number,
        default: 0
    },
    releaseDate: {
        type: Date,
        required: true
    },
    developer: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    systemRequirements: {
        minimum: {
            cpu: String,
            gpu: String,
            ram: String,
            storage: String
        },
        recommended: {
            cpu: String,
            gpu: String,
            ram: String,
            storage: String
        }
    },
    price: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    streamUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Game', gameSchema); 