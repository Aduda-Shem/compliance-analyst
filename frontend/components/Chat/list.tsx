import ChatMessage from "./chat";

const MessageList = () => {
  const messages = [
    { role: "user", content: "What documents do I need to travel?" },
    { role: "assistant", content: "You’ll need a valid passport, visa..." },
  ];

  return (
    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
};

export default MessageList;
