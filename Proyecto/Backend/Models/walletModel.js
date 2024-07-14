import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    ingresos: [{
        type: Number,
        default: 0
    }],
    gastos: [{
        type: Number,
        default: 0
    }],
    saldo: {
        type: Number,
        default: 0
    }
});

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
