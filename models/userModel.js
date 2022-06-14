const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const bcryptjs = require("bcryptjs");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      trim: true,
      min: 3,
      max: 30,
      required: true,
    },
    user_email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    user_password: {
      type: String,
      trim: true,
      required: true,
      max: 15,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//generate token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: User._id }, "thisismynewcourse");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//Login user
userSchema.statics.findByCredentials = async (user_email, user_password) => {
  const user = await User.findOne({ user_email });
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcryptjs.compare(user_password, user.user_password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

//hashing password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("user_password")) {
    user.user_password = await bcryptjs.hash(user.user_password, 8);
  }
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
