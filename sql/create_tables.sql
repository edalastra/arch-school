create table if not exists aluno (
	id serial primary key ,
	nome varchar(256) not null 
);

create table if not exists nota (
	id serial primary key,
	aluno_id bigint not null,
	valor float(2) not null check(valor >= 0.00 and valor <= 10.00)
);

alter table nota add constraint fk_nota_aluno foreign key (aluno_id) references aluno (id);

insert into aluno(nome) values('João do Teste');