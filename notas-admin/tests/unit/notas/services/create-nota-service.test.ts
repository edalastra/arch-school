import { mock } from 'jest-mock-extended';
import { CreateNotaService } from '../../../../src/modules/notas/services';
import { FakeAlunosRepository } from '../../alunos/fakes';
import { FakeNotaRepository } from '../fakes';
import { RedisCacheInterface } from '../../../../src/config/cache';

const makeSut = () => {
  const notasRepository = new FakeNotaRepository();
  const alunosRepository = new FakeAlunosRepository();
  const cache = mock<RedisCacheInterface>();
  const sut = new CreateNotaService(notasRepository, alunosRepository, cache);

  return {
    sut,
    notasRepository,
    alunosRepository,
    cache,
  };
};

describe('CreateNotaService', () => {
  it('Should create a new nota and return the correct value', async () => {
    const { sut, alunosRepository, notasRepository, cache } = makeSut();

    cache.invalidate.mockResolvedValue();

    const aluno = await alunosRepository.create({ nome: 'João Teste' });

    const createdNota = await sut.execute({
      alunoId: aluno.id as number,
      valor: 9.5,
    });
    const nota = await notasRepository.findById(createdNota.id as number);

    expect(createdNota).toEqual(nota);
  });
});
