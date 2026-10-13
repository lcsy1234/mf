import React, { useState } from 'react';

const ROLES = [
  { id: 'admin', name: '管理员', permissions: ['用户查看', '用户编辑', '权限配置'] },
  { id: 'editor', name: '编辑者', permissions: ['用户查看', '用户编辑'] },
  { id: 'viewer', name: '访客', permissions: ['用户查看'] },
];

export default function Permission() {
  const [activeId, setActiveId] = useState(ROLES[0].id);
  const active = ROLES.find((role) => role.id === activeId) || ROLES[0];

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>权限管理</h3>
      <p style={{ color: '#64748b', marginTop: 0 }}>Remote A 本地页面（演示角色与权限）</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        {ROLES.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setActiveId(role.id)}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: activeId === role.id ? '1px solid #0284c7' : '1px solid #cbd5e1',
              background: activeId === role.id ? '#e0f2fe' : '#fff',
              cursor: 'pointer',
            }}
          >
            {role.name}
          </button>
        ))}
      </div>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {active.permissions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
