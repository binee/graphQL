import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      require: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Enter a password"],
      minlength: [6, "Password should be atleast 6 characters"],
    },
    email: {
      type: String,
      trim: true,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

 const User = mongoose.model("user", userSchema);
 export default User;