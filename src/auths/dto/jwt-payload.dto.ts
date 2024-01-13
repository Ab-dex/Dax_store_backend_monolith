export interface JwtPayload {
  id: string;
  email: string;
}

export interface Token {
  token: string;
  expireIn: number;
  refreshToken: string;
}
