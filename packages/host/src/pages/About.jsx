import React from 'react';
import { Typography } from 'antd';

export default function About() {
  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        About
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        Host 本地路由页面（非 Module Federation）。路径：<code>/about</code>
      </Typography.Paragraph>
      <Typography.Paragraph>
        这是第二个本地页面，用来对照 Remote A/B 的远程加载方式。
      </Typography.Paragraph>
    </>
  );
}
