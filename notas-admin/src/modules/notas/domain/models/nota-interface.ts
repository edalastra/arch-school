import { AlunoInterface } from '../../../alunos/domain/models/aluno-interface';

export interface NotaInterface {
  id?: number;
  aluno: AlunoInterface;
  valor: number;
}
