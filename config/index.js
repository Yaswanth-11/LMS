import dotenv from "dotenv";
dotenv.config();

const development = {
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

const production = {
  port: process.env.PORT || 5000,
  db: {
    uri: process.env.MONGODB_URI_PROD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "1h",
  },
  redis: {
    url: process.env.REDIS_URL_PROD,
    password: process.env.REDIS_PASSWORD_PROD,
  },
};

const config = {
  development,
  production,
};

export default config[process.env.NODE_ENV || "development"];
