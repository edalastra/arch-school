import { NotaRepository } from '../../infra/repositories';
import { client } from 'src/config/database';
import { HttpHandlerInterface } from 'src/shared/types';
import { UpdateNotaHandler } from '../../infra/http/handlers/update-nota-handler';
import { UpdateNotaService } from '../../services/update-nota-service';

export const makeUpdateNotaHandler = (): HttpHandlerInterface => {
  const notasRepository = new NotaRepository(client);
  const service = new UpdateNotaService(notasRepository);

  return new UpdateNotaHandler(service);
};
