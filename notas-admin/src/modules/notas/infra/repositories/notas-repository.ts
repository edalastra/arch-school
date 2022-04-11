import { Pool } from 'pg';
import { AppError } from '../../../../shared/errors';
import { NotaInterface, ResultNotasInterface } from '../../domain/models';
import { NotasRepositoryInterface } from '../../domain/repositories';

export class NotaRepository implements NotasRepositoryInterface {
  constructor(private readonly db: Pool) {}

  async create(nota: NotaInterface): Promise<NotaInterface> {
    const sql = 'INSERT INTO nota(aluno_id, valor) VALUES($1, $2) RETURNING *';
    const values = [nota.aluno.id, nota.valor];

    const result = await this.db.query(sql, values);
    const [createdNota] = result.rows;

    return {
      id: createdNota.id,
      aluno: nota.aluno,
      valor: createdNota.valor,
    };
  }

  async findAll(): Promise<ResultNotasInterface[]> {
    const sql = `
	    SELECT 
        a.id aluno_id,
        a.nome nome,
        ROUND(AVG(n.valor)::numeric ,2) media,
        (CASE 
        	WHEN AVG(n.valor) < 4 THEN 'REPROVADO'
        	WHEN AVG(n.valor) > 4 AND  AVG(n.valor) < 6 THEN 'RECUPERAÇAO'
        	WHEN AVG(n.valor) >= 6 THEN 'APROVADO'
        end) situacao,
        array (
       		select valor from nota n2
       		where aluno_id = a.id
       	) notas
      FROM nota n
      JOIN aluno a ON a.id = n.aluno_id
      GROUP by a.id
      `;

    const result = await this.db.query(sql);

    return result.rows;
  }

  async update(nota: NotaInterface): Promise<NotaInterface> {
    const sql = `UPDATE nota SET valor = $1
	    WHERE nota.id = $2 RETURNING *`;
    const values = [nota.valor, nota.aluno.id];
    await this.db.query(sql, values);

    const selectNota = await this.findById(nota.id as number);

    return {
      id: selectNota.id,
      valor: selectNota.valor,
      aluno: {
        id: selectNota.aluno.id,
        nome: nota.aluno.nome,
      },
    };
  }

  async findById(id: number): Promise<NotaInterface> {
    const sql = `
      SELECT 
            a.id aluno_id,
            a.nome aluno_nome,
            n.valor valor,
            n.id nota_id
          FROM nota n
          JOIN aluno a ON a.id = n.aluno_id
          WHERE n.id = $1
          `;

    const result = await this.db.query(sql, [id]);

    if (result.rowCount < 1) {
      throw new AppError('Nota não encontrada.');
    }

    const [row] = result.rows;

    return {
      id: row.nota_id,
      valor: row.valor,
      aluno: {
        id: row.aluno_id,
        nome: row.aluno_nome,
      },
    } as NotaInterface;
  }
}
