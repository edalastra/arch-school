import request from 'supertest';
import { client } from '../../../../src/config/database';
import { createApp } from '../../../../src/config/app';

describe('UpdateNotaHandler', function () {
  let app: Express.Application;
  beforeEach(async function () {
    await client.query('CREATE TEMP TABLE aluno(LIKE aluno)');
    await client.query('CREATE TEMP TABLE nota(LIKE nota)');

    app = createApp();
  });

  beforeEach(async function () {
    await client.query(
      `INSERT INTO pg_temp.aluno(id, nome) VALUES(1, 'test aluno')`,
    );
    await client.query(
      `INSERT INTO pg_temp.nota(id, valor, aluno_id) VALUES(1, 5.00, 1)`,
    );
  });

  afterEach(async function () {
    await client.query('DROP TABLE IF EXISTS pg_temp.nota');
    await client.query('DROP TABLE IF EXISTS pg_temp.aluno');
  });

  describe('POST /v1/notas', () => {
    it('Should create a new nota', async () => {
      const body = {
        valor: 9.5,
      };

      const response = await request(app).post('/v1/notas/1').send(body);
      expect(response.status).toBe(200);
    });
  });
});
