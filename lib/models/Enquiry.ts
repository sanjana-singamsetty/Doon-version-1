import { Schema, model, models, Model } from 'mongoose';

export interface IEnquiry {
  _id?: string;
  childName: string;
  grade: string;
  boardingType: string;
  email: string;
  mobile: string;
  message?: string;
  submittedBy?: string; // User ID
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    childName: { type: String, required: true },
    grade: { type: String, required: true },
    boardingType: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    mobile: { type: String, required: true },
    message: { type: String, default: '' },
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

EnquirySchema.index({ email: 1 });
EnquirySchema.index({ submittedAt: -1 });
EnquirySchema.index({ submittedBy: 1 });

const Enquiry: Model<IEnquiry> = models.Enquiry || model<IEnquiry>('Enquiry', EnquirySchema);

export default Enquiry;

