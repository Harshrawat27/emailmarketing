import mongoose, { Schema, Document } from 'mongoose';

// Field types we'll support
export type FieldType = 'string' | 'number' | 'boolean' | 'date';

// Custom field interface
export interface ICustomField extends Document {
  name: string;
  type: FieldType;
  defaultValue?: any;
  required: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for custom fields
const CustomFieldSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    type: {
      type: String,
      required: true,
      enum: ['string', 'number', 'boolean', 'date'],
    },
    defaultValue: { type: Schema.Types.Mixed },
    required: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Create or retrieve the model
export default mongoose.models.CustomField ||
  mongoose.model<ICustomField>('CustomField', CustomFieldSchema);
