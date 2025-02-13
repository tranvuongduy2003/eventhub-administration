import { PaginationFilter, Pagination } from "@/types/common.type";
import apiService, { IApiService } from "@/lib/api-service";
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  User,
} from "@/types/user.type";

class UserService {
  private static instance: UserService;
  private apiService: IApiService;
  private readonly baseUrl = "/api/v1/users";

  private constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  public static getInstance(apiService: IApiService): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService(apiService);
    }
    return UserService.instance;
  }

  // Create a new user
  async createUser(userData: CreateUserDto): Promise<User> {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const response = await this.apiService.post<User>(this.baseUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data!;
  }

  // Get paginated users
  async getPaginatedUsers({
    searches,
    ...filter
  }: Partial<PaginationFilter>): Promise<Pagination<User>> {
    const response = await this.apiService.get<Pagination<User>>(this.baseUrl, {
      params: {
        ...filter,
        "searches[0].searchBy": searches?.[0]?.searchBy,
        "searches[0].searchValue": searches?.[0]?.searchValue,
        "searches[1].searchBy": searches?.[1]?.searchBy,
        "searches[1].searchValue": searches?.[1]?.searchValue,
        "searches[2].searchBy": searches?.[2]?.searchBy,
        "searches[2].searchValue": searches?.[2]?.searchValue,
      },
    });
    return response.data!;
  }

  // Get user by ID
  async getUserById(userId: string): Promise<User> {
    const response = await this.apiService.get<User>(
      `${this.baseUrl}/${userId}`
    );
    return response.data!;
  }

  // Update user
  async updateUser(userData: UpdateUserDto): Promise<boolean> {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const response = await this.apiService.put<boolean>(
      `${this.baseUrl}/${userData.id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data!;
  }

  // Change user roles
  async changeUserRoles(userId: string, roles: string[]): Promise<boolean> {
    const response = await this.apiService.patch<boolean>(
      `${this.baseUrl}/${userId}/roles`,
      { roles }
    );
    return response.data!;
  }

  // Change user password
  async changePassword(passwordData: UpdateUserPasswordDto): Promise<boolean> {
    const response = await this.apiService.patch<boolean>(
      `${this.baseUrl}/${passwordData.userId}/change-password`,
      passwordData
    );
    return response.data!;
  }

  // Get user followers with pagination
  async getUserFollowers(
    userId: string,
    filter: Partial<PaginationFilter>
  ): Promise<Pagination<User>> {
    const response = await this.apiService.get<Pagination<User>>(
      `${this.baseUrl}/${userId}/followers`,
      {
        params: filter,
      }
    );
    return response.data!;
  }

  // Get user following with pagination
  async getUserFollowing(
    userId: string,
    filter: Partial<PaginationFilter>
  ): Promise<Pagination<User>> {
    const response = await this.apiService.get<Pagination<User>>(
      `${this.baseUrl}/${userId}/following-users`,
      {
        params: filter,
      }
    );
    return response.data!;
  }

  // Follow a user
  async followUser(followedUserId: string): Promise<boolean> {
    const response = await this.apiService.patch<boolean>(
      `${this.baseUrl}/follow/${followedUserId}`
    );
    return response.data!;
  }

  // Unfollow a user
  async unfollowUser(followedUserId: string): Promise<boolean> {
    const response = await this.apiService.patch<boolean>(
      `${this.baseUrl}/unfollow/${followedUserId}`
    );
    return response.data!;
  }
}

const userService = UserService.getInstance(apiService);
export default userService;
