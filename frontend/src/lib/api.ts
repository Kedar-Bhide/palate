import { auth } from './firebase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

console.log('API_BASE_URL configured as:', API_BASE_URL);
console.log('Environment variables:', {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NODE_ENV: process.env.NODE_ENV
});

interface ApiResponse {
  [key: string]: unknown;
}

class ApiClient {
  private async getAuthHeaders(): Promise<HeadersInit> {
    try {
      if (!auth) {
        console.warn('Firebase auth not initialized');
        return {
          'Content-Type': 'application/json',
        };
      }
      
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        return {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
      }
      
      console.warn('No authenticated user found');
      return {
        'Content-Type': 'application/json',
      };
    } catch (error) {
      console.error('Error getting auth headers:', error);
      return {
        'Content-Type': 'application/json',
      };
    }
  }

  async get(endpoint: string): Promise<ApiResponse> {
    try {
      const headers = await this.getAuthHeaders();
      console.log('Making API request to:', `${API_BASE_URL}${endpoint}`);
      console.log('Request headers:', headers);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        console.error('Full response:', response);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  async post(endpoint: string, data?: unknown): Promise<ApiResponse> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async postFormData(endpoint: string, formData: FormData): Promise<ApiResponse> {
    const headers: HeadersInit = {};
    
    if (auth) {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();