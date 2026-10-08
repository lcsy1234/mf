import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography, theme } from 'antd';
import RemotePage from './pages/RemotePage';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

const { Header, Content } = Layout;

const MENU_ITEMS = [
  { key: '/', label: 'Home' },
  { key: '/about', label: 'About' },
  { key: '/remote-a', label: 'Remote A (:3001)' },
  { key: '/remote-b', label: 'Remote B (:2222)' },
];

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
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
          selectedKeys={[location.pathname]}
          items={MENU_ITEMS}
          onClick={({ key }) => navigate(key)}
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
          <Suspense fallback={<Typography.Text>页面加载中…</Typography.Text>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/remote-a" element={<RemotePage remoteKey="remote-a" />} />
              <Route path="/remote-b" element={<RemotePage remoteKey="remote-b" />} />
            </Routes>
          </Suspense>
        </div>
      </Content>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
