//http server
import express from "express";

import { connectDB } from "./config/db";
import { configureMiddleware } from "./middlewares/config";
import { configureRoutes } from "./routes";
import { createServer } from "http";
import { config } from "./config/config";

let db: any;

(async () => {
  db = connectDB().then();
})();

//initialize express app
const app = express();

//configure Express middleware
configureMiddleware(app);

//setup routes
configureRoutes(app);

//start server and listen for connections
const httpServer = createServer(app);

httpServer.listen(config.PORT, () => {
  console.info(
    `boombet /api/v1 Server started on`,
    httpServer.address(),
    `PID ${process.pid} \n`
  );
});
