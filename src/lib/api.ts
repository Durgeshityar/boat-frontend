// API service for Valour Boat application

export interface UserData {
  userName: string;
  userPhoto: string; // base64 encoded image with data URL prefix
  userDetails: {
    dateOfBirth: string; // YYYY-MM-DD format
    height: number; // cm
    weight: number; // kg
  };
  dailyActivity: {
    sleep: number; // hours
    water: number; // ml
    steps: number; // thousands
    calories: number; // kcal
  };
}

export interface TransformationJob {
  jobId: string;
  status: 'processing' | 'completed' | 'failed';
}

export interface TransformationResult {
  status: 'processing' | 'completed' | 'failed';
  result?: {
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
  error?: string;
}

export interface AccessToken {
  accessToken: string;
  expiresIn: string;
  maxRequests: number;
  message: string;
}

export interface TokenStatus {
  success: boolean;
  data: {
    token: string;
    requestsUsed: number;
    requestsLeft: number;
    maxRequests: number;
    timeLeft: string;
    expiresAt: string;
    isExpired: boolean;
    isExhausted: boolean;
  };
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseUrl: string;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;
  private requestsUsed: number = 0;
  private maxRequests: number = 5;

  constructor() {
    // You can change this to your actual backend URL
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  }

  private isTokenValid(): boolean {
    if (!this.accessToken || !this.tokenExpiry) {
      return false;
    }
    return new Date() < this.tokenExpiry && this.requestsUsed < this.maxRequests;
  }

  private async ensureValidToken(): Promise<boolean> {
    if (!this.isTokenValid()) {
      const tokenResult = await this.getAccessToken();
      if (tokenResult.success && tokenResult.data) {
        this.accessToken = tokenResult.data.accessToken;
        // Parse expiresIn (e.g., "15 minutes") to calculate expiry
        const expiresInMinutes = parseInt(tokenResult.data.expiresIn.split(' ')[0]);
        this.tokenExpiry = new Date(Date.now() + expiresInMinutes * 60 * 1000);
        this.maxRequests = tokenResult.data.maxRequests;
        this.requestsUsed = 0;
        return true;
      }
      return false;
    }
    return true;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      // Ensure we have a valid token for protected endpoints
      if (endpoint !== '/token' && !endpoint.startsWith('/token/status/')) {
        const hasValidToken = await this.ensureValidToken();
        if (!hasValidToken) {
          return {
            success: false,
            error: 'Failed to obtain authentication token',
          };
        }
      }

      const url = `${this.baseUrl}${endpoint}`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      };

      // Add access token to headers if we have one
      if (this.accessToken && endpoint !== '/token' && !endpoint.startsWith('/token/status/')) {
        headers['x-access-token'] = this.accessToken;
        this.requestsUsed++;
      }

      const response = await fetch(url, {
        headers,
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

  async getAccessToken(): Promise<ApiResponse<AccessToken>> {
    return this.makeRequest<AccessToken>('/token', {
      method: 'GET',
    });
  }

  async getTokenStatus(token: string): Promise<ApiResponse<TokenStatus>> {
    return this.makeRequest<TokenStatus>(`/token/status/${token}`, {
      method: 'GET',
    });
  }

  async startTransformation(userData: UserData): Promise<ApiResponse<TransformationJob>> {
    return this.makeRequest<TransformationJob>('/transform', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getTransformationStatus(jobId: string): Promise<ApiResponse<TransformationResult>> {
    return this.makeRequest<TransformationResult>(`/status/${jobId}`, {
      method: 'GET',
    });
  }

  async uploadImage(imageData: string): Promise<ApiResponse<{ imageUrl: string }>> {
    return this.makeRequest<{ imageUrl: string }>('/upload-image', {
      method: 'POST',
      body: JSON.stringify({ image: imageData }),
    });
  }

  // Legacy method for backward compatibility
  async processTransformation(userData: UserData): Promise<ApiResponse<TransformationResult>> {
    // Start the transformation
    const jobResponse = await this.startTransformation(userData);
    
    if (!jobResponse.success || !jobResponse.data) {
      return {
        success: false,
        error: jobResponse.error || 'Failed to start transformation',
      };
    }

    const jobId = jobResponse.data.jobId;
    
    // Poll for results
    return new Promise((resolve) => {
      const pollInterval = setInterval(async () => {
        const statusResponse = await this.getTransformationStatus(jobId);
        
        if (statusResponse.success && statusResponse.data) {
          if (statusResponse.data.status === 'completed') {
            clearInterval(pollInterval);
            resolve(statusResponse);
          } else if (statusResponse.data.status === 'failed') {
            clearInterval(pollInterval);
            resolve({
              success: false,
              error: statusResponse.data.error || 'Transformation failed',
            });
          }
          // If still processing, continue polling
        } else {
          clearInterval(pollInterval);
          resolve({
            success: false,
            error: 'Failed to check transformation status',
          });
        }
      }, 2000); // Poll every 2 seconds

      // Timeout after 5 minutes
      setTimeout(() => {
        clearInterval(pollInterval);
        resolve({
          success: false,
          error: 'Transformation timed out',
        });
      }, 5 * 60 * 1000);
    });
  }

  // Method to manually refresh token if needed
  async refreshToken(): Promise<boolean> {
    this.accessToken = null;
    this.tokenExpiry = null;
    this.requestsUsed = 0;
    return this.ensureValidToken();
  }

  // Get current token status (for debugging)
  getTokenStatusInfo(): { 
    hasToken: boolean; 
    isValid: boolean; 
    expiresAt: Date | null;
    requestsUsed: number;
    requestsLeft: number;
    maxRequests: number;
  } {
    return {
      hasToken: !!this.accessToken,
      isValid: this.isTokenValid(),
      expiresAt: this.tokenExpiry,
      requestsUsed: this.requestsUsed,
      requestsLeft: Math.max(0, this.maxRequests - this.requestsUsed),
      maxRequests: this.maxRequests,
    };
  }
}

export const apiService = new ApiService();
