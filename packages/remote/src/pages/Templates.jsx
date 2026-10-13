import React, { useState } from 'react';

const INITIAL = [
  { id: 1, name: '巡检模版', category: '设备', updatedAt: '2026-10-13 09:30' },
  { id: 2, name: '点检模版', category: '维护', updatedAt: '2026-10-12 16:00' },
  { id: 3, name: 'NFC 核对模版', category: '核对', updatedAt: '2026-10-11 11:45' },
];

export default function Templates() {
  const [templates] = useState(INITIAL);

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>模版</h3>
      <p style={{ color: '#64748b', marginTop: 0 }}>
        页面与菜单定义都在 Remote A；Host 顶栏 Remote A → 模版 跳到本页。
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #bae6fd' }}>
            <th style={{ padding: '8px 4px' }}>ID</th>
            <th style={{ padding: '8px 4px' }}>名称</th>
            <th style={{ padding: '8px 4px' }}>分类</th>
            <th style={{ padding: '8px 4px' }}>更新时间</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #e0f2fe' }}>
              <td style={{ padding: '8px 4px' }}>{item.id}</td>
              <td style={{ padding: '8px 4px' }}>{item.name}</td>
              <td style={{ padding: '8px 4px' }}>{item.category}</td>
              <td style={{ padding: '8px 4px' }}>{item.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
