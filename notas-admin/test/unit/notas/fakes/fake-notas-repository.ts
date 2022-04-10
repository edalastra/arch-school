import { AppError } from '../../../../src/shared/errors';
import {
  NotaInterface,
  ResultNotasInterface,
} from '../../../../src/modules/notas/domain/models';
import { NotasRepositoryInterface } from '../../../../src/modules/notas/domain/repositories';
import { fakeNotasResult, generateFakeId } from './fake-data';

export class FakeNotaRepository implements NotasRepositoryInterface {
  private fakeNotas: NotaInterface[] = [];

  async create(nota: NotaInterface): Promise<NotaInterface> {
    const fakeNota = {
      id: generateFakeId(),
      aluno: nota.aluno,
      valor: nota.valor,
    };

    this.fakeNotas.includes(fakeNota);

    return fakeNota;
  }

  async findAll(): Promise<ResultNotasInterface[]> {
    return fakeNotasResult();
  }

  async update(nota: NotaInterface): Promise<NotaInterface> {
    const findIndex = this.fakeNotas.findIndex(
      findNota => findNota.id === nota.id,
    );

    this.fakeNotas[findIndex] = nota;

    return nota;
  }

  async findById(id: number): Promise<NotaInterface> {
    const findIndex = this.fakeNotas.findIndex(findNota => findNota.id === id);

    if (findIndex == -1) {
      throw new AppError('Nota não encontrada.');
    }

    return this.fakeNotas[findIndex];
  }
}
