const template = [
  {
    label: '编辑',
    submenu: [
      { role: 'undo',
        label: '<i class="fa fa-camera-retro"></i>回撤',
        accelerator: 'Ctrl+z'},
      { role: 'redo',
        label: '↷ 恢复',
        accelerator: 'Shift+z'},
      { type: 'separator' },
      { role: 'cut',
        label: '✂ 剪切',
        accelerator: 'Ctrl+x'},
      { role: 'copy',
        label: '⎘ 复制',
        accelerator: 'Ctrl+c'},
      { role: 'paste',
        label: '⎗ 粘贴',
        accelerator: 'Ctrl+v'},
      { role: 'pasteandmatchstyle' },
      { role: 'delete',
        label: '⌫ 删除'},
      { role: 'selectall',
        label: '🗊 全选',
        accelerator: 'Ctrl+a'}
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electronjs.org') }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })

  // Edit menu
  template[1].submenu.push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [
        { role: 'startspeaking' },
        { role: 'stopspeaking' }
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ]
}

module.exports.template = template;
