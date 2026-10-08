import React, { Suspense, useMemo } from 'react';
import { Typography } from 'antd';
import { loadRemoteWidget } from '../loadRemote';
import { getRemote } from '../remotes';

class RemoteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.remoteKey !== this.props.remoteKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
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

export default function RemotePage({ remoteKey }) {
  const current = getRemote(remoteKey);
  const RemoteWidget = useMemo(() => loadRemoteWidget(remoteKey), [remoteKey]);

  return (
    <>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        {current?.title || remoteKey}
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        通过顶栏菜单动态加载 remoteEntry（无需在 webpack remotes 中写死）。
      </Typography.Paragraph>
      <RemoteErrorBoundary key={remoteKey} remoteKey={remoteKey}>
        <Suspense fallback={<Typography.Text>正在加载远程模块…</Typography.Text>}>
          <RemoteWidget />
        </Suspense>
      </RemoteErrorBoundary>
    </>
  );
}
