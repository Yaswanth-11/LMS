import dotenv from "dotenv";
dotenv.config();

const development = {
  port: process.env.PORT || 3000,
  db: {
    uri:
      process.env.MONGODB_URI_DEV || "mongodb://127.0.0.1:27017/techspark-dev",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "change_me_in_env",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "change_refresh_secret",
    emailSecret: process.env.JWT_EMAIL_SECRET || "email_verify_secret",
    accessExpiresIn: "15m",
    refreshExpiresIn: "7d",
    emailTokenExpiresIn: "1d",
    passwordResetExpiresIn: "30m", // 30 minutes
  },
  mail: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || "noreply@yourdomain.com",
  },
  redis: {
    url: process.env.REDIS_URL_DEV,
    password: process.env.REDIS_PASSWORD_DEV,
  },
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
};

const production = {
  port: process.env.PORT || 5000,
  db: {
    uri: process.env.MONGODB_URI_PROD,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "change_me_in_env",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "change_refresh_secret",
    emailSecret: process.env.JWT_EMAIL_SECRET || "email_verify_secret",
    accessExpiresIn: "15m",
    refreshExpiresIn: "7d",
    emailTokenExpiresIn: "1d",
    passwordResetExpiresIn: "30m", // 30 minutes
  },
  mail: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || "noreply@yourdomain.com",
  },
  redis: {
    url: process.env.REDIS_URL_PROD,
    password: process.env.REDIS_PASSWORD_PROD,
  },
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
};

const config = {
  development,
  production,
};

export default config[process.env.NODE_ENV || "development"];
