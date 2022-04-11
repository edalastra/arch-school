import { AlunosRepositoryInterface } from '../../alunos/domain/repositories';
import { AppError } from '../../../shared/errors';
import { ResultNotasInterface } from '../domain/models';
import { NotasRepositoryInterface } from '../domain/repositories';
import { RedisCacheInterface } from '../../../config/cache';
import env from '../../../shared/env';

export class FindAllNotaService {
  constructor(
    private readonly notasRepository: NotasRepositoryInterface,
    private readonly alunosRepository: AlunosRepositoryInterface,
    private readonly cache: RedisCacheInterface,
  ) {}

  public async execute(alunoId: number): Promise<ResultNotasInterface> {
    const aluno = await this.alunosRepository.findById(alunoId);

    if (!aluno) {
      throw new AppError('Aluno não encontrado.');
    }

    let notas = await this.cache.recover<ResultNotasInterface>(
      env.NOTAS_CACHE_KEY,
    );
    if (!notas) {
      notas = await this.notasRepository.findByAluno(alunoId);
    }

    return notas;
  }
}
