export interface ChatMessage {
  id: number;
  content: string;
  is_user: boolean;
  created_at: string;
}

export interface ChatSession {
  id: number;
  title: string;
  created_at: string;
  updated_at: string | null;
  message_count: number;
}

export interface ChatSessionDetail extends ChatSession {
  messages: ChatMessage[];
}

export interface QueryRequest {
  question: string;
  session_id?: number | null;
}

export interface QueryResponse {
  answer: string;
  session_id: number;
}

export interface CreateSessionRequest {
  title: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
} 