const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Enter a Valid Email Address",
      ],
      unique: [true, "Email already Exist"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, iat: Date.now() + 1000 },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "2h" }
  );
};

/**
 *
 * @param {String} pass -User Password
 * @returns {Boolean}
 */
userSchema.methods.comparePassword = async function (pass) {
  return bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("User", userSchema);
