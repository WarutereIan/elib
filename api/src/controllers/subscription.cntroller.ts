import { Request, Response } from "express";
import { SubscriptionService } from "../services/subscription.service";

export class SubscriptionController {
  static async getSubscriptionStatus(req: Request, res: Response) {
    try {
      const schoolId = req.user.id;

      // Check and update subscription status
      await SubscriptionService.checkAndUpdateSubscriptionStatus(schoolId);

      const subscription = await SubscriptionService.getSubscription(schoolId);
      res.json({ subscription });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
