import { Request } from 'express';
import { mock } from 'jest-mock-extended';
import { UpdateNotaHandler } from '../../../../src/modules/notas/infra/http/handlers';
import { UpdateNotaService } from '../../../../src/modules/notas/services';
import { fakeNota, mockResponse } from '../fakes';

const makeSut = () => {
  const service = mock<UpdateNotaService>();

  const sut = new UpdateNotaHandler(service);

  return {
    sut,
    service,
  };
};

describe('UpdateNotaHandler', () => {
  it('Should call the service with the correct values', async () => {
    const { sut, service } = makeSut();

    service.execute.mockResolvedValueOnce(fakeNota);

    const reqBody = {
      valor: 5,
    };

    await sut.handle(
      {
        params: { notaId: fakeNota.id },
        body: reqBody,
      } as unknown as Request,
      mockResponse,
    );

    expect(service.execute).toBeCalledWith({
      notaId: fakeNota.id,
      valor: reqBody.valor,
    });
  });
});
