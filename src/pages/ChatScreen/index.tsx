import { useState, useEffect, useRef, FormEvent } from "react";
import { Typewriter } from "react-simple-typewriter";
import { sendMessage } from "../../api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Loader2 } from "lucide-react";
import loadingImage from "./../../assets/fRTGIJMmKm.gif"

interface Props {
  threadId: string;
  userData: {
    name: string;
    email: string;
    app_id: string;
  };
}

interface ChatEntry {
  user: string;
  ai: string;
}

function ChatScreen({ threadId, userData }: Props) {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<ChatEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userEntry: ChatEntry = { user: message, ai: "__LOADING__" };
    setChatLog((prev) => [...prev, userEntry]);
    setMessage("");
    setLoading(true);

    try {
      const { data }: any = await sendMessage({
        ...userData,
        thread_id: threadId,
        message,
      });

      if (data) {
        setChatLog((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            user: userEntry.user,
            ai: data.system_msg,
          };
          return updated;
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom when chatLog updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="w-full bg-blue-700 text-white p-6 text-center">
        <h1 className="text-2xl font-bold">Hi {userData.name} 👋</h1>
        <p className="text-lg">How can we help?</p>
      </div>

      {/* Chat log area */}
      <div className="flex-1 overflow-auto px-4 py-6 max-w-2xl w-full mx-auto">
        <div className="space-y-3">
          {chatLog.map((entry, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="self-end bg-blue-100 text-black p-2 rounded-lg max-w-[75%] shadow">
                {entry.user}
              </div>
              <div className="self-start text-[#fff] ">
                {/* <span className="font-semibold">{AI_NAME}</span>{" "} */}
                {entry.ai === "__LOADING__" ? (
                  <div className="flex items-center gap-2">
                    <img src={loadingImage} width={50}/>
                    {/* <Loader2 className="animate-spin w-4 h-4 text-gray-500" />
                    <span>
                      <Typewriter
                        words={["AI is typing"]}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
                    </span> */}
                  </div>
                ) : (
                  <div className="p-4 rounded-lg max-w-[75%] min-w-[75%] shadow bg-blue-700">
                    <Typewriter
                      words={[entry.ai]}                    
                      cursor
                      cursorStyle="|"
                      typeSpeed={20}
                      deleteSpeed={10}
                      delaySpeed={1000}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="w-full max-w-2xl mx-auto px-5 py-5 flex gap-2 border-t bg-blue-700"
      >
        <Input
          className="flex-1 bg-[#fff] h-[50px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          required
          disabled={loading}
        />
        <Button type="submit" className="h-[50px]" disabled={loading}>
          ➤
        </Button>
      </form>
    </div>
  );
}

export default ChatScreen;
