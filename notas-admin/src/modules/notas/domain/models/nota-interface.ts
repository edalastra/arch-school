import { AlunoInterface } from '../../../alunos/domain/models/aluno-interface';

export interface NotaInterface {
  id?: number;
  aluno: AlunoInterface;
  valor: number;
}

export interface ResultNotasInterface {
  aluno_id: number;
  nome: string;
  media: number;
  stituacao: string;
  notas: number[];
}
