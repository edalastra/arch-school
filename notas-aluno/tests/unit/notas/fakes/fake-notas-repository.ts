import { ResultNotasInterface } from '../../../../src/modules/notas/domain/models';
import { NotasRepositoryInterface } from '../../../../src/modules/notas/domain/repositories';
import { fakeNotasResult } from './fake-data';

export class FakeNotaRepository implements NotasRepositoryInterface {
  async findByAluno(id: number): Promise<ResultNotasInterface> {
    return fakeNotasResult();
  }
}
