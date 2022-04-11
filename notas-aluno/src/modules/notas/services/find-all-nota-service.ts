import { AlunosRepositoryInterface } from '../../alunos/domain/repositories';
import { AppError } from '../../../shared/errors';
import { ResultNotasInterface } from '../domain/models';
import { NotasRepositoryInterface } from '../domain/repositories';

export class FindAllNotaService {
  constructor(
    private readonly notasRepository: NotasRepositoryInterface,
    private readonly alunosRepository: AlunosRepositoryInterface,
  ) {}

  public async execute(alunoId: number): Promise<ResultNotasInterface> {
    const aluno = await this.alunosRepository.findById(alunoId);

    if (!aluno) {
      throw new AppError('Aluno não encontrado.');
    }

    const notas = this.notasRepository.findByAluno(alunoId);

    return notas;
  }
}
