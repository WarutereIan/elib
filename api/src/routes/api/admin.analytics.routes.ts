import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { adminAuth } from "../../middlewares/admin-auth";
import { AdminController } from "../../controllers/admin.controller";

const router = Router();

// Ensure both authentication and admin authorization
//router.use(auth, adminAuth);

router.get("/payments", AdminController.getAllPayments);
router.get("/subscriptions", AdminController.getAllSubscriptions);
router.get("/analytics", AdminController.getPaymentAnalytics);
router.post(
  "/subscription/update-status",
  AdminController.updateSubscriptionStatus
);

module.exports = router;
