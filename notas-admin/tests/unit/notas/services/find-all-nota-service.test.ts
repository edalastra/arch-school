import { mock } from 'jest-mock-extended';
import { FindAllNotaService } from '../../../../src/modules/notas/services';
import { FakeNotaRepository, fakeNotasResult } from '../fakes';
import { RedisCacheInterface } from '../../../../src/config/cache';

const makeSut = () => {
  const notasRepository = new FakeNotaRepository();
  const cache = mock<RedisCacheInterface>();
  const sut = new FindAllNotaService(notasRepository, cache);

  return {
    sut,
    notasRepository,
    cache,
  };
};

describe('FindAllNotaService', () => {
  it('Should list all notas', async () => {
    const { sut, cache } = makeSut();

    cache.recover.mockResolvedValue(null);

    const notas = await sut.execute();

    expect(notas).toEqual(fakeNotasResult());
  });
});
