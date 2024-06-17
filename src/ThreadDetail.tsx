// ThreadDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Thread {
  id: string;
  title: string;
  content: string;
}

const ThreadDetail: React.FC = () => {
  const { thread_id } = useParams(); // URL パラメータから thread_id を取得
  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setThread(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [thread_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!thread) {
    return <div>Thread not found</div>;
  }

  return (
    <div>
      <h2>{thread.title}</h2>
      <p>{thread.content}</p>
    </div>
  );
};

export default ThreadDetail;
