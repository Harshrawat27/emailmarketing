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

// Force the collection name to be 'waitlist' instead of the default plural 'waitlists'
const Waitlist =
  models.Waitlist || model('Waitlist', WaitlistSchema, 'waitlist');

export default Waitlist;
