import { NotaInterface, UpdateNotaInterface } from '../domain/models';
import { NotasRepositoryInterface } from '../domain/repositories';

export class UpdateNotaService {
  constructor(private readonly notasRepository: NotasRepositoryInterface) {}

  public async execute({
    notaId,
    valor,
  }: UpdateNotaInterface): Promise<NotaInterface> {
    const nota = await this.notasRepository.findById(notaId);
    nota.valor = valor;
    const updatedNota = await this.notasRepository.update(nota);
    return updatedNota;
  }
}
