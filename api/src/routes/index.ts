import { Application } from "express";

export const configureRoutes = (app: Application) => {
  app.use("/user", require("./api/user"));
  app.use("/admin", require("./api/admin"));
};
