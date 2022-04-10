import { Client } from 'pg';
import { AppError } from 'src/shared/errors';
import { AlunoInterface } from '../../domain/models';
import { AlunosRepositoryInterface } from '../../domain/repositories';

export class AlunosRepository implements AlunosRepositoryInterface {
  constructor(private readonly db: Client) {}

  async create(aluno: AlunoInterface): Promise<AlunoInterface> {
    const sql = 'INSERT INTO aluno(nome) VALUES($1) RETURNING *';
    const values = [aluno.nome];

    const result = await this.db.query(sql, values);
    const [createdAluno] = result.rows;

    return {
      id: createdAluno.id,
      nome: createdAluno.nome,
    } as AlunoInterface;
  }

  async findById(id: number): Promise<AlunoInterface | undefined> {
    const sql = `
      SELECT 
        a.nome nome,
        a.id id
      FROM aluno a
      WHERE a.id = $1;
      `;
    const values = [id];

    const result = await this.db.query(sql, values);

    if (result.rowCount < 1) {
      throw new AppError('Aluno não encontrado');
    }

    const [row] = result.rows;

    const aluno = {
      id: row.id,
      nome: row.nome,
    } as AlunoInterface;

    return aluno;
  }
}
