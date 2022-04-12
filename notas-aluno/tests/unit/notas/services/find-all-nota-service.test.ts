import { mock } from 'jest-mock-extended';
import { FindAllNotaService } from '../../../../src/modules/notas/services';
import { FakeNotaRepository, fakeNotasResult } from '../fakes';
import { FakeAlunosRepository } from '../../alunos/fakes';
import { RedisCacheInterface } from '../../../../src/config/cache';

const makeSut = () => {
  const notasRepository = new FakeNotaRepository();
  const alunosRepository = new FakeAlunosRepository();
  const cache = mock<RedisCacheInterface>();
  const sut = new FindAllNotaService(notasRepository, alunosRepository, cache);

  return {
    sut,
    notasRepository,
    alunosRepository,
    cache,
  };
};

describe('FindAllNotaService', () => {
  it('Should list notas', async () => {
    const { sut, alunosRepository, cache } = makeSut();

    cache.recover.mockResolvedValueOnce(null);

    const aluno = await alunosRepository.create({
      nome: 'Teste',
    });
    const notas = await sut.execute(aluno.id as number);

    expect(notas).toEqual(fakeNotasResult());
  });

  it('Should throw if aluno is not exists', async () => {
    const { sut } = makeSut();

    await expect(sut.execute(40)).rejects.toEqual({
      message: 'Aluno não encontrado.',
      statusCode: 400,
    });
  });
});
