import { Client } from 'pg';
import { NotaInterface, ResultNotasInterface } from '../../domain/models';
import { NotasRepositoryInterface } from '../../domain/repositories';

export class NotaRepository implements NotasRepositoryInterface {
  constructor(private readonly db: Client) {}

  async create(nota: NotaInterface): Promise<NotaInterface> {
    const sql = 'INSERT INTO nota(aluno_id, valor) VALUES($1, $2) RETURNING *';
    const values = [nota.aluno.id, nota.valor];

    const result = await this.db.query(sql, values);
    const [createdNota] = result.rows;

    console.log(createdNota);

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
        	WHEN AVG(n.valor) > 4 THEN 'REPROVADO'
        	WHEN AVG(n.valor) > 4 AND  AVG(n.valor) < 6 THEN 'RECUPERAÇAO'
        	WHEN AVG(n.valor) >= 6 THEN 'APROVADO'
        end) situacao,
        array (
       		select valor from nota n2
       		where aluno_id = a.id
       	) notas
      FROM nota n
      JOIN aluno a ON a.id = n.aluno_id
     GRoUP by a.id
      `;

    const result = await this.db.query(sql);

    return result.rows;
  }

  async findById(id: number): Promise<NotaInterface | undefined> {
    const sql = `
      SELECT 
        n.id nota_id
        n.valor valor,
        a.id aluno_id,
        a.nome aluno_nome  
      FROM nota n
      JOIN aluno a ON a.id = n.aluno_id
      WHERE n.id = $1
      `;
    const values = [id];

    const result = await this.db.query(sql, values);
    const [row] = result.rows;
    const nota = {
      id: row.nota_id,
      valor: row.valor,
      aluno: {
        id: row.aluno_id,
        nome: row.aluno_nome,
      },
    } as NotaInterface;

    return nota;
  }
}
