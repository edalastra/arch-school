import { NotaInterface, ResultNotasInterface } from '../models';

export interface NotasRepositoryInterface {
  create: (nota: NotaInterface) => Promise<NotaInterface>;
  update: (nota: NotaInterface) => Promise<NotaInterface>;
  findById: (id: number) => Promise<NotaInterface>;
  findAll: () => Promise<ResultNotasInterface[]>;
}
