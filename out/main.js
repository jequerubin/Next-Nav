"use strict";var F=Object.create;var f=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,T=Object.prototype.hasOwnProperty;var j=(r,s)=>{for(var t in s)f(r,t,{get:s[t],enumerable:!0})},b=(r,s,t,o)=>{if(s&&typeof s=="object"||typeof s=="function")for(let n of C(s))!T.call(r,n)&&n!==t&&f(r,n,{get:()=>s[n],enumerable:!(o=N(s,n))||o.enumerable});return r};var l=(r,s,t)=>(t=r!=null?F(S(r)):{},b(s||!r||!r.__esModule?f(t,"default",{value:r,enumerable:!0}):t,r)),I=r=>b(f({},"__esModule",{value:!0}),r);var $={};j($,{activate:()=>W,deactivate:()=>_});module.exports=I($);var i=l(require("vscode")),M=l(require("path"));var x=l(require("fs/promises")),P=require("readline"),k=require("fs"),u=l(require("path"));async function R(r){let s=(0,P.createInterface)({input:(0,k.createReadStream)(r,{end:9999})}),t="",o=!1;for await(let a of s){if(o){a.includes("*/")&&(o=!1);continue}let e=a.indexOf("/*");if(e!==-1){o=!0;let c=a.indexOf("*/");if(c!==-1&&c>e){o=!1;let m=a.slice(0,e)+a.slice(c+2);if(m.trim()){t=m.trim();break}continue}continue}let d=a.split("//")[0].trim();if(d){t=d;break}}return s.close(),['"use client"',"'use client'","`use client`"].some(a=>t.includes(a))}async function v(r){let s=1,t=/\.(js|jsx|css|ts|tsx|sass|scss)$/,o=[{id:0,folderName:u.basename(r),parentNode:null,path:r,contents:[],render:"server"}];async function n(a,e){let d=await x.readdir(a,{withFileTypes:!0});for(let c of d){let m=u.join(a,c.name);if(c.isDirectory()){let y={id:s++,folderName:c.name,parentNode:e,path:m,contents:[],render:"server"};o.push(y),await n(m,y.id)}else t.test(c.name)&&(o[e].contents.push(c.name),await R(m)&&(o[e].render="client"))}}try{return await n(r,0),o}catch{return{}}}var w=require("fs");var E=l(require("fs/promises")),h=l(require("path")),g=l(require("vscode"));async function D(r){try{if(!g.workspace.workspaceFolders)return"";let s=g.workspace.workspaceFolders[0].uri.fsPath,t=h.isAbsolute(r)?r:h.join(s,r);return!t.startsWith(s)||!(await E.stat(t)).isDirectory()?"":t}catch{return""}}var p=null;async function O(r,s){try{let t=await v(s),o=JSON.stringify(t);r.webview.postMessage({command:"sendString",data:o})}catch(t){i.window.showErrorMessage("Error sending updated directory: "+t.message)}}function W(r){let s=i.commands.registerCommand("next-extension.next-nav",async()=>{let t=i.window.createWebviewPanel("Next.Nav","Next.Nav",i.ViewColumn.One,{enableScripts:!0,retainContextWhenHidden:!0});t.webview.onDidReceiveMessage(async o=>{switch(console.log("Received message:",o),o.command){case"submitDir":let n=await D(o.folderName);n?(p=n,i.window.showInformationMessage("Directory is now "+p),t.webview.postMessage({command:"submitDirResponse",result:!0})):(i.window.showErrorMessage("Invalid directory: "+o.folderName),t.webview.postMessage({command:"submitDirResponse",result:!1}));break;case"getRequest":p?await O(t,p):(console.error("No directory has been submitted yet."),i.window.showErrorMessage("No directory has been submitted yet."));break;case"open_file":let a=o.filePath;try{let e=await i.workspace.openTextDocument(a);await i.window.showTextDocument(e),console.log(`Switched to tab with file: ${a}`)}catch(e){i.window.showErrorMessage(`Error opening file: ${e.message}`),console.error(`Error opening file: ${e}`)}break;case"addFile":try{let e=o.filePath;await w.promises.writeFile(e,'"This is your new file!"'),t.webview.postMessage({command:"added_addFile"})}catch(e){console.error("Error creating file:",e.message),i.window.showErrorMessage("Error creating file: "+e.message)}break;case"addFolder":try{let e=o.filePath;await w.promises.mkdir(e),t.webview.postMessage({command:"added_addFolder"})}catch(e){console.error("Error creating folder:",e.message),i.window.showErrorMessage("Error creating folder: "+e.message)}break;case"deleteFile":try{let e=o.filePath,d=i.Uri.file(e);if(await w.promises.stat(e))await i.workspace.fs.delete(d,{useTrash:!0});else throw new Error("File does not exist");t.webview.postMessage({command:"added_deleteFile"})}catch(e){console.error("Error deleting file:",e.message),i.window.showErrorMessage("Error deleting file: "+e.message)}break;case"deleteFolder":try{let e=o.filePath,d=i.Uri.file(e);if(await w.promises.stat(e))await i.workspace.fs.delete(d,{recursive:!0,useTrash:!0});else throw new Error("Folder does not exist");t.webview.postMessage({command:"added_deleteFolder"})}catch(e){i.window.showErrorMessage("Error deleting folder: "+e.message)}break}},void 0,r.subscriptions);try{let o=M.join(r.extensionPath,"webview-react-app","dist","bundle.js"),n=await w.promises.readFile(o,"utf-8");t.webview.html=`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Next.Nav</title>
        </head>
        <body>
          <div id="root"></div>
          <script>
          ${n}
          </script>
        </body>
        </html>`}catch{}i.window.showInformationMessage("Welcome to Next.Nav!")});r.subscriptions.push(s)}function _(){}0&&(module.exports={activate,deactivate});