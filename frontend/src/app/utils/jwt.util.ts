export class JwtUtil {
  private static readonly TOKEN_KEY = 'auth_token';

  static saveToken(token: string): void {
    if (!token) {
      return;
    }

    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static decodeToken(token: string | null): Record<string, unknown> | null {
    if (!token) {
      return null;
    }

    const parts = token.split('.');
    if (parts.length < 2) {
      return null;
    }

    try {
      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded =
        payload.length % 4 === 0 ? payload : payload + '='.repeat(4 - (payload.length % 4));

      return JSON.parse(atob(padded)) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  static isExpired(token: string | null): boolean {
    const payload = this.decodeToken(token);
    const exp = payload?.['exp'];

    if (!payload || typeof exp !== 'number') {
      return false;
    }

    return Date.now() >= exp * 1000;
  }

  static getBearerToken(): string | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    if (this.isExpired(token)) {
      this.removeToken();
      return null;
    }

    return token;
  }
}
