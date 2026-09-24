import React, { Suspense, useMemo, useState } from 'react';
import { Layout, Menu, Typography, theme } from 'antd';
import { loadRemoteWidget } from './loadRemote';

const { Header, Content } = Layout;

const MENU_ITEMS = [
  { key: 'remote-a', label: 'Remote A (:3001)' },
  { key: 'remote-b', label: 'Remote B (:2222)' },
];

class RemoteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography.Text type="danger">
          Remote Widget 加载失败。请确认对应 remote 已启动（A:3001 / B:2222）。
        </Typography.Text>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activeRemote, setActiveRemote] = useState('remote-a');
  const RemoteWidget = useMemo(() => loadRemoteWidget(activeRemote), [activeRemote]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', gap: 24, paddingInline: 24 }}>
        <Typography.Title level={4} style={{ color: '#fff', margin: 0, whiteSpace: 'nowrap' }}>
          MF Host
        </Typography.Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeRemote]}
          items={MENU_ITEMS}
          onClick={({ key }) => setActiveRemote(key)}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: 24 }}>
        <div
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            padding: 24,
            maxWidth: 720,
          }}
        >
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            {activeRemote === 'remote-a' ? 'Remote A' : 'Remote B'}
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            通过顶栏菜单切换独立 Module Federation 应用。
          </Typography.Paragraph>
          <RemoteErrorBoundary key={activeRemote}>
            <Suspense fallback={<Typography.Text>正在加载远程模块…</Typography.Text>}>
              <RemoteWidget />
            </Suspense>
          </RemoteErrorBoundary>
        </div>
      </Content>
    </Layout>
  );
}
