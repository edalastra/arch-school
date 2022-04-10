import { NotaRepository } from '../../infra/repositories';
import { client } from 'src/config/database';
import { HttpHandlerInterface } from 'src/shared/types';
import { FindAllNotaService } from '../../services';
import { FindAllNotaHandler } from '../../infra/http/handlers/find-all-nota-handler';

export const makeFindAllNotaHandler = (): HttpHandlerInterface => {
  const notasRepository = new NotaRepository(client);
  const service = new FindAllNotaService(notasRepository);

  return new FindAllNotaHandler(service);
};
