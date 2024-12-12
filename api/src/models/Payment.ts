import { Model, model, Schema } from "mongoose";
import { IPayment } from "../types/IPayment";


const PaymentSchema = new Schema<IPayment>(
  {
    school_id: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    payment_method: {
      type: String,
      required: true,
    },
    transaction_id: {
      type: String,
      required: true,
      unique: true,
    },
    payment_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = model("Payment", PaymentSchema)