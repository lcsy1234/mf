import React from 'react';
import Widget from './Widget';

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 720 }}>
      <h1>Remote B 独立预览</h1>
      <p>在 :2222 单独打开本页，可验证 Remote B 能独立运行。</p>
      <Widget />
    </main>
  );
}
