// import { useState, FormEvent } from 'react';
// import { startConversation } from '../../api';
// import { Input } from '../../components/ui/input';
// import { Button } from '../../components/ui/button';

// interface Props {
//   setThreadId: (id: string) => void;
//   setUserData: (data: { name: string; email: string; app_id: string }) => void;
// }

// function StartForm({ setThreadId, setUserData }: Props) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const appId = new URLSearchParams(window.location.search).get('app_id') || '';

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const res = await startConversation({ name, email, app_id: appId });
//     if (res?.thread_id) {
//       setThreadId(res.thread_id);
//       setUserData({ name, email, app_id: appId });
//     }
//   };

//   return (
//     <form className="max-w-md mx-auto bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
//       <h2 className="text-xl font-bold mb-4">Start Conversation</h2>
//       <Input className="mb-3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//       <Input className="mb-3" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       <Button className="w-full" type="submit">Start</Button>
//     </form>
//   );
// }

// export default StartForm;


import { useState, FormEvent } from 'react';
import { startConversation } from '../../api';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

interface Props {
  setThreadId: (id: string) => void;
  setUserData: (data: { name: string; email: string; app_id: string }) => void;
}

function StartForm({ setThreadId, setUserData }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const appId = new URLSearchParams(window.location.search).get('app_id') || '';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log({ name, email, app_id: appId })
    const res = await startConversation({ name, email, app_id: appId });
    if (res?.thread_id) {
      setThreadId(res.thread_id);
      setUserData({ name, email, app_id: appId });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full bg-blue-700 text-white p-6 text-left">
        <h1 className="text-2xl font-bold">Hi there 👋</h1>
        <p className="text-lg">How can we help?</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl p-4 mt-4"
      >
        <Card className="p-4 shadow rounded-xl">
          <Input
            className="mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            className="mb-3"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button className="w-full" type="submit">
            Send us a message
          </Button>
        </Card>
      </form>
    </div>
  );
}

export default StartForm;
