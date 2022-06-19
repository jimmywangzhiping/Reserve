'use strict';
import { Schema } from 'mongoose';
import { ReservationStatus } from './types';

export const recordSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Visitor' },
    status: {
      type: String,
      required: true,
      enum: Object.values(ReservationStatus),
      default: ReservationStatus.ACTIVE,
    },
    tableSize: {
      type: Number,
      required: true,
      default: 1,
    },
    utmSource: { type: String },
    mobile: { type: String },
    reserveAt: { type: Date, required: true, default: new Date() },
    createdAt: { type: Date, required: true, default: new Date() },
    updatedAt: { type: Date, required: true, default: new Date() },
    isDel: { type: Number, default: 0 },
  },
  { versionKey: false },
);
