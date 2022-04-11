import { mock } from 'jest-mock-extended';
import { RedisCacheInterface } from '../../../../src/config/cache';
import { UpdateNotaService } from '../../../../src/modules/notas/services';
import { FakeAlunosRepository } from '../../alunos/fakes';
import { FakeNotaRepository } from '../fakes';

const makeSut = () => {
  const alunosRepository = new FakeAlunosRepository();
  const notasRepository = new FakeNotaRepository();
  const cache = mock<RedisCacheInterface>();
  const sut = new UpdateNotaService(notasRepository, cache);

  return {
    sut,
    notasRepository,
    alunosRepository,
    cache,
  };
};

describe('UpdateNotaService', () => {
  it('Should updat a nota and return the correct value', async () => {
    const { sut, notasRepository, alunosRepository } = makeSut();

    const aluno = await alunosRepository.create({ nome: 'João Teste' });
    const createdNota = await notasRepository.create({
      valor: 8.5,
      aluno,
    });

    const updatedNota = await sut.execute({
      valor: createdNota.valor,
      notaId: createdNota.id as number,
    });
    const nota = await notasRepository.findById(createdNota.id as number);

    expect(nota).toEqual(updatedNota);
  });
});
