import { Payment } from "../models/Payment";
import { School } from "../models/School";
import { Subscription } from "../models/Subscription";
import { IPayment } from "../types/IPayment";
import { ISubscription } from "../types/ISubscription";

export class AdminService {
  static async getAllPayments(): Promise<IPayment[]> {
    return Payment.find()
      .populate("school_id", "name email")
      .sort({ payment_date: -1 });
  }

  static async getAllSubscriptions(): Promise<ISubscription[]> {
    return Subscription.find()
      .populate("school_id", "name email")
      .sort({ end_date: -1 });
  }

  static async getPaymentAnalytics() {
    const totalPayments = await Payment.countDocuments({ status: "completed" });
    const totalRevenue = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const activeSubscriptions = await Subscription.countDocuments({
      status: "active",
      end_date: { $gt: new Date() },
    });

    return {
      totalPayments,
      totalRevenue: totalRevenue[0]?.total || 0,
      activeSubscriptions,
    };
  }

  static async updateSubscriptionStatus(
    subscriptionId: string,
    status: string
  ): Promise<ISubscription> {
    const subscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { status },
      { new: true }
    ).populate("school_id", "name email");

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    return subscription;
  }
}
