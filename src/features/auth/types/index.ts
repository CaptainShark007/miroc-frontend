export type AuthState = {
  token: string | null;
  username: string | null;
  idUser: string | null;
  rol: 'ADMIN' | 'PROFESSIONAL' | 'CUSTOMER' | 'DEVELOPER' | null;
};

export type JwtPayload = {
  sub: string;
  userId: string;
  exp: number;
  iat?: number;
  iss?: string;
  rol?: 'ADMIN' | 'PROFESSIONAL' | 'CUSTOMER' | 'DEVELOPER';
  username?: string;
};

export type AuthRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};
