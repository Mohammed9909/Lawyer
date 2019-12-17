const mongoose = require('mongoose')
const toc = require("./typeOfConsultation")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  token: String,
  toc_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "typeOfConsultation"
  }],
  Role: {
    type: String,
    default: "customer"
  },
  fullName: {
    type: String,
    default: ""
  },
  phoneNum:{
    type: Number
}
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

userSchema.virtual('examples', {
  ref: 'Example',
  localField: '_id',
  foreignField: 'owner'
});

module.exports = mongoose.model('User', userSchema)
