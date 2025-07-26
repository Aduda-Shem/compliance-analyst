'use client';

import { useChat } from '../../hooks/useChat';
import { ChatSession } from '../../types/chat';
import { formatRelativeDate } from '../../utils/dateUtils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentSessionId: number | null;
  onSessionSelect: (sessionId: number | null) => void;
}

const Sidebar = ({ isOpen, onClose, currentSessionId, onSessionSelect }: SidebarProps) => {
  const { sessions, isSessionsLoading, deleteSession, selectSession } = useChat();

  const handleSessionSelect = (sessionId: number) => {
    selectSession(sessionId);
    onSessionSelect(sessionId);
  };

  const handleDeleteSession = async (sessionId: number) => {
    await deleteSession(sessionId);
    if (currentSessionId === sessionId) {
      onSessionSelect(null);
    }
  };

  const handleNewChat = () => {
    selectSession(null);
    onSessionSelect(null);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden" onClick={onClose} />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:z-auto
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center ml-2 md:ml-0">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-base text-gray-800 tracking-tight">
                <span className="text-blue-600">Compliance</span> Assistant
              </span>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sessions */}
          <div className="flex-1 overflow-y-auto">
            {isSessionsLoading ? (
              <div className="p-4 text-center text-gray-400">
                <div className="animate-spin h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2 rounded-full"></div>
                <p className="text-sm">Loading sessions...</p>
              </div>
            ) : sessions.length === 0 ? (
              <div className="p-4 text-center text-gray-400 text-sm">
                <svg className="w-10 h-10 mx-auto text-gray-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p>No chat history</p>
                <p className="text-xs mt-1">Start a conversation to see it here</p>
              </div>
            ) : (
              <div className="p-2">
                {sessions.map((session: ChatSession) => (
                  <div
                    key={session.id}
                    className={`
                      group p-3 rounded-lg cursor-pointer transition-colors
                      ${currentSessionId === session.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'}
                    `}
                    onClick={() => handleSessionSelect(session.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="min-w-0">
                        <p className="text-sm text-gray-800 truncate">{session.title}</p>
                        <div className="flex gap-2 mt-0.5 text-xs text-gray-500">
                          <span>{session.message_count} msgs</span>
                          <span>&bull;</span>
                          <span>{formatRelativeDate(session.updated_at || session.created_at)}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSession(session.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleNewChat}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
            >
              New Chat
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
