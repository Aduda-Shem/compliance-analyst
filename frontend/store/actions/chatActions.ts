import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatApiService } from '../../services/api/chatApi';
import { QueryRequest, CreateSessionRequest } from '../../types/chat';

// Fetch all sessions
export const fetchSessions = createAsyncThunk(
  'chat/fetchSessions',
  async (_, { rejectWithValue }) => {
    try {
      return await chatApiService.getSessions();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch sessions');
    }
  }
);

// Fetch a specific session
export const fetchSession = createAsyncThunk(
  'chat/fetchSession',
  async (sessionId: number, { rejectWithValue }) => {
    try {
      return await chatApiService.getSession(sessionId);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch session');
    }
  }
);

// Create a new session
export const createSession = createAsyncThunk(
  'chat/createSession',
  async (request: CreateSessionRequest, { rejectWithValue }) => {
    try {
      return await chatApiService.createSession(request);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to create session');
    }
  }
);

// Delete a session
export const deleteSession = createAsyncThunk(
  'chat/deleteSession',
  async (sessionId: number, { rejectWithValue }) => {
    try {
      await chatApiService.deleteSession(sessionId);
      return sessionId;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to delete session');
    }
  }
);

// Send a query
export const sendQuery = createAsyncThunk(
  'chat/sendQuery',
  async (request: QueryRequest, { rejectWithValue }) => {
    try {
      return await chatApiService.sendQuery(request);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to send query');
    }
  }
); 