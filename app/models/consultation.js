// Require necessary NPM Packages
const mongoose = require('mongoose');
const user = require("./user")

// Define consultation Schema
const consultationSchema = new mongoose.Schema({
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    state: {
        type: Boolean
    },
    created_on: {
        type: Date
    }
});


// Compile our Model based on the Schema
const consultation = mongoose.model('consultation', consultationSchema);

// Export our Model for use
module.exports = consultation;