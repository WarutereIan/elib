import { Subscription } from "../models/Subscription";
import { ISubscription } from "../types/ISubscription";
import { addMonths } from "../utils/date.utils";

export class SubscriptionService {
  static async createOrUpdateSubscription(
    schoolId: string,
    plan: "basic" | "premium"
  ): Promise<ISubscription> {
    const startDate = new Date();
    const endDate = addMonths(startDate, 1); // 1 month subscription

    const existingSubscription = await Subscription.findOne({
      school_id: schoolId,
    });
    if (existingSubscription) {
      existingSubscription.plan = plan;
      existingSubscription.status = "active";
      existingSubscription.start_date = startDate;
      existingSubscription.end_date = endDate;
      return existingSubscription.save();
    }

    const subscription = new Subscription({
      school_id: schoolId,
      plan,
      status: "active",
      start_date: startDate,
      end_date: endDate,
    });

    return subscription.save();
  }

  static async getSubscription(
    schoolId: string
  ): Promise<ISubscription | null> {
    return Subscription.findOne({ school_id: schoolId });
  }

  static async checkAndUpdateSubscriptionStatus(
    schoolId: string
  ): Promise<void> {
    const subscription = await Subscription.findOne({ school_id: schoolId });
    if (!subscription) return;

    if (new Date() > subscription.end_date) {
      subscription.status = "expired";
      await subscription.save();
    }
  }
}
