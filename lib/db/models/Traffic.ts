import { Schema, model, models } from "mongoose";

export interface ITraffic {
  date: Date;
  dayOfWeek: string; // Mon, Tue, etc.
  organic: number;
  direct: number;
  referral: number;
  createdAt: Date;
  updatedAt: Date;
}

const TrafficSchema = new Schema<ITraffic>(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    dayOfWeek: {
      type: String,
      required: true,
    },
    organic: {
      type: Number,
      required: true,
      default: 0,
    },
    direct: {
      type: Number,
      required: true,
      default: 0,
    },
    referral: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
TrafficSchema.index({ date: -1 });

const Traffic = models.Traffic || model<ITraffic>("Traffic", TrafficSchema);

export default Traffic;
