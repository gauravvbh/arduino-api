import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './db.js';
import Order from './orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

await connectToDB();

app.get('/get-latest-order', async (req, res) => {
    try {
        // Get the earliest order (based on created_at)
        const order = await Order.findOne().sort({ created_at: 1 });

        if (!order) {
            return res.status(200).json({ message: 'No pending orders' });
        }

        // Store data to return before deletion
        const orderData = order.items;

        // Delete the order after fetching
        await Order.deleteOne({ _id: order._id });

        return res.status(200).json(orderData);

    } catch (error) {
        console.error("Error fetching order:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Arduino API running on port ${PORT}`);
});
