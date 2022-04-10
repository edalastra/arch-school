import { AlunosRepositoryInterface } from '../../alunos/domain/repositories';
import { AppError } from '../../../shared/errors';
import { CreateNotaInterface, NotaInterface } from '../domain/models';
import { NotasRepositoryInterface } from '../domain/repositories';

export class CreateNotaService {
  constructor(
    private readonly notasRepository: NotasRepositoryInterface,
    private readonly alunosRepository: AlunosRepositoryInterface,
  ) {}

  public async execute({
    alunoId,
    valor,
  }: CreateNotaInterface): Promise<NotaInterface> {
    const aluno = await this.alunosRepository.findById(alunoId);

    if (!aluno) {
      throw new AppError('Esse aluno não existe.');
    }

    const createdNota = this.notasRepository.create({
      valor,
      aluno,
    });

    return createdNota;
  }
}
