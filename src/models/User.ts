import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  phone: string;
  name: string;
  country: string;
  balances: {
    ethereum: number;
    bitcoin: number;
    solana: number;
    usdt_erc20: number;
    usdt_trc20: number;
  };
  walletAddresses: {
    ethereum: string;
    bitcoin: string;
    solana: string;
  };
  deposits: Array<{
    amount: number;
    currency: string;
    date: Date;
    status: 'pending' | 'completed' | 'failed';
  }>;
  kycVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    balances: {
      ethereum: { type: Number, default: 0 },
      bitcoin: { type: Number, default: 0 },
      solana: { type: Number, default: 0 },
      usdt_erc20: { type: Number, default: 0 },
      usdt_trc20: { type: Number, default: 0 },
    },
    walletAddresses: {
      ethereum: { type: String, default: '' },
      bitcoin: { type: String, default: '' },
      solana: { type: String, default: '' },
    },
    deposits: [
      {
        amount: Number,
        currency: String,
        date: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ['pending', 'completed', 'failed'],
          default: 'pending',
        },
      },
    ],
    kycVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
