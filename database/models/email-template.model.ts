import { Schema, model, models, Document } from 'mongoose';

export interface IEmailTemplate extends Document {
  name: string;
  subject: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const EmailTemplateSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// If the EmailTemplate model doesn't exist yet, create it
const EmailTemplate =
  models.EmailTemplate || model('EmailTemplate', EmailTemplateSchema);

export default EmailTemplate;
