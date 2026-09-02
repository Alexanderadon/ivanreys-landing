import fs from 'fs';
const SR=44100, DUR=0.07, N=Math.round(SR*DUR);
const buf=Buffer.alloc(44+N*2);
buf.write('RIFF',0); buf.writeUInt32LE(36+N*2,4); buf.write('WAVEfmt ',8);
buf.writeUInt32LE(16,16); buf.writeUInt16LE(1,20); buf.writeUInt16LE(1,22);
buf.writeUInt32LE(SR,24); buf.writeUInt32LE(SR*2,28); buf.writeUInt16LE(2,32); buf.writeUInt16LE(16,34);
buf.write('data',36); buf.writeUInt32LE(N*2,40);
for(let i=0;i<N;i++){ const t=i/SR;
  const s=(Math.sin(2*Math.PI*2100*t)*.5+Math.sin(2*Math.PI*3300*t)*.3)*Math.exp(-t/0.011)
        + (Math.random()*2-1)*.35*Math.exp(-t/0.0018);
  buf.writeInt16LE(Math.max(-1,Math.min(1,s))*32767*.8|0,44+i*2); }
fs.writeFileSync('click.wav',buf); console.log('click.wav',buf.length,'bytes');
