import { Schema, model, models } from "mongoose";

export interface IUserGrowth {
  month: string; // Format: YYYY-MM
  year: number;
  monthName: string; // Jan, Feb, etc.
  newUsers: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserGrowthSchema = new Schema<IUserGrowth>(
  {
    month: {
      type: String,
      required: true,
      unique: true,
    },
    year: {
      type: Number,
      required: true,
    },
    monthName: {
      type: String,
      required: true,
    },
    newUsers: {
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
UserGrowthSchema.index({ month: -1 });
UserGrowthSchema.index({ year: -1 });

const UserGrowth = models.UserGrowth || model<IUserGrowth>("UserGrowth", UserGrowthSchema);

export default UserGrowth;
