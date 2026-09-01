import { JwtUtil } from './jwt.util';

describe('JwtUtil', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve salvar e recuperar o token do armazenamento local', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidHlwZSI6ImFjY2VzcyIsImV4cCI6NDQ0MDAwMDAwMDB9.signature';

    JwtUtil.saveToken(token);

    expect(JwtUtil.getToken()).toBe(token);
  });

  it('deve indicar que o token está expirado quando a data for ultrapassada', () => {
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDAwMDAwMDB9.signature';

    expect(JwtUtil.isExpired(expiredToken)).toBeTrue();
  });
});
