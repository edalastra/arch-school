import { Request, Response } from 'express';

export interface HttpHandlerInterface {
  handle: (req: Request, res: Response) => Promise<Response>;
}
