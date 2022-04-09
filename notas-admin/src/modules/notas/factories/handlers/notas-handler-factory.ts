import { NotaRepository } from '../../infra/repositories';
import { client } from 'src/config/database';
import { HttpHandlerInterface } from 'src/shared/types';
import { CreateNotaHandler } from '../../infra/http/handlers/create-handler';
import { CreateNotaService } from '../../services';
import { AlunosRepository } from 'src/modules/alunos/infra/repositories';

export const makeNotasHandler = (): HttpHandlerInterface => {
  const notasRepository = new NotaRepository(client);
  const alunosRepository = new AlunosRepository(client);
  const service = new CreateNotaService(notasRepository, alunosRepository);

  return new CreateNotaHandler(service);
};
