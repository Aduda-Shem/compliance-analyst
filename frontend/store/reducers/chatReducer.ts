import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState } from '../types/chatTypes';
import { 
  fetchSessions, 
  fetchSession, 
  createSession, 
  deleteSession, 
  sendQuery 
} from '../actions/chatActions';

const initialState: ChatState = {
  sessions: [],
  currentSession: null,
  currentSessionId: null,
  loading: {
    sessions: false,
    currentSession: false,
    sending: false,
  },
  error: {
    sessions: null,
    currentSession: null,
    sending: null,
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentSessionId(state, action: PayloadAction<number | null>) {
      state.currentSessionId = action.payload;
      if (!action.payload) {
        state.currentSession = null;
      }
    },
    clearErrors(state) {
      state.error = {
        sessions: null,
        currentSession: null,
        sending: null,
      };
    },
    addMessageToCurrentSession(state, action: PayloadAction<{ content: string; is_user: boolean }>) {
      if (state.currentSession) {
        const newMessage = {
          id: Date.now(),
          content: action.payload.content,
          is_user: action.payload.is_user,
          created_at: new Date().toISOString(),
        };
        state.currentSession.messages.push(newMessage);
        state.currentSession.message_count = state.currentSession.messages.length;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch sessions
    builder
      .addCase(fetchSessions.pending, (state) => {
        state.loading.sessions = true;
        state.error.sessions = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loading.sessions = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading.sessions = false;
        state.error.sessions = action.payload as string;
      });

    // Fetch session
    builder
      .addCase(fetchSession.pending, (state) => {
        state.loading.currentSession = true;
        state.error.currentSession = null;
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.loading.currentSession = false;
        state.currentSession = action.payload;
        state.currentSessionId = action.payload.id;
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.loading.currentSession = false;
        state.error.currentSession = action.payload as string;
      });

    // Create session
    builder
      .addCase(createSession.fulfilled, (state, action) => {
        state.currentSession = action.payload;
        state.currentSessionId = action.payload.id;
        // Add to sessions list if not already present
        const existingIndex = state.sessions.findIndex(s => s.id === action.payload.id);
        if (existingIndex === -1) {
          state.sessions.unshift({
            id: action.payload.id,
            title: action.payload.title,
            created_at: action.payload.created_at,
            updated_at: action.payload.updated_at,
            message_count: action.payload.message_count,
          });
        }
      });

    // Delete session
    builder
      .addCase(deleteSession.fulfilled, (state, action) => {
        const deletedSessionId = action.payload;
        state.sessions = state.sessions.filter(s => s.id !== deletedSessionId);
        if (state.currentSessionId === deletedSessionId) {
          state.currentSessionId = null;
          state.currentSession = null;
        }
      });

    // Send query
    builder
      .addCase(sendQuery.pending, (state) => {
        state.loading.sending = true;
        state.error.sending = null;
      })
      .addCase(sendQuery.fulfilled, (state, action) => {
        state.loading.sending = false;
        state.currentSessionId = action.payload.session_id;
        // Refresh current session to get updated messages
        // This will be handled by the component calling fetchSession
      })
      .addCase(sendQuery.rejected, (state, action) => {
        state.loading.sending = false;
        state.error.sending = action.payload as string;
      });
  },
});

export const { 
  setCurrentSessionId, 
  clearErrors, 
  addMessageToCurrentSession 
} = chatSlice.actions;

export default chatSlice.reducer; 