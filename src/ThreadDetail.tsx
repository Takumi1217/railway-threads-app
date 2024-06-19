// ThreadDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ThreadDetail.css";

interface Post {
  id: string;
  post: string;
}

interface Thread {
  id: string;
  post: string;
  posts: Post[];
}

const ThreadDetail: React.FC = () => {
  const { thread_id } = useParams<{ thread_id: string }>(); // URLパラメータから thread_id を取得する
  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newPostContent, setNewPostContent] = useState<string>("");
  const [posting, setPosting] = useState<boolean>(false);
  const [postError, setPostError] = useState<string | null>(null);

  const fetchThreadDetails = () => {
    fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`
    )
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
        setError(`Failed to fetch thread details: ${error.message}`);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchThreadDetails();
  }, [thread_id]);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPosting(true);
    setPostError(null);

    try {
      const response = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post: newPostContent }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setNewPostContent("");
      setPosting(false);
      fetchThreadDetails(); // 投稿後にスレッドの詳細を再取得
    } catch (error) {
      if (error instanceof Error) {
        setPostError(error.message);
      } else {
        setPostError("An unknown error occurred");
      }
      setPosting(false);
    }
  };

  if (loading) {
    return <div className="ThreadDetailContainer">Loading...</div>;
  }

  if (error) {
    return <div className="ThreadDetailContainer">Error: {error}</div>;
  }

  if (!thread) {
    return <div className="ThreadDetailContainer">Thread not found</div>;
  }

  return (
    <div className="ThreadDetailContainer">
      <div className="ThreadPosts">
        <h2>投稿一覧</h2>
        <ul>
          {thread.posts.map((post) => (
            <li key={post.id}>{post.post}</li>
          ))}
        </ul>
      </div>
      <div className="NewPostForm">
        <h2>新規投稿</h2>
        <form onSubmit={handlePostSubmit}>
          <div>
            <textarea
              className="NewPostContent"
              value={newPostContent}
              placeholder="投稿しよう！"
              onChange={(e) => setNewPostContent(e.target.value)}
              required
            />
          </div>
          <button className="PostButton" type="submit" disabled={posting}>
            {posting ? "投稿中..." : "投稿"}
          </button>
        </form>
        {postError && <p className="PostError">Error: {postError}</p>}
      </div>
    </div>
  );
};

export default ThreadDetail;
