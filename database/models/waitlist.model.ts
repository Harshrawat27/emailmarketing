import { Schema, model, models, Document } from 'mongoose';

export interface IWaitlist extends Document {
  email: string;
  signupDate: Date;
  source: string;
  referralCount: number;
  username: string;
  firstName?: string; // Added firstName field
}

const WaitlistSchema = new Schema({
  email: { type: String, required: true, unique: true },
  signupDate: { type: Date, default: Date.now },
  source: { type: String },
  referralCount: { type: Number, default: 0 },
  username: { type: String },
  firstName: { type: String }, // Optional field
});

// If the Waitlist model doesn't exist yet, create it
const Waitlist = models.Waitlist || model('Waitlist', WaitlistSchema);

export default Waitlist;
