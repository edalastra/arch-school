import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '../cache-config';
import { RedisCacheInterface } from './redis-cache-interface';

export class RedisCache implements RedisCacheInterface {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }
  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }
}
