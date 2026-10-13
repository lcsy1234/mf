import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography, theme } from 'antd';
import RemotePage from './pages/RemotePage';
import { loadRemoteExport } from './loadRemote';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

const { Header, Content } = Layout;

const LOCAL_MENU_ITEMS = [
  { key: '/', label: 'Home' },
  { key: '/about', label: 'About' },
  // Remote A 菜单由 remote ./hostMenus 贡献（含子菜单）
  { key: '/remote-b', label: 'Remote B (:2222)' },
];

function getSelectedKey(pathname) {
  if (pathname.startsWith('/remote-a/templates')) return '/remote-a/templates';
  if (pathname.startsWith('/remote-a/tasks')) return '/remote-a/tasks';
  if (pathname.startsWith('/remote-a')) return '/remote-a/tasks';
  if (pathname.startsWith('/remote-b')) return '/remote-b';
  return pathname;
}

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [remoteMenus, setRemoteMenus] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    let cancelled = false;
    loadRemoteExport('remote-a', './hostMenus')
      .then((mod) => {
        if (cancelled) return;
        const items = mod?.default || mod || [];
        setRemoteMenus(Array.isArray(items) ? items : []);
      })
      .catch((err) => {
        console.warn('加载 Remote A 菜单失败（请确认 :3001 已启动）', err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const remoteAMenus =
    remoteMenus.length > 0
      ? remoteMenus
      : [{ key: '/remote-a', label: 'Remote A (:3001)' }];

  // Remote A 插在 About 与 Remote B 之间
  const menuItems = [
    ...LOCAL_MENU_ITEMS.slice(0, 2),
    ...remoteAMenus,
    ...LOCAL_MENU_ITEMS.slice(2),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', gap: 24, paddingInline: 24 }}>
        <Typography.Title level={4} style={{ color: '#fff', margin: 0, whiteSpace: 'nowrap' }}>
          MF Host
        </Typography.Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[getSelectedKey(location.pathname)]}
          items={menuItems}
          onClick={({ key }) => {
            // 父级 key 无路由时，默认进任务记录
            if (key === '/remote-a') {
              navigate('/remote-a/tasks');
              return;
            }
            navigate(key);
          }}
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
              <Route path="/remote-a/*" element={<RemotePage remoteKey="remote-a" />} />
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
