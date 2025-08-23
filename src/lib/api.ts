// API service for Valour Boat application

export interface UserData {
  userName: string;
  userPhoto: string; // base64 encoded image
  userDetails: {
    dateOfBirth: string;
    height: number;
    weight: number;
  };
  dailyActivity: {
    sleep: number;
    water: number;
    steps: number;
    calories: number;
  };
}

export interface TransformationResult {
  success: boolean;
  data: {
    biologicalAge: number;
    currentAge: number;
    metrics: {
      energy: {
        value: number;
        change: string;
        current: string;
      };
      focus: {
        value: number;
        change: string;
        current: string;
      };
      mood: {
        value: number;
        change: string;
        current: string;
      };
      stress: {
        value: number;
        change: string;
        current: string;
      };
    };
    transformedImage: string; // base64 encoded transformed image
    originalImage: string; // base64 encoded original image
  };
  message?: string;
  error?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    // You can change this to your actual backend URL
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async processTransformation(userData: UserData): Promise<ApiResponse<TransformationResult>> {
    return this.makeRequest<TransformationResult>('/transform', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async uploadImage(imageData: string): Promise<ApiResponse<{ imageUrl: string }>> {
    return this.makeRequest<{ imageUrl: string }>('/upload-image', {
      method: 'POST',
      body: JSON.stringify({ image: imageData }),
    });
  }

  async getTransformationStatus(jobId: string): Promise<ApiResponse<{ status: string; result?: TransformationResult }>> {
    return this.makeRequest<{ status: string; result?: TransformationResult }>(`/status/${jobId}`, {
      method: 'GET',
    });
  }
}

export const apiService = new ApiService();
