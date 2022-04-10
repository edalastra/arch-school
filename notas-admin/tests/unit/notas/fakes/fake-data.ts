import { ResultNotasInterface } from '../../../../src/modules/notas/domain/models';

export const fakeNotasResult = (): ResultNotasInterface[] => [
  {
    aluno_id: 2,
    nome: 'José',
    media: 6.75,
    situacao: 'APROVADO',
    notas: [4, 5, 10, 8],
  },
  {
    aluno_id: 1,
    nome: 'João',
    media: 3.55,
    situacao: 'REPROVADO',
    notas: [9.05, 4, 4.5, 0.1, 0.1],
  },
];

export const generateFakeId = (): number => Math.floor(Math.random() * 100);
