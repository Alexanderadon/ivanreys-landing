import puppeteer from 'puppeteer-core';
const CHROME='C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const FILE='file:///E:/projects/briz-landing/media/preview.html';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-proxy-server','--allow-file-access-from-files','--mute-audio','--no-sandbox','--disable-gpu'],userDataDir:process.env.TEMP+'/pptr-ivanreys'});
const p=await b.newPage();
await p.setViewport({width:1040,height:780});
const errs=[]; p.on('pageerror',e=>errs.push(String(e).slice(0,150)));
const t0=Date.now();
await p.goto(FILE,{waitUntil:'networkidle2',timeout:60000});
const phases=[[18400,'f6-stats'],[20300,'f7-cta']];
for(const [t,name] of phases){
  const wait=t-(Date.now()-t0); if(wait>0) await new Promise(r=>setTimeout(r,wait));
  await p.screenshot({path:name+'.png'});
}
console.log(JSON.stringify({errors:errs}));
await b.close();
