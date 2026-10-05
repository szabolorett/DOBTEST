import React from "react";
import { ChatMessages, ChatInput } from "../components/Chat.jsx";

export default function ChatNew() {
  const [messages, setMessages] = React.useState([]);

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
        <h2>Start a new conversation</h2>
      </div>
      <ChatMessages messages={messages} />
      <ChatInput onAddMessage={addMessage} />
    </main>
  );
}