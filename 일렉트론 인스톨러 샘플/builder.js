import { MSICreator } from 'electron-wix-msi';

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: 'E:/ELECTRON_WIN_INSTALL/dist/win-unpacked',
  description: 'bla bla bla',
  exe: 'electron_win_install',
  name: 'electron_win_install',
  manufacturer: 'hello world',
  version: '1.1.0',
  outputDirectory: 'E:/ELECTRON_WIN_INSTALL/ele_tst',
  ui : {
    chooseDirectory : true
  },
  shortcutName : 'helloInstaller'
});

// Step 2: Create a .wxs template file
msiCreator.create().then(function(){
    msiCreator.compile();
})

