import React, { useState } from 'react';

export default function Widget() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        padding: 16,
        background: '#f0fdf4',
        border: '1px solid #86efac',
        borderRadius: 8,
      }}
    >
      <p style={{ marginTop: 0 }}>
        我是 <strong>Remote B</strong> 暴露的 <code>Widget</code>（端口 2222）。
      </p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Remote B 点击次数：{count}
      </button>
    </div>
  );
}
