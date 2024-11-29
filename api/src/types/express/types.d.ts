import express from "express";
import { Express } from "express-serve-static-core";
import { Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
  }
}
