const { app, BrowserWindow } = require ("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

function createMainWindow ()
{
   mainWindow = new BrowserWindow (
      {
         show: true,
      });

   mainWindow.setMenu (null);
   mainWindow.loadURL (`file://${ __dirname }/index.html`);
   mainWindow.on ("closed", () => { mainWindow = null; });
   mainWindow.webContents.openDevTools ();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on ("ready", createMainWindow);

// Quit when all windows are closed.
app.on ("window-all-closed", () => { app.quit (); });

app.on ("activate", () =>
{
   if (mainWindow === null)
   {
      createMainWindow ();
   }
});
