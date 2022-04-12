import { RedisCacheInterface } from 'src/config/cache';
import { ResultNotasInterface } from '../domain/models';
import { NotasRepositoryInterface } from '../domain/repositories';
import env from '../../../shared/env';

export class FindAllNotaService {
  constructor(
    private readonly notasRepository: NotasRepositoryInterface,
    private readonly cache: RedisCacheInterface,
  ) {}

  public async execute(): Promise<ResultNotasInterface[]> {
    const redisKey = `${env.NOTAS_CACHE_KEY}:admin`;

    let notas = await this.cache.recover<ResultNotasInterface[]>(redisKey);
    if (!notas) {
      notas = await this.notasRepository.findAll();
      await this.cache.save(redisKey, notas);
    }
    return notas;
  }
}
