export interface RedisCacheInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recover: <T>(key: string) => Promise<T | null>;
}
