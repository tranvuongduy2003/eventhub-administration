import { useAuthStore } from "@/store/auth";
import {
  RefreshTokenDto,
  SignInDto,
  SignInResponseDto,
} from "@/types/auth.type";
import apiService, { IApiService } from "../lib/api-service";
import { User } from "../types/user.type";

class AuthService {
  private static instance: AuthService;
  private apiService: IApiService;
  private readonly baseUrl = "/api/v1/auth";

  private constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  public static getInstance(apiService: IApiService): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(apiService);
    }
    return AuthService.instance;
  }

  // Sign in
  async signIn(credentials: SignInDto): Promise<SignInResponseDto> {
    const response = await this.apiService.post<SignInResponseDto>(
      `${this.baseUrl}/signin`,
      credentials
    );

    if (response.data) {
      this.setAuthTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response.data!;
  }

  // Sign out
  async signOut(): Promise<void> {
    await this.apiService.post(`${this.baseUrl}/signout`);
    this.clearAuthTokens();
  }

  // Refresh token
  async refreshToken(refreshToken: string): Promise<SignInResponseDto> {
    const response = await this.apiService.post<SignInResponseDto>(
      `${this.baseUrl}/refresh-token`,
      { refreshToken } as RefreshTokenDto
    );

    if (response.data) {
      this.setAuthTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response.data!;
  }

  // Get user profile
  async getUserProfile(): Promise<User> {
    const response = await this.apiService.get<User>(`${this.baseUrl}/profile`);
    if (response.data) {
      useAuthStore.getState().setProfile(response.data);
    }
    return response.data!;
  }

  // Helper methods for token management
  getAccessToken(): string | null {
    return useAuthStore.getState().token;
  }

  getRefreshToken(): string | null {
    return useAuthStore.getState().token;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  private setAuthTokens(accessToken: string, refreshToken: string): void {
    useAuthStore.getState().setTokens({
      accessToken,
      refreshToken,
    });
  }

  private clearAuthTokens(): void {
    useAuthStore.getState().logout();
  }
}

const authService = AuthService.getInstance(apiService);
export default authService;
