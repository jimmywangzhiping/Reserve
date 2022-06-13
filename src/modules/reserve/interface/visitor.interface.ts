import { Document } from 'mongoose';
import { VisitorRole } from '../schemas/types';
export interface Visitor extends Document {
  readonly _id: string;
  readonly userName: string;
  readonly password: string;
  readonly mobile: string;
  readonly role: VisitorRole;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface IVisitor {
  uid: string;
}
