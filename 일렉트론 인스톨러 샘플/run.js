/*
#1번
const electronInstaller = require('electron-winstaller');
try {
    electronInstaller.createWindowsInstaller({
      appDirectory: 'E:/ELECTRON_WIN_INSTALL/dist/win-unpacked',
      outputDirectory: 'E:/ELECTRON_WIN_INSTALL/ele_tst',
      authors: 'My App Inc.',
      exe: 'electron_win_install.exe',
      version : "1.0.1",
      title : "WTF SrokInc",
      name : 'name',
      description : `
        first win installer 1!
        first win installer 2!
        first win installer 3!
      `
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
*/


/*
#2번
const installer = require('electron-installer-windows')
 
const options = {
  src: 'E:/ELECTRON_WIN_INSTALL/dist/win-unpacked',
  dest: 'E:/ELECTRON_WIN_INSTALL/ele_tst',
  name : "myName",
  description : "bla bla bla",
  version : "1.0.0",
  authors: ["RTS"]
}
 
async function main (options) {
  console.log('Creating package (this may take a while)')
  try {
    await installer(options)
    console.log(`Successfully created package at ${options.dest}`)
  } catch (err) {
    console.error(err, err.stack)
    process.exit(1)
  }
}
main(options)

*/

