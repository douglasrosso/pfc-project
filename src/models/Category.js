import mongoose from 'mongoose';
const { Schema, models, model } = mongoose;

const categorySchema = new Schema({
  description: String,
  type: String
});

const Category = models.Category || model('Category', categorySchema);

export default Category;