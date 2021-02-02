import mongoose from 'mongoose';

const PlayerScore = new mongoose.Schema(
    {
        player: {
            type: String,
            unique: true,
            required: true,
        },
        score: {
            type: Number,
            required: true,
            min: 0,
            max: 1000,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
);

export default mongoose.models.PLayerScore ||
    mongoose.model('PLayerScore', PlayerScore);
