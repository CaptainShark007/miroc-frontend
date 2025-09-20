export type AuthState = {
  token: string | null;
};

export type JwtPayload = {
  sub: string;
  userId: string;
  exp: number;
  iat?: number;
  iss?: string;
  role?: 'ADMIN' | 'PRESUPUESTISTA';
  username?: string;
  permissions?: string[];
};

export type AuthRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  status: number;
  isSuccess: boolean;
};
