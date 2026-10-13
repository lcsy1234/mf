import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TaskRecords from './pages/TaskRecords';
import Templates from './pages/Templates';

export default function Widget() {
  return (
    <div
      style={{
        padding: 16,
        background: '#f0f9ff',
        border: '1px solid #7dd3fc',
        borderRadius: 8,
      }}
    >
      <p style={{ marginTop: 0 }}>
        我是 <strong>Remote A</strong> 暴露的 <code>Widget</code>（端口 3001）。
      </p>
      <Routes>
        <Route index element={<Navigate to="tasks" replace />} />
        <Route path="tasks" element={<TaskRecords />} />
        <Route path="templates" element={<Templates />} />
        <Route path="*" element={<Navigate to="tasks" replace />} />
      </Routes>
    </div>
  );
}
