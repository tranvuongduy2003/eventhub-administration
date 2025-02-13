import { PaginationFilter, Pagination } from "@/types/common.type";
import apiService, { IApiService } from "@/lib/api-service";
import { Role } from "@/types/role.type";

class RoleService {
  private static instance: RoleService;
  private apiService: IApiService;
  private readonly baseUrl = "/api/v1/roles";

  private constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  public static getInstance(apiService: IApiService): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService(apiService);
    }
    return RoleService.instance;
  }

  // Get paginated roles
  async getPaginatedRoles({
    searches,
    ...filter
  }: Partial<PaginationFilter>): Promise<Pagination<Role>> {
    const response = await this.apiService.get<Pagination<Role>>(this.baseUrl, {
      params: {
        ...filter,
        "searches[0].searchBy": searches?.[0]?.searchBy,
        "searches[0].searchValue": searches?.[0]?.searchValue,
      },
    });
    return response.data!;
  }
}

const roleService = RoleService.getInstance(apiService);
export default roleService;
