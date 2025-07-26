'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useChat } from '../../hooks/useChat';
import { ChatMessage } from '../../types/chat';
import { formatTime } from '../../utils/dateUtils';
import { SUGGESTED_QUERIES } from '../../constants/config';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  currentSessionId: number | null;
  onSessionCreated: (sessionId: number) => void;
}

const ChatInterface = ({ currentSessionId, onSessionCreated }: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    currentSession,
    isSending,
    isCurrentSessionLoading,
    sendQuery,
    createSession
  } = useChat();

  const messages = useMemo(() => currentSession?.messages || [], [currentSession]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isSending) return;

    const message = inputValue.trim();
    setInputValue('');

    const result = await sendQuery({ question: message, session_id: currentSessionId });

    if (!currentSessionId && result?.session_id) {
      onSessionCreated(result.session_id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[75vh] scroll-smooth scrollbar-hide">
        {messages.length === 0 && !isSending && !isCurrentSessionLoading && (
          <div className="text-center py-12 text-gray-700">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Welcome to Compliance Assistant</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Ask about compliance, regulations, or legal requirements for your business.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SUGGESTED_QUERIES.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInputValue(q)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {isCurrentSessionLoading && (
          <div className="text-center py-4 text-gray-200">
            <div className="animate-spin rounded-full h-6 w-4 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2">Loading conversation...</p>
          </div>
        )}

        {messages?.filter(Boolean).map((msg, index) => (
          <div key={msg?.id ?? index} className={`flex ${msg.is_user ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`
                max-w-[80%] px-4 py-3 rounded-2xl
                ${msg.is_user ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}
              `}
            >
              <ReactMarkdown>
                {msg.content || ''}
              </ReactMarkdown>
              <div className={`text-xs mt-2 ${msg.is_user ? 'text-blue-100' : 'text-gray-500'}`}>
                {msg.created_at ? formatTime(msg.created_at) : ''}
              </div>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
                <span className="text-sm">Crafting...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-4">
          <textarea
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about compliance, regulations, or legal requirements..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            disabled={isSending}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isSending}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
