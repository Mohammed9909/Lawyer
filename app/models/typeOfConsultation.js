// Require necessary NPM Packages
const mongoose = require('mongoose');
const user = require("./user")

// Define type Of Consultation Schema
const tocSchema = new mongoose.Schema({
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    name: { type: String, required: true },
    description: { type: String, default: "" },
});


// Compile our Model based on the Schema
const toc = mongoose.model('Toc', tocSchema);

// Export our Model for use
module.exports = toc;