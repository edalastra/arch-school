import { AlunosRepositoryInterface } from '../../alunos/domain/repositories';
import { AppError } from '../../../shared/errors';
import { CreateNotaInterface, NotaInterface } from '../domain/models';
import { NotasRepositoryInterface } from '../domain/repositories';
import { RedisCacheInterface } from '../../../config/cache';
import env from '../../../shared/env';

export class CreateNotaService {
  constructor(
    private readonly notasRepository: NotasRepositoryInterface,
    private readonly alunosRepository: AlunosRepositoryInterface,
    private readonly cache: RedisCacheInterface,
  ) {}

  public async execute({
    alunoId,
    valor,
  }: CreateNotaInterface): Promise<NotaInterface> {
    const aluno = await this.alunosRepository.findById(alunoId);

    if (!aluno) {
      throw new AppError('Esse aluno não existe.');
    }

    await this.cache.invalidate(`${env.NOTAS_CACHE_KEY}:${alunoId}`);
    await this.cache.invalidate(`${env.NOTAS_CACHE_KEY}:admin`);

    const createdNota = this.notasRepository.create({
      valor,
      aluno,
    });

    return createdNota;
  }
}
