import React from "react";
import { ChatMessages, ChatInput } from "../components/Chat.jsx";
import { useParams } from "react-router";

const defaultMessages = [
  {
    id: 1,
    type: "user",
    content: "Hello! Can you help me understand React Router v7?",
  },
  {
    id: 2,
    type: "bot",
    content:
      "Of course! React Router v7 is the latest version. What specific aspect would you like to learn about?",
  },
  {
    id: 3,
    type: "user",
    content: "How do nested routes work in v7?",
  },
];

export default function ChatThread() {
    const { threadId } = useParams();
  const [messages, setMessages] = React.useState(defaultMessages);

  const addMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: content,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <main className="chat-container">
     <div className="chat-thread-header">
        <h2>Conversation Thread #{threadId}</h2>
    </div>
      <ChatMessages messages={messages} />
      <ChatInput onAddMessage={addMessage} />
    </main>
  );
}