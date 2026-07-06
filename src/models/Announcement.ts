import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  adminId: string;
  createdAt: Date;
  expiresAt?: Date;
}

const announcementSchema = new Schema<IAnnouncement>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['info', 'warning', 'error', 'success'],
      default: 'info',
    },
    adminId: {
      type: String,
      required: true,
    },
    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Announcement ||
  mongoose.model<IAnnouncement>('Announcement', announcementSchema);
