// models/RevokedToken.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revokedTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    revokedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { timestamps: true });

// Add TTL index to automatically remove tokens after 24 hours
revokedTokenSchema.index({ revokedAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model('RevokedToken', revokedTokenSchema);
