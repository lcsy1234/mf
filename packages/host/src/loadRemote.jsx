import React from 'react';

const loaders = {
  'remote-a': () => import('remoteApp/Widget'),
  'remote-b': () => import('remoteB/Widget'),
};

export function loadRemoteWidget(key) {
  const loader = loaders[key];
  if (!loader) {
    throw new Error(`未知 remote: ${key}`);
  }
  return React.lazy(loader);
}
