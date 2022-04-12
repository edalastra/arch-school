import { AlunoInterface } from '../../../../src/modules/alunos/domain/models';
import { AlunosRepositoryInterface } from '../../../../src/modules/alunos/domain/repositories';
import { AppError } from '../../../../src/shared/errors';
import { generateFakeId } from '../../notas/fakes/fake-data';

export class FakeAlunosRepository implements AlunosRepositoryInterface {
  private fakeAlunos: AlunoInterface[] = [];

  async create(aluno: AlunoInterface): Promise<AlunoInterface> {
    const fakeAluno = {
      id: generateFakeId(),
      nome: aluno.nome,
    };

    this.fakeAlunos.push(fakeAluno);

    return fakeAluno;
  }

  async findById(id: number): Promise<AlunoInterface | undefined> {
    const findIndex = this.fakeAlunos.findIndex(
      findAluno => findAluno.id === id,
    );

    if (findIndex == -1) {
      throw new AppError('Aluno não encontrado.');
    }

    return this.fakeAlunos[findIndex];
  }
}
