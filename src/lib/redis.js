import Redis from 'ioredis';
import { config } from 'dotenv';
config();


const redisClient = new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT
});

redisClient.on('connect', () => {
  console.log('Redis connected');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redisClient;