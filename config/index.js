import dotenv from "dotenv";
dotenv.config();

// config/development.js
export default {
  port: process.env.PORT || 3000,
  db: {
    uri:
      process.env.MONGODB_URI_DEV || "mongodb://127.0.0.1:27017/techspark-dev",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-dev-secret",
    expiresIn: "1h",
  },
  redis: {
    url: process.env.REDIS_URL_DEV,
    password: process.env.REDIS_PASSWORD_DEV,
  },
};
