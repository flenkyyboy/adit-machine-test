import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: String,
  place: String,
  phone: String,
  email: String,
  dob: String,
  gender: String,
  role: {
    type: String,
    enum: ['MANAGER', 'ADMIN', 'DEVELOPER'],
  },
  companyId: {
    type: mongoose.Types.ObjectId,
    ref: 'Company',
  },
  isActive: { type: Boolean, default: true },
});

const employee = mongoose.model('Employee', schema);

export default employee;
