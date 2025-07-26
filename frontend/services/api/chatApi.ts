import { 
  ChatSession, 
  ChatSessionDetail, 
  QueryRequest, 
  QueryResponse, 
  CreateSessionRequest 
} from '../../types/chat';
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
const API_BASE_URL = 'http://localhost:8000/api/v1'; 

class ChatApiService {
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getSessions(): Promise<ChatSession[]> {
    console.log("triggered##########")
    return this.makeRequest<ChatSession[]>('/sessions');
  }

  async getSession(sessionId: number): Promise<ChatSessionDetail> {
    return this.makeRequest<ChatSessionDetail>(`/sessions/${sessionId}`);
  }

  async createSession(request: CreateSessionRequest): Promise<ChatSessionDetail> {
    return this.makeRequest<ChatSessionDetail>('/sessions', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async deleteSession(sessionId: number): Promise<void> {
    await this.makeRequest(`/sessions/${sessionId}`, {
      method: 'DELETE',
    });
  }

  async sendQuery(request: QueryRequest): Promise<QueryResponse> {
    return this.makeRequest<QueryResponse>('/query', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }
}

export const chatApiService = new ChatApiService(); 