import { ResultNotasInterface } from '../models';

export interface NotasRepositoryInterface {
  findByAluno: (id: number) => Promise<ResultNotasInterface>;
}
