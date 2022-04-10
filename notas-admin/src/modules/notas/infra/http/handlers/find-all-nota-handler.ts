import { Request, Response } from 'express';
import { FindAllNotaService } from 'src/modules/notas/services';
import { HttpHandlerInterface } from 'src/shared/types';

export class FindAllNotaHandler implements HttpHandlerInterface {
  constructor(public readonly service: FindAllNotaService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const notas = await this.service.execute();

    return res.json({ notas });
  }
}
