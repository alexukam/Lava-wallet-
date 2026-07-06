import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  sender: 'user' | 'admin';
  senderId: string;
  message: string;
  timestamp: Date;
}

export interface ISupportTicket extends Document {
  userId: string;
  adminId?: string;
  subject: string;
  messages: IMessage[];
  status: 'open' | 'closed' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: String, enum: ['user', 'admin'], required: true },
  senderId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const supportTicketSchema = new Schema<ISupportTicket>(
  {
    userId: {
      type: String,
      required: true,
    },
    adminId: String,
    subject: {
      type: String,
      required: true,
    },
    messages: [messageSchema],
    status: {
      type: String,
      enum: ['open', 'closed', 'pending'],
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SupportTicket ||
  mongoose.model<ISupportTicket>('SupportTicket', supportTicketSchema);
