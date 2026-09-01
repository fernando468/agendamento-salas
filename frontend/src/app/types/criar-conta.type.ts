export type CriarContaRequest = {
  nome: string;
  email: string;
  repitaEmail: string;
  senha: string;
  repitaSenha: string;
};

export type CriarContaResponse = {
  id: number;
  nome: string;
  email: string;
};
