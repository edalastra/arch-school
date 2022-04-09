import { Request, Response } from 'express';
import { CreateNotaInterface } from 'src/modules/notas/domain/models';
import { CreateNotaService } from 'src/modules/notas/services';
import { HttpHandlerInterface } from 'src/shared/types';

export class CreateNotaHandler implements HttpHandlerInterface {
  constructor(public readonly service: CreateNotaService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const nota = await this.service.execute(req.body as CreateNotaInterface);

    return res.status(201).json({ nota });
  }
}
