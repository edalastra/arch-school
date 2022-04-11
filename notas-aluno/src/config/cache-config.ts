import { RedisOptions } from 'ioredis';
import env from '../shared/env';

interface CacheConfigInterface {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export default {
  config: {
    redis: env.REDIS_CONFIG,
  },
  driver: 'redis',
} as CacheConfigInterface;
