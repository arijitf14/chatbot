// import { useState, FormEvent } from "react";
// import { sendMessage } from "../../api";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";

// interface Props {
//   threadId: string;
//   userData: {
//     name: string;
//     email: string;
//     app_id: string;
//   };
// }

// interface ChatEntry {
//   user: string;
//   ai: string;
// }

// function ChatScreen({ threadId, userData }: Props) {
//   const [message, setMessage] = useState("");
//   const [chatLog, setChatLog] = useState<ChatEntry[]>([]);

//   const handleSend = async (e: FormEvent) => {
//     e.preventDefault();
//     const res = await sendMessage({
//       ...userData,
//       thread_id: threadId,
//       message,
//     });
//     if (res?.system_msg) {
//       setChatLog([...chatLog, { user: message, ai: res.system_msg }]);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h2 className="text-lg font-semibold mb-4">Conversation</h2>
//       <div className="bg-white p-4 mb-4 rounded shadow max-h-80 overflow-y-auto">
//         {chatLog.map((entry, idx) => (
//           <div key={idx} className="mb-2">
//             <div>
//               <strong>You:</strong> {entry.user}
//             </div>
//             <div>
//               <strong>AI:</strong> {entry.ai}
//             </div>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSend} className="flex gap-2">
//         <Input
//           className="flex-1"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           required
//         />
//         <Button type="submit">Send</Button>
//       </form>
//     </div>
//   );
// }

// export default ChatScreen;


import { useState, FormEvent } from 'react';
import { sendMessage } from '../../api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

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
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<ChatEntry[]>([]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const {data}:any = await sendMessage({ ...userData, thread_id: threadId, message });
    if (data) {
      setChatLog([...chatLog, { user: message, ai: data.system_msg }]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="w-full bg-blue-700 flex items-center justify-center text-white p-6 text-left">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <div className="space-y-3 mb-4">
          {chatLog.map((entry, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="self-end bg-blue-100 text-black p-2 rounded-lg max-w-[75%] shadow">
                <span className="font-semibold">You:</span> {entry.user}
              </div>
              <div className="self-start bg-gray-100 text-black p-2 rounded-lg max-w-[75%] shadow">
                <span className="font-semibold">AI:</span> {entry.ai}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            className="flex-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            required
          />
          <Button type="submit">
            ➤
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ChatScreen;
