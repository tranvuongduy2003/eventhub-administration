import { useAuthStore } from "@/store/auth";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Interface matching the C# ApiResponse structure
export interface ApiResponse<T = unknown> {
  statusCode: number;
  message?: string;
  data?: T;
  errors?: string[];
}

// Custom error class for API errors
export class ApiError extends Error {
  statusCode: number;
  errors?: string[];

  constructor(response: ApiResponse) {
    super(response.message || "An unknown error occurred");
    this.name = "ApiError";
    this.statusCode = response.statusCode;
    this.errors = response.errors;
  }
}

// API Service interface
export interface IApiService {
  get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
  post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
  put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
  patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
  delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
}

// API Service class
class ApiService implements IApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  // Setup request and response interceptors
  private setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add authentication token if exists
        const token = this.getAuthToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Normalize response to match ApiResponse structure
        response.data = {
          statusCode: response.status,
          message:
            response.data?.message || this.getDefaultMessage(response.status),
          data: response.data?.data || response.data,
        };
        return response;
      },
      (error) => {
        // Handle network errors and API errors
        if (error.response) {
          // The request was made and the server responded with a status code
          const apiError: ApiResponse = {
            statusCode: error.response.status,
            message:
              error.response.data?.message ||
              this.getDefaultMessage(error.response.status),
            data: error.response.data?.data,
            errors: error.response.data?.errors,
          };
          return Promise.reject(new ApiError(apiError));
        } else if (error.request) {
          // The request was made but no response was received
          return Promise.reject(
            new ApiError({
              statusCode: 0,
              message: "No response received from server",
            })
          );
        } else {
          // Something happened in setting up the request
          return Promise.reject(
            new ApiError({
              statusCode: 0,
              message: "Error setting up the request",
            })
          );
        }
      }
    );
  }

  // Get default message based on status code
  private getDefaultMessage(statusCode: number): string {
    switch (statusCode) {
      case 200:
        return "Success";
      case 201:
        return "Created";
      case 400:
        return "Bad request";
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Resource not found";
      case 500:
        return "An unhandled error occurred";
      default:
        return "An unknown error occurred";
    }
  }

  // Utility method to get auth token from auth store
  private getAuthToken(): string | null {
    return useAuthStore.getState().token;
  }

  // Generic GET method
  async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  // Generic POST method
  async post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  // Generic PUT method
  async put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  // Generic PATCH method
  async patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.patch<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  // Generic DELETE method
  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(
      url,
      config
    );
    return response.data;
  }
}

const apiService = new ApiService();
export default apiService;
