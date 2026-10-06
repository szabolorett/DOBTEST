import { useLoaderData } from "react-router";
import { ChatMessages, ChatInput } from "../components/Chat.jsx";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function clientLoader({ params }) {
  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  };

  // 1. The thread itself (Supabase always returns an array)
  const threadResponse = await fetch(
    `${supabaseUrl}/rest/v1/threads?id=eq.${params.threadId}&select=*`,
    { headers },
  );
  if (!threadResponse.ok) throw new Error("Could not load thread");

  const threadData = await threadResponse.json();
  const thread = threadData[0];

  if (!thread) {
    throw new Response("Thread not found", { status: 404 });
  }

  // 2. Its messages, oldest first
  const messagesResponse = await fetch(
    `${supabaseUrl}/rest/v1/messages?thread_id=eq.${params.threadId}&select=*&order=created_at.asc`,
    { headers },
  );
  if (!messagesResponse.ok) throw new Error("Could not load messages");

  const messages = await messagesResponse.json();

  return { thread, messages };
}

export default function ChatThread() {
  const { thread, messages } = useLoaderData();

  const addMessage = (content) => {
    console.log("Adding messages will be implemented later:", content);
  };

  return (
    <main className="chat-container">
      <div className="chat-thread-header">
        <h2>{thread.title}</h2>
      </div>
      <ChatMessages messages={messages} />
      <ChatInput onAddMessage={addMessage} />
    </main>
  );
}