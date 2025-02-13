import apiService, { IApiService } from "@/lib/api-service";
import { FunctionType } from "@/types/function.type";

class FunctionService {
  private static instance: FunctionService;
  private apiService: IApiService;
  private readonly baseUrl = "/api/v1/functions";

  private constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  public static getInstance(apiService: IApiService): FunctionService {
    if (!FunctionService.instance) {
      FunctionService.instance = new FunctionService(apiService);
    }
    return FunctionService.instance;
  }

  // Get paginated functions
  async getFunctions(): Promise<FunctionType[]> {
    const response = await this.apiService.get<FunctionType[]>(this.baseUrl);
    return response.data!;
  }

  async getFunctionsByRoleId(roleId: string): Promise<FunctionType[]> {
    const response = await this.apiService.get<FunctionType[]>(
      `${this.baseUrl}/get-by-role/${roleId}`
    );
    return response.data!;
  }
}

const functionService = FunctionService.getInstance(apiService);
export default functionService;
