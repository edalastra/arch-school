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
