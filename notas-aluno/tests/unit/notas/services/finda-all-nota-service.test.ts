import { FindAllNotaService } from '../../../../src/modules/notas/services';
import { FakeNotaRepository, fakeNotasResult } from '../fakes';

const makeSut = () => {
  const notasRepository = new FakeNotaRepository();
  const sut = new FindAllNotaService(notasRepository);

  return {
    sut,
    notasRepository,
  };
};

describe('FindAllNotaService', () => {
  it('Should list all notas', async () => {
    const { sut } = makeSut();

    const notas = await sut.execute();

    expect(notas).toEqual(fakeNotasResult());
  });
});
