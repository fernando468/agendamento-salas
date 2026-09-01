export type ErroResponse = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  details: string[];
};
