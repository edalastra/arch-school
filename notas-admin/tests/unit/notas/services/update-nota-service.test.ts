import { UpdateNotaService } from '../../../../src/modules/notas/services';
import { FakeAlunosRepository } from '../../alunos/fakes';
import { FakeNotaRepository } from '../fakes';

const makeSut = () => {
  const alunosRepository = new FakeAlunosRepository();
  const notasRepository = new FakeNotaRepository();
  const sut = new UpdateNotaService(notasRepository);

  return {
    sut,
    notasRepository,
    alunosRepository,
  };
};

describe('CreateNotaService', () => {
  it('Should create a new nota and return the correct value', async () => {
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
