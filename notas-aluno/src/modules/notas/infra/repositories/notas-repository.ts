import { Pool } from 'pg';
import { ResultNotasInterface } from '../../domain/models';
import { NotasRepositoryInterface } from '../../domain/repositories';

export class NotaRepository implements NotasRepositoryInterface {
  constructor(private readonly db: Pool) {}

  async findByAluno(id: number): Promise<ResultNotasInterface> {
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
      where a.id = $1
      GROUP by a.id
      `;

    const { rows } = await this.db.query(sql, [id]);

    return rows[0] as ResultNotasInterface;
  }
}
