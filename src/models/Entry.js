import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const entrySchema = new Schema({
  id: String,
  type: String,
  categories: String,
  description: String,
  value: String,
  due_date: String,
  payment_date: String,
  account: String,
  status: String,
  comments: String,
});

const Entry = models.Entry || model("Entry", entrySchema);

export default Entry;
