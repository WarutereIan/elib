import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { validatePayment } from "../../middlewares/validation";
import { PaymentController } from "../../controllers/payment.controllers";
import { SubscriptionController } from "../../controllers/subscription.cntroller";

const router = Router();

router.post(
  "/payments/create",
  auth,
  validatePayment,
  PaymentController.createPayment
);
router.post("/payments/process", auth, PaymentController.processPayment);
router.get("/payments/history", auth, PaymentController.getPaymentHistory);
router.get(
  "/subscription/status",
  auth,
  SubscriptionController.getSubscriptionStatus
);

module.exports = router;
