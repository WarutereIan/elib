declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      [key: string]: any;
    };
  }
}
