// interface StartConversationInput {
//     name: string;
//     email: string;
//     app_id: string;
//   }

//   interface StartConversationResponse {
//     thread_id: string;
//   }

//   export async function startConversation(data: StartConversationInput): Promise<StartConversationResponse | null> {
//     try {
//       const res = await fetch('/api/start', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       return await res.json();
//     } catch (e) {
//       console.error('Start error:', e);
//       return null;
//     }
//   }

//   interface SendMessageInput {
//     app_id: string;
//     thread_id: string;
//     message: string;
//   }

//   interface SendMessageResponse {
//     system_msg: string;
//   }

//   export async function sendMessage(data: SendMessageInput): Promise<SendMessageResponse | null> {
//     try {
//       const res = await fetch('/api/send', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       return await res.json();
//     } catch (e) {
//       console.error('Send error:', e);
//       return null;
//     }
//   }

interface StartConversationInput {
  name: string;
  email: string;
  app_id: string;
}

interface StartConversationResponse {
  thread_id: string;
}

export async function startConversation(  data: StartConversationInput): Promise<StartConversationResponse | null> {
  return new Promise(async(resolve,reject) => {
    try {
      const res = await fetch('http://localhost:5000/api/frontend/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      let rsp =  await res.json();
      resolve(rsp)
    } catch (err) {
      reject(err)
    }
  });
}

interface SendMessageInput {
  app_id: string;
  thread_id: string;
  message: string;
}

interface SendMessageResponse {
  system_msg: string;
}

export async function sendMessage(
  data: SendMessageInput
): Promise<SendMessageResponse | null> {
  return new Promise(async(resolve,reject) => {
    try {
      const res = await fetch('http://localhost:5000/api/frontend/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      let rsp =  await res.json();
      resolve(rsp)
    } catch (err) {
      reject(err)
    }
  });
}
