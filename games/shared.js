const USERS_KEY='tc_users',SESSION_KEY='tc_session';
const currentUser=localStorage.getItem(SESSION_KEY);
if(!currentUser){window.location.href='../login.html'}

function getUsers(){try{return JSON.parse(localStorage.getItem(USERS_KEY))||{}}catch{return{}}}
function getBalance(){const users=getUsers();return users[currentUser]?.balance||0}
function setBalance(v){const users=getUsers();if(users[currentUser]){users[currentUser].balance=v;localStorage.setItem(USERS_KEY,JSON.stringify(users))}}
function fmt(v){return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v)}
function doLogout(){localStorage.removeItem('tc_session');window.location.href='../login.html'}
function goHome(){window.location.href='../index.html'}

let audioCtx;
function beep(freq,dur,type='sine',vol=.1){
  if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
  osc.type=type;osc.frequency.setValueAtTime(freq,audioCtx.currentTime);
  gain.gain.setValueAtTime(vol,audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+dur);
  osc.connect(gain).connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+dur);
}
function playWin(big){const notes=big?[523,659,784,1047,1318]:[523,659,784];notes.forEach((f,i)=>setTimeout(()=>beep(f,.3,'triangle',.12),i*100))}
function playLose(){beep(300,.3,'sine',.05);setTimeout(()=>beep(150,.4,'sine',.05),200)}

function showToast(msg,type){const t=document.createElement('div');t.className=`toast toast-${type}`;t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2500)}
