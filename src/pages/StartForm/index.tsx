import { useState, FormEvent, useEffect } from "react";
import { startConversation } from "../../api";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Loader2 } from "lucide-react";

interface Props {
  setThreadId: (id: string) => void;
  setUserData: (data: { name: string; email: string; app_id: string }) => void;
}

function StartForm({ setThreadId, setUserData }: Props) {
  const [appId, setAppId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("app_id");
    if (id) setAppId(id);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!appId) return window.location.reload();

    setLoading(true);
    try {
      const { data }: any = await startConversation({ name, email, app_id: appId });

      if (data?.thread_id) {
        setThreadId(data.thread_id);
        setUserData({ name, email, app_id: appId });
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-white">
      {/* Header */}
      <div className="w-full bg-blue-700 text-white p-6">
        <h1 className="text-2xl font-bold">Hi there 👋</h1>
        <p className="text-lg">How can we help?</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-[350px] max-w-xl mx-auto mt-6 px-4">
        <Card className="p-6 shadow rounded-xl">
          <Input
            className="mb-4"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            className="mb-4"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button className="w-full bg-blue-700" type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Starting...</span>
              </div>
            ) : (
              "Start Messaging"
            )}
          </Button>
        </Card>
      </form>

      {/* Footer */}
      <p className="text-center text-[13px] text-[#737373] py-4">
        Powered by <span className="font-semibold">FrameBot</span>
      </p>
    </div>
  );
}

export default StartForm;
