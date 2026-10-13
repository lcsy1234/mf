import React, { useState } from 'react';

export default function Calculator() {
  const [a, setA] = useState('1');
  const [b, setB] = useState('2');
  const [op, setOp] = useState('+');

  const x = Number(a);
  const y = Number(b);
  const valid = Number.isFinite(x) && Number.isFinite(y);

  let result = '—';
  if (valid) {
    if (op === '+') result = x + y;
    else if (op === '-') result = x - y;
    else if (op === '*') result = x * y;
    else if (op === '/') result = y === 0 ? '除数不能为 0' : x / y;
  }

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>计算器</h3>
      <p style={{ color: '#64748b', marginTop: 0 }}>Remote A 本地页面（非 Host 路由）</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={a}
          onChange={(e) => setA(e.target.value)}
          style={{ width: 88, padding: '6px 8px' }}
        />
        <select value={op} onChange={(e) => setOp(e.target.value)} style={{ padding: '6px 8px' }}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
        <input
          value={b}
          onChange={(e) => setB(e.target.value)}
          style={{ width: 88, padding: '6px 8px' }}
        />
        <span>=</span>
        <strong>{result}</strong>
      </div>
    </div>
  );
}
