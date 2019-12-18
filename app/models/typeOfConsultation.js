// Require necessary NPM Packages
const mongoose = require('mongoose');
const user = require("./user")

// Define type Of Type Of Consultatio Schema
const typeOfConsultationSchema = new mongoose.Schema({
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "",
        require: true
    },
    image: {
        type: String,
        default: "",
    },
});


// Compile our Model based on the Schema
const typeOfConsultation = mongoose.model('typeOfConsultation', typeOfConsultationSchema);

// Export our Model for use
module.exports = typeOfConsultation;