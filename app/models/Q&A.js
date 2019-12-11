// Require necessary NPM Packages
const mongoose = require('mongoose');
const user = require("./user")

// Define Q&A Schema
const qAndASchema = new mongoose.Schema({
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    question: { type: String, default: "" }
});


// Compile our Model based on the Schema
const qAndA = mongoose.model('qAndA', qAndASchema);

// Export our Model for use
module.exports = qAndA;