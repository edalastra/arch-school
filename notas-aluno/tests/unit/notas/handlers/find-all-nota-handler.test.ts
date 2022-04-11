import { Request } from 'express';
import { mock } from 'jest-mock-extended';
import { FindAllNotaHandler } from '../../../../src/modules/notas/infra/http/handlers';
import { FindAllNotaService } from '../../../../src/modules/notas/services';
import { mockResponse } from '../fakes';

const makeSut = () => {
  const service = mock<FindAllNotaService>();

  const sut = new FindAllNotaHandler(service);

  return {
    sut,
    service,
  };
};

describe('FindAllNotaHandler', () => {
  it('Should call the service', async () => {
    const { sut, service } = makeSut();

    sut.handle(
      {
        user: {
          id: 1,
        },
      } as unknown as Request,
      mockResponse,
    );
    expect(service.execute).toBeCalledWith(1);
  });
});
