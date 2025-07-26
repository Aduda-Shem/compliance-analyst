interface Props {
  role: string;
  content: string;
}

const ChatMessage = ({ role, content }: Props) => {
  const isUser = role === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-md p-3 rounded-lg shadow ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
