import { Document } from 'mongoose';
import { ReservationStatus } from '../schemas/types';

export interface Record extends Document {
  readonly _id: string;
  readonly userId: string;
  status: ReservationStatus;
  tableSize: number;
  readonly createdAt: Date;
  reserveAt: Date;
  updatedAt: Date;
  isDel: number;
}
