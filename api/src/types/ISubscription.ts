import { Document } from "mongoose";

export interface ISubscription extends Document {
  school_id: any;
  plan: "basic" | "premium";
  status: "active" | "inactive" | "expired";
  start_date: Date;
  end_date: Date;
  auto_renew: boolean;
}
