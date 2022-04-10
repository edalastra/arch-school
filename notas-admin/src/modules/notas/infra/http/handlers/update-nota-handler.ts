import { Request, Response } from 'express';
import { UpdateNotaInterface } from 'src/modules/notas/domain/models';
import { UpdateNotaService } from 'src/modules/notas/services/update-nota-service';
import { HttpHandlerInterface } from 'src/shared/types';

export class UpdateNotaHandler implements HttpHandlerInterface {
  constructor(public readonly service: UpdateNotaService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { valor } = req.body;
    const notaId = parseInt(req.params.notaId);

    const nota = await this.service.execute({
      valor,
      notaId,
    } as UpdateNotaInterface);

    return res.json({ nota });
  }
}
