import request from 'supertest';
import { client } from '../../../../src/config/database';
import { createApp } from '../../../../src/config/app';

describe('CreateNotaHandler', function () {
  let app: Express.Application;
  beforeAll(async function () {
    await client.query('CREATE TEMP TABLE aluno(LIKE aluno)');
    await client.query('CREATE TEMP TABLE nota(LIKE nota INCLUDING defaults)');

    app = createApp();
  });

  beforeEach(async function () {
    await client.query(
      `INSERT INTO pg_temp.aluno(id, nome) VALUES(1, 'test aluno')`,
    );
  });

  afterEach(async function () {
    await client.query('DROP TABLE IF EXISTS pg_temp.nota');
    await client.query('DROP TABLE IF EXISTS pg_temp.aluno');
  });

  describe('POST /v1/notas', () => {
    it('Should create a new nota', async () => {
      const body = {
        alunoId: 1,
        valor: 9.5,
      };

      const response = await request(app).post('/v1/notas').send(body);
      const { rows } = await client.query('SELECT * FROM nota');

      expect(response.status).toBe(201);
      expect(rows).toHaveLength(1);
    });
  });
});
