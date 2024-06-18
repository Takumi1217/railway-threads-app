// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import ThreadList from "./ThreadList";
import NewThread from "./NewThread";
import ThreadDetail from "./ThreadDetail";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2>
            <Link to="">掲示板</Link>
          </h2>
          <nav>
            <Link to="/threads/new">スレッドをたてる</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ThreadList />} />
            <Route path="/threads/new" element={<NewThread />} />
            <Route path="/threads/:thread_id" element={<ThreadDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
