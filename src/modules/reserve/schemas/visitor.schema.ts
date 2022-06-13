'use strict';
import { Schema } from 'mongoose';
import { VisitorRole } from './types';
export const visitorSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String },
    utmSource: { type: String },
    role: {
      type: String,
      required: true,
      enum: Object.values(VisitorRole),
    },
    createdAt: { type: Date, required: true, default: new Date() },
    updatedAt: { type: Date, required: true, default: new Date() },
    isDel: { type: Number },
  },
  { versionKey: false },
);
