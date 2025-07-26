"use client";

import { useState } from "react";
import { useChat } from "../../hooks/useChat";
import Header from "../../components/Header";
import ChatInterface from "../../components/ChatInterface";
import Sidebar from "../../components/Sidebar";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentSessionId, selectSession } = useChat();

  const handleSessionSelect = (sessionId: number | null) => {
    selectSession(sessionId);
  };

  const handleSessionCreated = (sessionId: number) => {
    selectSession(sessionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentSessionId={currentSessionId}
        onSessionSelect={handleSessionSelect}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 py-6">
            <ChatInterface
              currentSessionId={currentSessionId}
              onSessionCreated={handleSessionCreated}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
