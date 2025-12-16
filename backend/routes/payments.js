const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
let razorpay;
try {
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        console.log("Razorpay Initialized with Key ID:", process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.substring(0, 8) + "..." : "Missing");
    } else {
        console.warn("Razorpay Keys Missing - functionality will be limited");
    }
} catch (err) {
    console.error("Razorpay Init Error:", err);
}

// Create Order (Subscription)
router.post('/create-order', authorization, async (req, res) => {
    try {
        const amount = 999 * 100; // 999 INR in paisa (Razorpay takes smallest currency unit)
        // OR if you want to use Subscription model specifically, you need to create Plan first.
        // For simplicity, we are doing a "One Time" or "Recurring via recurring flag manually" payment order here.
        // Usually for subscriptions you create a plan on dashboard and subscribe user to it. 
        // We will stick to simple Order creation for "Upgrade" to demonstrate payment flow.

        const options = {
            amount: amount,
            currency: "INR",
            receipt: `receipt_${req.user.substring(0, 30)}`, // Max 40 chars allowed
            payment_capture: 1 // Auto capture
        };

        if (razorpay) {
            const order = await razorpay.orders.create(options);
            res.json({
                order_id: order.id,
                currency: order.currency,
                amount: order.amount,
                key_id: process.env.RAZORPAY_KEY_ID
            });
        } else {
            // Mock Order
            res.json({
                order_id: "order_mock_123456",
                currency: "INR",
                amount: amount,
                key_id: "mock_key_id",
                mock: true
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

// Verify Payment
router.post('/verify-payment', authorization, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.user;

        if (!process.env.RAZORPAY_KEY_SECRET) {
            // Mock verification
            await updateUserSubscription(userId, razorpay_payment_id || 'mock_pay_id');
            return res.json({ success: true, message: "Payment Verified (Mock)" });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            await updateUserSubscription(userId, razorpay_payment_id);
            res.json({ success: true, message: "Payment Verified" });
        } else {
            res.status(400).json({ success: false, message: "Invalid Signature" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Helper to update DB
const updateUserSubscription = async (userId, paymentId) => {
    try {
        const checkSub = await pool.query("SELECT * FROM subscriptions WHERE user_id = $1", [userId]);

        if (checkSub.rows.length === 0) {
            await pool.query(
                "INSERT INTO subscriptions (user_id, stripe_sub_id, status) VALUES ($1, $2, $3)",
                [userId, paymentId, 'active']
            );
        } else {
            await pool.query(
                "UPDATE subscriptions SET status = 'active', stripe_sub_id = $2 WHERE user_id = $1",
                [userId, paymentId]
            );
        }
    } catch (e) {
        console.error("DB Update Error", e);
    }
};

module.exports = router;
