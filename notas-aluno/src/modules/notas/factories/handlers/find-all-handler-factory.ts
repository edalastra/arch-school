import { NotaRepository } from '../../infra/repositories';
import { client } from '../../../../config/database';
import { HttpHandlerInterface } from 'src/shared/types';
import { FindAllNotaService } from '../../services';
import { FindAllNotaHandler } from '../../infra/http/handlers/find-all-nota-handler';
import { AlunosRepository } from '../../../alunos/infra/repositories';

export const makeFindAllNotaHandler = (): HttpHandlerInterface => {
  const notasRepository = new NotaRepository(client);
  const alunosRepository = new AlunosRepository(client);
  const service = new FindAllNotaService(notasRepository, alunosRepository);

  return new FindAllNotaHandler(service);
};
