/**
 * Hello Service
 * Business logic layer for Hello World functionality
 */

import { apiClient, type ApiResponse } from './api-client'

export interface HelloMessage {
  message: string
  timestamp: string
}

export class HelloService {
  /**
   * Get hello message from server
   */
  async getHelloMessage(): Promise<ApiResponse<HelloMessage>> {
    return apiClient.get<HelloMessage>('/hello')
  }

  /**
   * Send a custom message to the server
   */
  async sendMessage(message: string): Promise<ApiResponse<HelloMessage>> {
    return apiClient.post<HelloMessage>('/hello', { message })
  }
}

// Export singleton instance
export const helloService = new HelloService()



