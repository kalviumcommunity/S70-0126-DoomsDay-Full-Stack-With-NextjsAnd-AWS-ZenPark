import Redis from "ioredis";
import { logger } from "./logger";

const getRedisUrl = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL;
    }
    return "redis://localhost:6379";
};

let redis: Redis;

try {
    redis = new Redis(getRedisUrl(), {
        maxRetriesPerRequest: 3,
    });

    redis.on("error", (error) => {
        logger.error("Redis connection error", { error });
    });

    redis.on("connect", () => {
        logger.info("Redis connected successfully");
    });

} catch (error) {
    logger.error("Failed to initialize Redis client", { error });
    // Fallback or exit process depending on criticality
    redis = new Redis({ lazyConnect: true }); // Dummy client to prevent crash
}

export default redis;
