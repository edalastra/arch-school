import request from 'supertest';
import app from '../../../../src/shared/http/server';
import { client } from '../fake/poolClient';

describe('Note route', function () {
  beforeEach(async function () {
    await client.query(
      'CREATE TEMPORARY TABLE aluno(LIKE aluno INCLUDING ALL)',
    );
    await client.query('CREATE TEMPORARY TABLE nota(LIKE nota INCLUDING ALL)');
  });

  beforeEach(async function () {
    await client.query(`INSERT INTO pg_temp.aluno(nome) VALUES('test aluno')`);
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
      expect(response.status).toBe(201);
    });
  });
});
