import { ResultNotasInterface } from '../domain/models';
import { NotasRepositoryInterface } from '../domain/repositories';

export class FindAllNotaService {
  constructor(private readonly notasRepository: NotasRepositoryInterface) {}

  public async execute(alunoId: number): Promise<ResultNotasInterface> {
    const notas = this.notasRepository.findByAluno(alunoId);

    return notas;
  }
}
