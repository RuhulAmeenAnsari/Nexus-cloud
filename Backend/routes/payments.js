const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const jwt = require('jsonwebtoken');

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

// Create a new payment
router.post('/', verifyToken, async (req, res) => {
    try {
        const payment = new Payment({
            userId: req.user._id,
            amount: req.body.amount,
            currency: req.body.currency || 'USD',
            paymentMethod: req.body.paymentMethod,
            transactionId: req.body.transactionId,
            description: req.body.description,
            subscription: req.body.subscription
        });

        await payment.save();

        // In a real application, you would integrate with a payment gateway here
        // For now, we'll simulate a successful payment
        payment.status = 'completed';
        await payment.save();

        res.status(201).json({
            message: 'Payment processed successfully',
            payment
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user's payment history
router.get('/history', verifyToken, async (req, res) => {
    try {
        const payments = await Payment.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get payment details
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const payment = await Payment.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cancel subscription
router.post('/subscription/cancel', verifyToken, async (req, res) => {
    try {
        const activeSubscription = await Payment.findOne({
            userId: req.user._id,
            'subscription.type': { $ne: 'none' },
            status: 'completed'
        }).sort({ 'subscription.endDate': -1 });

        if (!activeSubscription) {
            return res.status(404).json({ message: 'No active subscription found' });
        }

        // In a real application, you would integrate with the payment gateway
        // to cancel the subscription
        activeSubscription.status = 'refunded';
        await activeSubscription.save();

        res.json({
            message: 'Subscription cancelled successfully',
            subscription: activeSubscription
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 