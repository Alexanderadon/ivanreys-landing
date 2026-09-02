import puppeteer from 'puppeteer-core';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import ffmpegPath from 'ffmpeg-static';
import fs from 'fs';
const CHROME='C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const FILE='file:///E:/projects/briz-landing/media/preview.html';
const LOOP_MS=22300, CLICKS=[3300,6900,10100,11900];
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',
  args:['--no-proxy-server','--allow-file-access-from-files','--mute-audio','--no-sandbox','--disable-gpu'],
  userDataDir:process.env.TEMP+'/pptr-ivanreys'});
const p=await b.newPage();
await p.setViewport({width:1040,height:780});
const rec=new PuppeteerScreenRecorder(p,{fps:30,ffmpeg_Path:ffmpegPath,videoFrame:{width:1040,height:780}});
await p.goto('about:blank');
await rec.start('video_silent.mp4');
const g0=Date.now();
await p.goto(FILE,{waitUntil:'load',timeout:60000});
const loadGap=Date.now()-g0;
await new Promise(r=>setTimeout(r,LOOP_MS+250));
await rec.stop();
await b.close();
fs.writeFileSync('clicks.json',JSON.stringify({loadGap,clicks:CLICKS.map(t=>t+loadGap)}));
console.log(JSON.stringify({loadGap,clicks:CLICKS.map(t=>t+loadGap)}));
