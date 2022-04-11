import request from 'supertest';
import { client } from '../../../../src/config/database';
import { createApp } from '../../../../src/config/app';

describe('FindAllNotaHandler', function () {
  let app: Express.Application;
  beforeAll(async function () {
    await client.query('CREATE TEMP TABLE aluno(LIKE aluno)');
    await client.query('CREATE TEMP TABLE nota(LIKE nota)');

    app = createApp();
  });

  beforeEach(async function () {
    await client.query(
      `INSERT INTO pg_temp.aluno(id, nome) VALUES(1, 'test aluno')`,
    );
    await client.query(
      `INSERT INTO pg_temp.nota(id, aluno_id, valor) VALUES
        (1, 1, 10.0),
        (2, 1, 8.0),
        (3, 1, 6.5)
      `,
    );
  });

  afterEach(async function () {
    await client.query('DROP TABLE IF EXISTS pg_temp.nota');
    await client.query('DROP TABLE IF EXISTS pg_temp.aluno');
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
            media: '8.16',
            situacao: 'APROVADO',
            notas: [10, 8, 6.5],
          },
        ],
      };

      expect(response.body).toEqual(expectResult);
    });
  });
});
