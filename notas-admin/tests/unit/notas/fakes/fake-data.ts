import { Response } from 'express';
import {
  NotaInterface,
  ResultNotasInterface,
} from '../../../../src/modules/notas/domain/models';

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

export const fakeNota = {
  id: 1,
  valor: 4,
  aluno: {
    id: '1',
    nome: 'jOÃO',
  },
} as unknown as NotaInterface;

export const generateFakeId = (): number => Math.floor(Math.random() * 100);

const json = (o: object, n: number) => {
  return {
    body: o,
    status: n,
  };
};

const status = (n: number) => {
  return {
    json: (o: object) => json(o, n),
  };
};

export const mockResponse = {
  status,
} as unknown as Response;
