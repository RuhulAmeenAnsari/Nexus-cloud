const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    duration: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    streamQuality: {
        type: String,
        enum: ['Auto', '1080p', '720p', '480p'],
        default: 'Auto'
    },
    inputDevice: {
        type: String,
        enum: ['keyboard', 'controller'],
        default: 'keyboard'
    },
    latencyMode: {
        type: String,
        enum: ['Low', 'Balanced', 'High'],
        default: 'Balanced'
    },
    performanceMetrics: {
        fps: Number,
        latency: Number,
        bandwidth: Number
    }
});

module.exports = mongoose.model('UserSession', userSessionSchema); 