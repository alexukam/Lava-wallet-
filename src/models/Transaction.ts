import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  userId: string;
  type: 'deposit' | 'withdrawal' | 'admin_credit';
  currency: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  transactionHash?: string;
  adminApproved?: boolean;
  adminNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['deposit', 'withdrawal', 'admin_credit'],
      required: true,
    },
    currency: {
      type: String,
      enum: ['ethereum', 'bitcoin', 'solana', 'usdt_erc20', 'usdt_trc20'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    transactionHash: String,
    adminApproved: Boolean,
    adminNote: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Transaction ||
  mongoose.model<ITransaction>('Transaction', transactionSchema);
