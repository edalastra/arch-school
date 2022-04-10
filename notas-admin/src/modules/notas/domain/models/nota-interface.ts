import { AlunoInterface } from '../../../alunos/domain/models/aluno-interface';

export interface NotaInterface {
  id?: number;
  aluno: AlunoInterface;
  valor: number;
}
export interface CreateNotaInterface {
  valor: number;
  alunoId: number;
}

export interface UpdateNotaInterface {
  valor: number;
  notaId: number;
}
export interface ResultNotasInterface {
  aluno_id: number;
  nome: string;
  media: number;
  situacao: string;
  notas: number[];
}
