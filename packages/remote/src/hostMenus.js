/**
 * Remote A 贡献给 Host 顶栏的菜单（带子菜单）。
 * Host 通过 MF 加载 ./hostMenus，合并进自己的 Menu。
 */
export default [
  {
    key: '/remote-a',
    label: 'Remote A (:3001)',
    children: [
      {
        key: '/remote-a/tasks',
        label: '任务记录',
      },
      {
        key: '/remote-a/templates',
        label: '模版',
      },
    ],
  },
];
