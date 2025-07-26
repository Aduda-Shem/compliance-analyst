import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  fetchSessions, 
  fetchSession, 
  createSession, 
  deleteSession, 
  sendQuery
} from '../store/actions/chatActions';
import { 
  setCurrentSessionId,
  clearErrors 
} from '../store/reducers/chatReducer';
import { QueryRequest } from '../types/chat';

export const useChat = () => {
  const dispatch = useAppDispatch();
  const {
    sessions,
    currentSession,
    currentSessionId,
    loading,
    error
  } = useAppSelector(state => state.chat);

  // Load sessions on mount
  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  // Load current session when sessionId changes
  useEffect(() => {
    if (currentSessionId) {
      dispatch(fetchSession(currentSessionId));
    }
  }, [currentSessionId, dispatch]);

  const handleCreateSession = async (title: string) => {
    try {
      await dispatch(createSession({ title })).unwrap();
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const handleDeleteSession = async (sessionId: number) => {
    try {
      await dispatch(deleteSession(sessionId)).unwrap();
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  const handleSendQuery = async (request: QueryRequest) => {
    try {
      const result = await dispatch(sendQuery(request)).unwrap();
      // Refresh the session to get updated messages
      if (result.session_id) {
        await dispatch(fetchSession(result.session_id)).unwrap();
      }
      return result;
    } catch (error) {
      console.error('Failed to send query:', error);
      throw error;
    }
  };

  const handleSelectSession = (sessionId: number | null) => {
    dispatch(setCurrentSessionId(sessionId));
  };

  const handleClearErrors = () => {
    dispatch(clearErrors());
  };

  return {
    // State
    sessions,
    currentSession,
    currentSessionId,
    loading,
    error,
    
    // Actions
    createSession: handleCreateSession,
    deleteSession: handleDeleteSession,
    sendQuery: handleSendQuery,
    selectSession: handleSelectSession,
    clearErrors: handleClearErrors,
    
    // Computed
    hasCurrentSession: !!currentSession,
    hasSessions: sessions.length > 0,
    isSending: loading.sending,
    isSessionsLoading: loading.sessions,
    isCurrentSessionLoading: loading.currentSession,
  };
}; 