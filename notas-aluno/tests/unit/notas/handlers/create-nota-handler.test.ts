import { Request } from 'express';
import { mock } from 'jest-mock-extended';
import { CreateNotaHandler } from '../../../../src/modules/notas/infra/http/handlers';
import { CreateNotaService } from '../../../../src/modules/notas/services';
import { generateFakeId, mockResponse } from '../fakes';

const makeSut = () => {
  const service = mock<CreateNotaService>();

  const sut = new CreateNotaHandler(service);

  return {
    sut,
    service,
  };
};

describe('CreateNotaHandler', () => {
  it('Should call the service with the correct values', async () => {
    const { sut, service } = makeSut();

    const reqBody = {
      alunoId: generateFakeId(),
      valor: 9.5,
    };

    await sut.handle(
      {
        body: reqBody,
      } as Request,
      mockResponse,
    );

    expect(service.execute).toBeCalledWith(reqBody);
  });
});
