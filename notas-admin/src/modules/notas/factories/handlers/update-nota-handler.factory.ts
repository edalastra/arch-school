import { NotaRepository } from '../../infra/repositories';
import { client } from '../../../../config/database';
import { HttpHandlerInterface } from 'src/shared/types';
import { UpdateNotaHandler } from '../../infra/http/handlers/update-nota-handler';
import { UpdateNotaService } from '../../services/update-nota-service';
import { RedisCache } from '../../../../config/cache';

export const makeUpdateNotaHandler = (): HttpHandlerInterface => {
  const notasRepository = new NotaRepository(client);
  const cache = new RedisCache();
  const service = new UpdateNotaService(notasRepository, cache);

  return new UpdateNotaHandler(service);
};
