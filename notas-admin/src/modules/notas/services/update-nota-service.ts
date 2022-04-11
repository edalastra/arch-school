import { RedisCacheInterface } from 'src/config/cache';
import { NotaInterface, UpdateNotaInterface } from '../domain/models';
import { NotasRepositoryInterface } from '../domain/repositories';
import env from '../../../shared/env';
export class UpdateNotaService {
  constructor(
    private readonly notasRepository: NotasRepositoryInterface,
    private readonly cache: RedisCacheInterface,
  ) {}

  public async execute({
    notaId,
    valor,
  }: UpdateNotaInterface): Promise<NotaInterface> {
    const nota = await this.notasRepository.findById(notaId);
    nota.valor = valor;
    const updatedNota = await this.notasRepository.update(nota);

    await this.cache.invalidate(`${env.NOTAS_CACHE_KEY}:${nota.aluno.id}`);
    await this.cache.invalidate(`${env.NOTAS_CACHE_KEY}:admin`);

    return updatedNota;
  }
}
