import PromptForm from "../PromptForm";
import MessageList from "./list";


const ChatWindow = () => (
  <div className="flex flex-col h-full px-4 py-6">
    <MessageList />
    <PromptForm />
  </div>
);

export default ChatWindow;
