const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://itspranjal00:root@cluster0.hlrqphy.mongodb.net/paytm")
  .then((res) => {
    console.log("Connected to the database server");
  })
  .catch((err) => {
    console.log("Error connecting to the database server:", err);
  });

//User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

//Account Schema
const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = { User, Account };
