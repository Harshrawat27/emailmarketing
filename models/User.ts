import mongoose, { Schema, Document } from 'mongoose';

// Base user interface
export interface IUser extends Document {
  name?: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  customFields?: Record<string, any>;
  // Add any other fields that might be in your collection
}

// Create a flexible schema that can accommodate your existing waitlist collection
const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    // Add any other fields that might be in your collection
    customFields: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    strict: false, // Allow fields not defined in the schema (for custom fields)
    collection: 'waitlist', // Explicitly set the collection name
  }
);

// Create or retrieve the model
export default mongoose.models.waitlist ||
  mongoose.model<IUser>('waitlist', UserSchema);
