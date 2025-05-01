import "./App.css";
import { useState } from "react";
import StartForm from "./pages/StartForm";
import ChatScreen from "./pages/ChatScreen";

interface UserData {
  name: string;
  email: string;
  app_id: string;
}

function App() {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <div className="">
      {!threadId ? (
        <StartForm setThreadId={setThreadId} setUserData={setUserData} />
      ) : (
        userData && <ChatScreen threadId={threadId} userData={userData} />
      )}
    </div>
  );
}

export default App;
