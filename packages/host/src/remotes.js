/** Host 可切换的 Remote 清单（改这里即可扩展，无需改 webpack remotes） */
export const REMOTES = [
  {
    key: 'remote-a',
    label: 'Remote A (:3001)',
    title: 'Remote A',
    scope: 'remoteApp',
    url: 'http://localhost:3001/remoteEntry.js',
    module: './Widget',
  },
  {
    key: 'remote-b',
    label: 'Remote B (:2222)',
    title: 'Remote B',
    scope: 'remoteB',
    url: 'http://localhost:2222/remoteEntry.js',
    module: './Widget',
  },
];

export function getRemote(key) {
  return REMOTES.find((item) => item.key === key);
}
