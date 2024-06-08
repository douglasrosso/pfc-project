import mongoose from 'mongoose';
const { Schema, models, model } = mongoose;

const AccountSchema = new Schema({
  description: String,
  comments: String
});

const Account = models.Account || model('Account', AccountSchema);

export default Account;