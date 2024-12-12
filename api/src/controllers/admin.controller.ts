import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";

export class AdminController {
  static async getAllPayments(req: Request, res: Response) {
    try {
      const payments = await AdminService.getAllPayments();
      res.json({ payments });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllSubscriptions(req: Request, res: Response) {
    try {
      const subscriptions = await AdminService.getAllSubscriptions();
      res.json({ subscriptions });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPaymentAnalytics(req: Request, res: Response) {
    try {
      const analytics = await AdminService.getPaymentAnalytics();
      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateSubscriptionStatus(req: Request, res: Response) {
    try {
      const { subscriptionId, status } = req.body;
      const subscription = await AdminService.updateSubscriptionStatus(
        subscriptionId,
        status
      );
      res.json({ subscription });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
