import { NotaInterface } from '../domain/models';
import { NotasRepositoryInterface } from '../domain/repositories';

export class FindAllNotaService {
  constructor(private readonly notasRepository: NotasRepositoryInterface) {}

  public async execute(): Promise<NotaInterface[]> {
    const notas = this.notasRepository.findAll();

    return notas;
  }
}
