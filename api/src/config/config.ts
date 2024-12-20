import "dotenv/config";

export const config = {
  MONGO_URI: process.env.MONGO_STRING!,

  PORT: process.env.PORT || 5000,

  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_TOKEN_EXPIRES_IN: 3600000 * 12, //expires in 12hours
};
