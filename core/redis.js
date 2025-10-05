import { createClient } from "redis";

import logger from "../utils/logger.js";

export async function nodeRedisDemo() {
  try {
    const redisurl = process.env.redisURL;
    const redispassword = process.env.redisPassword;

    let client;

    client = createClient({ url: redisurl, password: redispassword });

    await client.connect();

    client.on("error", (err) => {
      throw err;
    });

    const clientObj = {
      async setKey(key, value) {
        try {
          await client.set(key, value);
        } catch (error) {
          throw new Error(`Failed to set key ${key}: ${error.message}`);
        }
      },
      async getValue(key) {
        try {
          const myKeyValue = await client.get(key);
          return myKeyValue;
        } catch (error) {
          throw new Error(
            `Failed to get value for key ${key}: ${error.message}`
          );
        }
      },
      async deleteKey(key) {
        try {
          await client.del(key);
        } catch (error) {
          throw new Error(`Failed to delete key ${key}: ${error.message}`);
        }
      },
      async modifyKey(key, newValue) {
        try {
          await client.set(key, newValue);
        } catch (error) {
          throw new Error(`Failed to modify key ${key}: ${error.message}`);
        }
      },
    };

    return clientObj;
  } catch (error) {
    logger.info(`Error: ${JSON.stringify(error, null, 2)}`);
    throw new Error(`Failed to connect to Redis: ${error.message}`);
  }
}
