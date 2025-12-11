import { Schema, model, models, Model, Document } from 'mongoose';

export interface ISibling {
  name: string;
  age: string;
  institution: string;
  standard: string;
}

export interface IAdmission extends Document {
  // Student Details
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  grade: string;
  board: string;
  dob: Date;
  birthRegion: string;
  birthState: string;
  nationality: string;
  aadhar: string;
  bloodGroup: string;
  identificationMarks: [string, string];
  
  // Address Details
  correspondenceAddress: string;
  area: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
  samePermanentAddress: boolean;
  permanentAddress?: string;
  permanentArea?: string;
  permanentDistrict?: string;
  permanentState?: string;
  permanentCountry?: string;
  permanentPincode?: string;
  
  // Additional Details
  motherTongue: string;
  religion: string;
  category: string;
  caste: string;
  subCaste: string;
  apaarId: string;
  familyStructure: string;
  siblings: ISibling[];
  
  // Parent Details
  fatherFullName: string;
  fatherMobileCode: string;
  fatherMobile: string;
  fatherEmail: string;
  fatherAadhar: string;
  fatherQualification: string;
  fatherProfession: string;
  motherFullName: string;
  motherMobileCode: string;
  motherMobile: string;
  motherEmail: string;
  motherAadhar: string;
  motherQualification: string;
  motherProfession: string;
  grossAnnualIncome: string;
  
  // Image URLs (stored as links)
  studentPhotoUrl?: string;
  fatherPhotoUrl?: string;
  motherPhotoUrl?: string;
  
  // Status and Metadata
  status: 'draft' | 'submitted' | 'under-review' | 'accepted' | 'rejected';
  applicationNumber?: string;
  submittedBy?: string; // User ID
  submittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SiblingSchema = new Schema<ISibling>({
  name: String,
  age: String,
  institution: String,
  standard: String,
});

const AdmissionSchema = new Schema<IAdmission>(
  {
    // Student Details
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    grade: { type: String, required: true },
    board: { type: String, required: true, enum: ['CBSE', 'IB'] },
    dob: { type: Date, required: true },
    birthRegion: { type: String, required: true },
    birthState: { type: String, required: true },
    nationality: { type: String, required: true },
    aadhar: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    identificationMarks: [String],
    
    // Address
    correspondenceAddress: { type: String, required: true },
    area: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    samePermanentAddress: { type: Boolean, default: false },
    permanentAddress: String,
    permanentArea: String,
    permanentDistrict: String,
    permanentState: String,
    permanentCountry: String,
    permanentPincode: String,
    
    // Additional
    motherTongue: { type: String, required: true },
    religion: { type: String, required: true },
    category: { type: String, required: true },
    caste: { type: String, required: true },
    subCaste: String,
    apaarId: String,
    familyStructure: { type: String, required: true },
    siblings: [SiblingSchema],
    
    // Parents
    fatherFullName: { type: String, required: true },
    fatherMobileCode: { type: String, default: '+91' },
    fatherMobile: { type: String, required: true },
    fatherEmail: { type: String, required: true, lowercase: true, trim: true },
    fatherAadhar: { type: String, required: true },
    fatherQualification: { type: String, required: true },
    fatherProfession: { type: String, required: true },
    motherFullName: { type: String, required: true },
    motherMobileCode: { type: String, default: '+91' },
    motherMobile: { type: String, required: true },
    motherEmail: { type: String, required: true, lowercase: true, trim: true },
    motherAadhar: { type: String, required: true },
    motherQualification: { type: String, required: true },
    motherProfession: { type: String, required: true },
    grossAnnualIncome: { type: String, required: true },
    
    // Files - Image URLs
    studentPhotoUrl: String,
    fatherPhotoUrl: String,
    motherPhotoUrl: String,
    
    // Status
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under-review', 'accepted', 'rejected'],
      default: 'submitted',
    },
    applicationNumber: String,
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    submittedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
AdmissionSchema.index({ applicationNumber: 1 }, { unique: true, sparse: true });
AdmissionSchema.index({ 'fatherEmail': 1 });
AdmissionSchema.index({ 'motherEmail': 1 });
AdmissionSchema.index({ status: 1, submittedAt: -1 });
AdmissionSchema.index({ board: 1, grade: 1 });
AdmissionSchema.index({ submittedBy: 1 });

// Auto-generate application number
AdmissionSchema.pre('save', async function () {
  if (this.isNew && this.status === 'submitted' && !this.applicationNumber) {
    try {
      const year = new Date().getFullYear();
      const AdmissionModel = this.constructor as Model<IAdmission>;
      const count = await AdmissionModel.countDocuments({
        board: this.board,
        submittedAt: { $gte: new Date(year, 0, 1) }
      });
      this.applicationNumber = `DIS-${year}-${String(count + 1).padStart(6, '0')}`;
    } catch (error) {
      console.error('Error generating application number:', error);
    }
  }
});

const Admission: Model<IAdmission> = models.Admission || model<IAdmission>('Admission', AdmissionSchema);

export default Admission;

