import React from 'react';
import { getRemote } from './remotes';

const scriptCache = new Map();
const containerInitCache = new Map();

function loadRemoteEntry(url, scope) {
  // 如果全局容器已存在，则直接返回
  if (window[scope]) {
    return Promise.resolve();
  }
  // 如果缓存中存在，则直接返回
  if (scriptCache.has(url)) {
    return scriptCache.get(url);
  }
  // 创建一个 Promise 对象
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      if (!window[scope]) {
        reject(new Error(`remoteEntry 已加载，但未找到全局容器 window.${scope}`));
        return;
      }
      resolve();
    };
    script.onerror = () => {
      scriptCache.delete(url);
      reject(new Error(`加载 remoteEntry 失败: ${url}`));
    };
    document.head.appendChild(script);// 将 script 标签添加到 head 标签中
  });

  scriptCache.set(url, promise);
  return promise;
}

async function initRemoteContainer(scope) {
  if (containerInitCache.has(scope)) {
    return containerInitCache.get(scope);
  }

  const promise = (async () => {
    // eslint-disable-next-line no-undef
    await __webpack_init_sharing__('default');
    const container = window[scope];
    // eslint-disable-next-line no-undef
    await container.init(__webpack_share_scopes__.default);
    return container;
  })();

  containerInitCache.set(scope, promise);
  return promise;
}

async function loadRemoteModule({ url, scope, module }) {
  await loadRemoteEntry(url, scope);// 加载远程入口文件
  const container = await initRemoteContainer(scope);// 初始化远程容器
  const factory = await container.get(module);// 获取远程模块
  return factory();// 返回远程模块
}

export function loadRemoteWidget(key) {
  const remote = getRemote(key);
  if (!remote) {
    throw new Error(`未知 remote: ${key}`);
  }
// 动态加载远程模块
  return React.lazy(() =>
    loadRemoteModule(remote).then((mod) => ({
      default: mod.default || mod,
    })),
  );
}
