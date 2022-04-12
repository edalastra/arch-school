import { AlunoInterface } from '../models';

export interface AlunosRepositoryInterface {
  create: (nota: AlunoInterface) => Promise<AlunoInterface>;
  findById: (id: number) => Promise<AlunoInterface | undefined>;
}
