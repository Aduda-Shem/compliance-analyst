import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch response based on prompt
export const fetchResponse = createAsyncThunk(
  'prompt/fetchResponse',
  async (prompt: string, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/query', { question: prompt });
      return res.data.answer;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || 'Unknown error');
    }
  }
);
