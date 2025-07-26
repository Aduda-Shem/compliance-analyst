import { ChatSession, ChatSessionDetail, QueryRequest, QueryResponse } from '../../types/chat';

export interface ChatState {
  sessions: ChatSession[];
  currentSession: ChatSessionDetail | null;
  currentSessionId: number | null;
  loading: {
    sessions: boolean;
    currentSession: boolean;
    sending: boolean;
  };
  error: {
    sessions: string | null;
    currentSession: string | null;
    sending: string | null;
  };
}

export interface CreateSessionRequest {
  title: string;
} 