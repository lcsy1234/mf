import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Widget from './Widget';

export default function App() {
  return (
    <BrowserRouter>
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 720 }}>
        <h1>Remote A 独立预览</h1>
        <p>在 :3001 单独打开；路径对应 /tasks 或 /templates。</p>
        <Routes>
          <Route path="/*" element={<Widget />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
