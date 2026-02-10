import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  projectDetails: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'closed'],
    default: 'new',
  }
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
