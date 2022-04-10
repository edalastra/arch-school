import request from 'supertest';
import app from '../../../../src/config/app';
import { client } from '../fake/poolClient';

describe('UpdateNotaHandler', function () {
  beforeEach(async function () {
    await client.query(
      'CREATE TEMPORARY TABLE aluno(LIKE aluno INCLUDING ALL)',
    );
    await client.query('CREATE TEMPORARY TABLE nota(LIKE nota INCLUDING ALL)');
  });

  beforeEach(async function () {
    await client.query(`INSERT INTO pg_temp.aluno(nome) VALUES('test aluno')`);
    await client.query(
      `INSERT INTO pg_temp.nota(valor, aluno_id) VALUES(5.00, 1)`,
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
