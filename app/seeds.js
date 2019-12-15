const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = require('./models/blog');
const User = require('./models/user');

const mongoURI = 'mongodb://localhost/mongoRelationships';
mongoose.connect(mongoURI, { useNewUrlParser: true }, () => {
  console.log('the connection with mongod is established')
});

// CREATE TWO USERS
let mohammed = new User({
    email: "mohammed@mohammed.mohammed",
    hashedPassword: "123456",
    name: "Mohammed mango",
    phone_no: 1234567890
});

let osama = new User({
    email: "osama@osama.osama",
    hashedPassword: "123456",
    name: "osama mango",
    phone_no: 1234567890
});

// SAVE THE TWO USERS SO 
// WE HAVE ACCESS TO THEIR _IDS
mohammed.save(function (err, savedUser) {
  if (err) {
    return console.log(err);
  } else {
    console.log('mohammed saved successfully');
  }
});

osama.save((err, savedUser) => {
  if (err) {
    console.log(err)
  } else {
    console.log('osama saved successfully');
  }
})

// CREATE A NEW Blog
const whySoSerious = new Blog({
  title: 'Why ?',
  content: "because that's why !!" 
});

// PUSH THE userS ONTO THE blog'S
// userS ARRAY
whySoSerious.users.push(mohammed);   // associated!
whySoSerious.users.push(dough);
whySoSerious.save(function (err, savedwhySoSerious) {
  if (err) {
    return console.log(err);
  } else {
    console.log('whySoSerious blog is ', savedwhySoSerious);
  }
});