const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "This email has already been used by someone else"],
    dropDubs: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
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

// Pre-save middleware
userSchema.pre("save", async function () {
  // Making user admin if credentials match
  if (
    this.email === process.env.ADMIN_EMAIL &&
    (await bcrypt.compare(this.password, process.env.ADMIN_PASSWORD))
  ) {
    this.role = "admin";
  }

  // Encrypting password
  this.password = await bcrypt.hash(this.password, 12);

  // Removing passwordConfirm
  this.passwordConfirm = undefined;
});

// Instance method
userSchema.methods.checkCredentials = async (userPassword, dbPassword) => {
  return await bcrypt.compare(userPassword, dbPassword);
};

// Creating Index for emails
userSchema.index({ email: 1 }, { unique: true });

// Creating Model
const User = mongoose.model("User", userSchema);

module.exports = User;
