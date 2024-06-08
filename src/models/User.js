import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const userSchema = new Schema({
  id: String,
  name: String,
  email: String,
  user: String,
  pwd: String,
  level: String,
  status: String,
});

const User = models.User || model("User", userSchema);

export default User;
