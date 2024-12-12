import { model, Schema } from "mongoose";
import { ISubscription } from "../types/ISubscription";

const SubscriptionSchema = new Schema<ISubscription>(
  {
    school_id: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    plan: {
      type: String,
      enum: ["basic", "premium"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "inactive",
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    auto_renew: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Subscription = model("Subscription", SubscriptionSchema);
