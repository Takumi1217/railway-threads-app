// src/ThreadList.tsx
import React, { useEffect, useState } from "react";

interface Thread {
  id: string;
  title: string;
  content: string;
}

const ThreadList: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://railway.bulletinboard.techtrain.dev/threads")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setThreads(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>新着スレッド</h2>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            <p>{thread.title}</p>
            <p>{thread.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
