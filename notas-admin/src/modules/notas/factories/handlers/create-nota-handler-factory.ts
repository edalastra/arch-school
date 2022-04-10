import { NotaRepository } from '../../infra/repositories';
import { client } from '../../../../config/database';
import { HttpHandlerInterface } from '../../../../shared/types';
import { CreateNotaHandler } from '../../infra/http/handlers/create-nota-handler';
import { CreateNotaService } from '../../services';
import { AlunosRepository } from '../../../../modules/alunos/infra/repositories';

export const makeCreateNotaHandler = (): HttpHandlerInterface => {
  const notasRepository = new NotaRepository(client);
  const alunosRepository = new AlunosRepository(client);
  const service = new CreateNotaService(notasRepository, alunosRepository);

  return new CreateNotaHandler(service);
};
