## ArchShool

Este repositório contém uma solução de cadastro e busca de notas. é subdivida em duas apis:

- **notas-admin**: acessível pelo professor, onde é possível cadastrar notas para determinado aluno, atualizar as notas e listar todas as notas trazendo média e situação (APROVADO, RECUPERAÇÂO ou REPROVADO).
- **notas-aluno**: accesível pelo aluno, onde o mesmo poderá busca a suas notas passando seu id.

### Instruções
- **Iniciar containers**: `$docker-compose up -d`
- **Executar testes**:
	Entrar na pasta do serviço e executar o comando: `$npm run test`, (é necessário que o banco de dados esteja funcionando localmente).

### Tecnologias utilizadas:
- NodeJS
- Express
- Typescript
- Jest
- Docker
- Postgres
- Redis
