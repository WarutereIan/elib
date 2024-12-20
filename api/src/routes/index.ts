import { Application } from "express";

export const configureRoutes = (app: Application) => {
  app.use("/user", require("./api/user"));
  app.use("/admin", require("./api/admin"));
  app.use("/manage", require("./api/payments"));
  app.use("/admin-analytics", require("./api/admin.analytics.routes"));
};
