import React, { useState } from 'react';

const INITIAL = [
  { id: 1, title: '巡检任务 A', status: '进行中', updatedAt: '2026-10-13 10:00' },
  { id: 2, title: '设备点检 B', status: '已完成', updatedAt: '2026-10-12 18:20' },
  { id: 3, title: 'NFC 核对 C', status: '待开始', updatedAt: '2026-10-12 09:15' },
];

export default function TaskRecords() {
  const [tasks] = useState(INITIAL);

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>任务记录</h3>
      <p style={{ color: '#64748b', marginTop: 0 }}>
        页面与菜单定义都在 Remote A；Host 顶栏 Remote A → 任务记录 跳到本页。
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #bae6fd' }}>
            <th style={{ padding: '8px 4px' }}>ID</th>
            <th style={{ padding: '8px 4px' }}>标题</th>
            <th style={{ padding: '8px 4px' }}>状态</th>
            <th style={{ padding: '8px 4px' }}>更新时间</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} style={{ borderBottom: '1px solid #e0f2fe' }}>
              <td style={{ padding: '8px 4px' }}>{task.id}</td>
              <td style={{ padding: '8px 4px' }}>{task.title}</td>
              <td style={{ padding: '8px 4px' }}>{task.status}</td>
              <td style={{ padding: '8px 4px' }}>{task.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
