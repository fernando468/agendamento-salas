export type LoginRequest = {
  email: string;
  senha: string;
};

export type LoginResponse = {
  token: string;
  tipo: string;
  email: string;
  nome: string;
};
