export interface SignInDto {
  identity: string;
  password: string;
}

export interface SignInResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}
