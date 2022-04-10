import { CreateNotaService } from '../../../../src/modules/notas/services';
import { FakeAlunosRepository } from '../../alunos/fakes';
import { FakeNotaRepository } from '../fakes';

const makeSut = () => {
  const notasRepository = new FakeNotaRepository();
  const alunosRepository = new FakeAlunosRepository();
  const sut = new CreateNotaService(notasRepository, alunosRepository);

  return {
    sut,
    notasRepository,
    alunosRepository,
  };
};

describe('CreateNotaService', () => {
  it('Should create a new nota and return the correct value', async () => {
    const { sut, alunosRepository, notasRepository } = makeSut();

    const aluno = await alunosRepository.create({ nome: 'João Teste' });

    const createdNota = await sut.execute({
      alunoId: aluno.id as number,
      valor: 9.5,
    });
    const nota = await notasRepository.findById(createdNota.id as number);

    expect(createdNota).toEqual(nota);
  });
});
