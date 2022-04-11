import { NotaRepository } from '../../infra/repositories';
import { client } from '../../../../config/database';
import { HttpHandlerInterface } from 'src/shared/types';
import { FindAllNotaService } from '../../services';
import { FindAllNotaHandler } from '../../infra/http/handlers/find-all-nota-handler';
import { AlunosRepository } from '../../../alunos/infra/repositories';
import { RedisCache } from '../../../../config/cache';

export const makeFindAllNotaHandler = (): HttpHandlerInterface => {
  const notasRepository = new NotaRepository(client);
  const alunosRepository = new AlunosRepository(client);
  const cache = new RedisCache();
  const service = new FindAllNotaService(
    notasRepository,
    alunosRepository,
    cache,
  );

  return new FindAllNotaHandler(service);
};
