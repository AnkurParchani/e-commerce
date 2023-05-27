const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDubs: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match.",
    },
  },
  createdAt: { type: Date, default: Date.now() },
  role: { type: String, default: "user" },
});

userSchema.pre("save", function () {
  this.passwordConfirm = undefined;

  // Making user admin if credentials match
  if (
    this.password === process.env.ADMIN_PASSWORD &&
    this.email === process.env.ADMIN_EMAIL
  ) {
    this.role = "admin";
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
