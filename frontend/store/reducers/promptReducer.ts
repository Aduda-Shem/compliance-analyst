import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchResponse } from '../actions/promptActions';
import { PromptState } from '../types/promptTypes';

const initialState: PromptState = {
  prompt: '',
  response: '',
  loading: false,
  error: null,
};

const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    setPrompt(state, action: PayloadAction<string>) {
      state.prompt = action.payload;
    },
    clearResponse(state) {
      state.response = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResponse.pending, (state) => {
        state.loading = true;
        state.response = '';
        state.error = null;
      })
      .addCase(fetchResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(fetchResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPrompt, clearResponse } = promptSlice.actions;
export default promptSlice.reducer;
