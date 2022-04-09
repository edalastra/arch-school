import { NotaInterface } from '../models';

export interface NotasRepositoryInterface {
  create: (nota: NotaInterface) => Promise<NotaInterface>;
  //update: (nota: NotaInterface) => Promise<void>;
  findAll: () => Promise<NotaInterface[]>;
  findById: (id: number) => Promise<NotaInterface | undefined>;
}
