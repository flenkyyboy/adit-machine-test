import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: String,
  place: String,
  phone: String,
  email: String,
  isActive: { type: Boolean, default: true },
});

const company = mongoose.model('Company', schema);

export default company;
