import { NotaInterface, ResultNotasInterface } from '../models';

export interface NotasRepositoryInterface {
  create: (nota: NotaInterface) => Promise<NotaInterface>;
  //update: (nota: NotaInterface) => Promise<void>;
  findById: (id: number) => Promise<NotaInterface | undefined>;
  findAll: () => Promise<ResultNotasInterface[]>;
}
