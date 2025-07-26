'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setPrompt } from '../../store/reducers/promptReducer';
import { fetchResponse } from '../../store/actions/promptActions';

const PromptForm = () => {
  const dispatch = useAppDispatch();
  const { prompt, loading } = useAppSelector((state) => state.prompt);
  const [input, setInput] = useState(prompt);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setPrompt(input));
    dispatch(fetchResponse(input));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
    >
      <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      <div className="p-6">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Ask about travel compliance requirements
        </label>
        <textarea
          id="prompt"
          className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What documents do I need to travel from Kenya to Ireland?"
          required
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'}`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Get Answer'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptForm;