import mongoose from 'mongoose';

const dispenseItemSchema = new mongoose.Schema({
    motor_no: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { _id: false });



const orderSchema = new mongoose.Schema({
    items: {
        type: [dispenseItemSchema],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
