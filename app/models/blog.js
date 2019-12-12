// Require necessary NPM Packages
const mongoose = require('mongoose');
const user = require("./user")

// Define blog Schema
const blogSchema = new mongoose.Schema({
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    title: { type: String, default: "",
            required: true },
    content: { type: String, default: "",
            required: true },
},{
  timestamps: true});

// Compile our Model based on the Schema
const blog = mongoose.model('blog', blogSchema);

// Export our Model for use
module.exports = blog;