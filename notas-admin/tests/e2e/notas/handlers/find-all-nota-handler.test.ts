import request from 'supertest';
import { client } from '../../../../src/config/database';
import { createApp } from '../../../../src/config/app';

describe('FindAllNotaHandler', function () {
  let app: Express.Application;
  beforeAll(async function () {
    await client.query('DELETE FROM nota');
    await client.query('DELETE FROM aluno');

    app = createApp();
  });

  beforeEach(async function () {
    await client.query(`INSERT INTO aluno(id, nome) VALUES(1, 'test aluno')`);
    await client.query(
      `INSERT INTO nota(id, aluno_id, valor) VALUES
        (1, 1, 10.0),
        (2, 1, 8.0),
        (3, 1, 6.5)
      `,
    );
  });

  afterEach(async function () {
    await client.query('DELETE FROM nota');
    await client.query('DELETE FROM aluno');
  });

  afterAll(async function () {
    await client.query(`INSERT INTO aluno(id, nome) VALUES(1, 'test aluno')`);
  });

  describe('GET /v1/notas', () => {
    it('Should create a new nota', async () => {
      const response = await request(app).get('/v1/notas');
      expect(response.status).toBe(200);

      const expectResult = {
        notas: [
          {
            aluno_id: 1,
            nome: 'test aluno',
            media: '8.17',
            situacao: 'APROVADO',
            notas: [10, 8, 6.5],
          },
        ],
      };

      expect(response.body).toEqual(expectResult);
    });
  });
});
