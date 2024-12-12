import { Document } from "mongoose";

export interface IPayment extends Document {
  school_id: any;
  amount: number;
  status: "pending" | "completed" | "failed";
  payment_method: string;
  transaction_id: string;
  payment_date: Date;
}
