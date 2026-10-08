import React from 'react';
import { Typography } from 'antd';

export default function Home() {
  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        Home
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        Host 本地路由页面（非 Module Federation）。路径：<code>/</code>
      </Typography.Paragraph>
      <Typography.Paragraph>
        通过顶栏菜单或浏览器地址栏切换路由，学习 <code>react-router-dom</code> 的基本用法。
      </Typography.Paragraph>
    </>
  );
}
