import { useLoaderData } from "react-router";
import { ChatMessages, ChatInput } from "../components/Chat.jsx";

// Runs BEFORE the component renders
export async function clientLoader({ params }) {
  const { threadId } = params;

  // Fake network delay of 500ms
  await new Promise((resolve) => setTimeout(resolve, 500));

    return {
    threadId,
    messages: [
      {
        id: 1,
        type: "user",
        content: `Hello! This is thread ${threadId}.`,
      },
      {
        id: 2,
        type: "bot",
        content: `Hi! I'm the bot answering in thread ${threadId}.`,
      },
    ],
  };
}

export default function ChatThread() {
  // The data the loader returned
  const { threadId, messages } = useLoaderData();

  const addMessage = (content) => {
    console.log("Adding messages will be implemented later:", content);
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