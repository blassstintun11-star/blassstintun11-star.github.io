/* Morse.Spy - idea original y concepto: Kevin_G, 2026 */

const MORSE={A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",
  S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..","0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----."};
// orden de Koch: se aprende a velocidad real, empezando con dos letras y sumando una cada vez
const ORDER="K M U R E S N A P T L W I J Z F O Y V G 5 Q 9 2 H 3 8 B 4 7 C 1 D 6 0 X".split(" ");
const MAX=ORDER.length, START=2, LROUND=20, PROUND=20, WROUND=10, PASS=.9, KEY="morsespy.v1";
const DASH_MS=220, GAP_MS=1100; // al mandar: más de 220 ms es raya; 1.1 s sin tocar = letra terminada
const FINAL="76a76831295b897475f33301eded2e8acf324500b3291cd140b8831fdbb37629";
const WORDS={
  es:"sol mar luz paz casa amor agua fuego cielo luna nube rio pez oso gato perro mesa libro mano ojo pie dia noche hoy tarde mundo mapa radio codigo clave secreto espia mision "+
     "rosa roca arte mate tema meta toma esta este ese mas nota ruta tren auto isla costa monte lago playa calle amigo madre padre hola adios bien mal alto rojo azul verde negro "+
     "oro plata fin norte sur oeste uno dos tres cuatro cinco seis siete ocho nueve diez tierra viento estrella mensaje antena onda señor tiempo",
  en:"sun sea sky map key code spy radio signal secret mission agent cat dog man run sit set ten net tan ant art arm ear eat tea see one two three four five six seven eight nine zero "+
     "north south east west red blue green gold black white home town city road ship boat train star moon rain snow wind fire water earth hello thanks good night day time name game "+
     "note tone stone storm smart mark mask task rest test team steam master sister letter"
};
const RANKS=[
  {n:2,name:"Samuel Morse",es_t:"Mandó el primer telegrama largo en 1844, de Washington a Baltimore.",en_t:"Sent the first long-distance telegram in 1844, from Washington to Baltimore."},
  {n:6,name:"Alfred Vail",es_t:"Ayudó a crear el código y les dio las señales más cortas a las letras más usadas.",en_t:"Helped build the code and gave the shortest signals to the most common letters."},
  {n:10,name:"SOS",es_t:"Desde 1908 es la señal internacional de auxilio: · · · − − − · · ·",en_t:"The international distress signal since 1908: · · · − − − · · ·"},
  {n:15,name:"Marconi",es_t:"Mandó la primera señal de radio a través del Atlántico en 1901: la letra S.",en_t:"Sent the first radio signal across the Atlantic in 1901: the letter S."},
  {n:20,name:"Jack Phillips",es_t:"El radiotelegrafista del Titanic. En 1912 pidió auxilio con CQD y SOS.",en_t:"The Titanic's radio operator. In 1912 he called for help with CQD and SOS."},
  {n:26,name:"Jeremiah Denton",es_t:"Prisionero de guerra en 1966, parpadeó T-O-R-T-U-R-E en Morse en una entrevista por televisión.",en_t:"A prisoner of war in 1966, he blinked T-O-R-T-U-R-E in Morse during a TV interview."},
  {n:31,name:"Radioaficionado",en:"Ham radio operator",es_t:"Durante décadas fue obligatorio saber Morse para la licencia; EE. UU. lo quitó en 2007.",en_t:"Knowing Morse was required for the license for decades; the US dropped it in 2007."},
  {n:36,name:"Maestro del telégrafo",en:"Telegraph master",es_t:"Letras y números: dominas el código completo.",en_t:"Letters and numbers: you've mastered the whole code."}
];
const T={
es:{tag:"Aprende a escuchar y mandar código Morse, una letra a la vez.",idea:"MORSE.SPY · idea original y concepto de",
  learn:"Aprender",practice:"Practicar",chart:"Tabla",count:n=>"<b>"+n+"</b> de "+MAX+" letras",
  lesson:n=>"Lección "+n,lessonOf:(a,b)=>a+" de "+b,yours:"Tus letras",isNew:"nueva",listen:"▶ Escuchar",
  introTxt:"Escúchala varias veces. No cuentes puntos y rayas: apréndete su ritmo, como una canción.",
  testT:"Prueba de la lección",testTxt:n=>n+" sonidos de tus letras. Con 90% al primer intento desbloqueas la siguiente.",start:"Empezar",
  q:(a,b)=>"Sonido "+a+" de "+b,streak:"Racha",again:"repaso",typeAsk:"¿Qué letra oíste?",wordAsk:"¿Qué palabra oíste?",replay:"▶ Repetir",
  keysHint:"Espacio = repetir · escribe la letra o tócala",right:"¡Correcto!",itWas:"Era",youSaid:x=>"Tú pusiste: "+x,willAsk:"Te la vuelvo a preguntar más adelante.",nextQ:"Siguiente →",
  passT:"¡Lección superada!",failT:"Casi",score:(a,b)=>a+" de "+b+" al primer intento.",passTxt:x=>"Ya puedes aprender la "+x+".",passAll:"Terminaste todas las letras y números.",
  failTxt:n=>"Necesitas "+n+". Escucha otra vez tus letras y repite la prueba.",learnNext:x=>"Aprender la "+x,retry:"Repetir prueba",another:"Otra ronda",missed:"Para repasar",
  passedT:"Ya superaste esta lección",doneT:"Curso completo",doneTxt:"Sabes las 26 letras y los 10 números en Morse. Sigue practicando para ganar velocidad.",
  pListen:"Escuchar",pSend:"Mandar",pWords:"Palabras",
  pListenT:"Escuchar letras",pListenTxt:"Suenan tus letras al azar. Escribe cada una.",pSendT:"Mandar letras",pSendTxt:"Te muestro una letra y tú la mandas en Morse.",
  pWordsT:"Palabras",pWordsTxt:"Escucha una palabra completa y escríbela.",wordsLocked:"Aprende unas letras más para practicar palabras.",
  sendAsk:"Manda esta letra",keyer:"MANTÉN PRESIONADO",sendHint:"Mantén Espacio o el botón: corto = punto, largo = raya. También sirven las teclas . y -",clear:"Borrar",
  sentWas:(a,b)=>"Mandaste "+a+" · era "+b,typeWord:"Escribe la palabra…",send:"Enviar",
  chartTxt:"Toca una letra para escucharla. Las que tienen candado se desbloquean en el curso.",lockedAt:n=>"Lección "+n,
  missionT:"Misión final",missionTxt:"Hay una señal escondida en la lluvia de los juegos de SPY.HQ. Mira una sola columna: dos símbolos se repiten, y una marca aparece cada vez que la señal vuelve a empezar. Cuando la descifres, escríbela aquí.",
  missionP:"La señal descifrada…",check:"Comprobar",missionNo:"Esa no es la señal. Sigue buscando.",missionOk:"¡Señal descifrada! Eres un verdadero descifrador.",decoder:"Descifrador",
  newRank:"Nuevo nivel",as:"Transmites como",nobody:"Nadie aún",nobodyT:n=>"Supera tu primera lección para igualar a "+n+".",record:"letras · tu récord",
  next:(n,d)=>"Siguiente: "+n+" a las "+d+" letras",end:"Llegaste al final.",
  cfgT:"Sonido",wpm:"Velocidad de letra",eff:"Velocidad con espacios",tone:"Tono",vol:"Volumen",test:"▶ Probar",ppm:"ppm",
  cfgTxt:"Las letras suenan rápido para que aprendas su ritmo; el espacio entre ellas te da tiempo de pensar.",
  how:"Cómo funciona",steps:["Escucha la letra nueva hasta reconocer su ritmo.","Haz la prueba: escribe lo que oyes.","Con 90% al primer intento desbloqueas la siguiente.","Practica mandar y palabras cuando quieras."],
  hist:"Historial",histNone:"Aún no hay rondas.",modes:{lesson:"Lección",listen:"Escuchar",send:"Mandar",words:"Palabras"},
  menu:"Menú",games:"Juegos de Kevin_G",here:"Estás aquí",hqSub:"Todos los juegos",piSub:"Memoriza π como una contraseña",geoSub:"Países y estados por forma y bandera",lkSub:"Reloj para concentrarte",
  prog:"Tu progreso",auto:"Se guarda solo en este navegador. Con el archivo lo pasas a otro aparato o guardas una copia.",
  saveF:"Guardar progreso en un archivo",saveSub:"Descarga un .json",loadF:"Cargar progreso",loadSub:"Desde un archivo guardado",
  reset:"Empezar desde el inicio",resetSub:"Borra tu progreso de Morse",resetQ:"¿Borrar todo tu progreso de Morse.Spy y empezar desde el inicio? No se puede deshacer.",
  loaded:"Progreso cargado.",badFile:"Ese archivo no es un progreso de Morse.Spy."},
en:{tag:"Learn to hear and send Morse code, one letter at a time.",idea:"MORSE.SPY · original idea and concept by",
  learn:"Learn",practice:"Practice",chart:"Chart",count:n=>"<b>"+n+"</b> of "+MAX+" characters",
  lesson:n=>"Lesson "+n,lessonOf:(a,b)=>a+" of "+b,yours:"Your characters",isNew:"new",listen:"▶ Listen",
  introTxt:"Listen to it several times. Don't count dots and dashes: learn its rhythm, like a song.",
  testT:"Lesson test",testTxt:n=>n+" sounds from your characters. Get 90% on the first try to unlock the next one.",start:"Start",
  q:(a,b)=>"Sound "+a+" of "+b,streak:"Streak",again:"review",typeAsk:"Which character did you hear?",wordAsk:"Which word did you hear?",replay:"▶ Replay",
  keysHint:"Space = replay · type the character or tap it",right:"Correct!",itWas:"It was",youSaid:x=>"You typed: "+x,willAsk:"I'll ask it again later.",nextQ:"Next →",
  passT:"Lesson cleared!",failT:"So close",score:(a,b)=>a+" of "+b+" on the first try.",passTxt:x=>"You can now learn "+x+".",passAll:"You finished every letter and number.",
  failTxt:n=>"You need "+n+". Listen to your characters again and retake the test.",learnNext:x=>"Learn "+x,retry:"Retake test",another:"Another round",missed:"To review",
  passedT:"You already cleared this lesson",doneT:"Course complete",doneTxt:"You know all 26 letters and 10 numbers in Morse. Keep practicing to build speed.",
  pListen:"Listen",pSend:"Send",pWords:"Words",
  pListenT:"Listen to characters",pListenTxt:"Your characters play at random. Type each one.",pSendT:"Send characters",pSendTxt:"I show you a character and you send it in Morse.",
  pWordsT:"Words",pWordsTxt:"Listen to a whole word and type it.",wordsLocked:"Learn a few more characters to practice words.",
  sendAsk:"Send this character",keyer:"PRESS AND HOLD",sendHint:"Hold Space or the button: short = dot, long = dash. The . and - keys work too.",clear:"Clear",
  sentWas:(a,b)=>"You sent "+a+" · it was "+b,typeWord:"Type the word…",send:"Send",
  chartTxt:"Tap a character to hear it. Locked ones unlock in the course.",lockedAt:n=>"Lesson "+n,
  missionT:"Final mission",missionTxt:"There's a signal hidden in the rain of the SPY.HQ games. Watch a single column: two symbols repeat, and a mark shows up every time the signal starts over. When you decode it, type it here.",
  missionP:"The decoded signal…",check:"Check",missionNo:"That's not the signal. Keep looking.",missionOk:"Signal decoded! You're a true codebreaker.",decoder:"Codebreaker",
  newRank:"New level",as:"You transmit like",nobody:"Nobody yet",nobodyT:n=>"Clear your first lesson to match "+n+".",record:"characters · your record",
  next:(n,d)=>"Next: "+n+" at "+d+" characters",end:"You reached the end.",
  cfgT:"Sound",wpm:"Character speed",eff:"Speed with spacing",tone:"Tone",vol:"Volume",test:"▶ Test",ppm:"wpm",
  cfgTxt:"Characters play fast so you learn their rhythm; the space between them gives you time to think.",
  how:"How it works",steps:["Listen to the new character until you know its rhythm.","Take the test: type what you hear.","Get 90% on the first try to unlock the next one.","Practice sending and words whenever you want."],
  hist:"History",histNone:"No rounds yet.",modes:{lesson:"Lesson",listen:"Listen",send:"Send",words:"Words"},
  menu:"Menu",games:"Kevin_G games",here:"You are here",hqSub:"All the games",piSub:"Memorize π like a password",geoSub:"Countries and states by shape and flag",lkSub:"Focus clock",
  prog:"Your progress",auto:"Saved automatically in this browser. Use the file to move it to another device or keep a backup.",
  saveF:"Save progress to a file",saveSub:"Downloads a .json",loadF:"Load progress",loadSub:"From a saved file",
  reset:"Start over",resetSub:"Erases your Morse progress",resetQ:"Erase all your Morse.Spy progress and start over? This can't be undone.",
  loaded:"Progress loaded.",badFile:"That file is not a Morse.Spy save."}
};

/* ---------- estado (se guarda solo en el navegador) ---------- */
const pad=n=>String(n).padStart(2,"0"), d0=new Date(), TODAY=d0.getFullYear()+"-"+pad(d0.getMonth()+1)+"-"+pad(d0.getDate());
const CFG0={wpm:20,eff:8,tone:650,vol:60};
const fresh=lang=>({lang,level:START,passed:0,best:0,stats:{},hist:[],cfg:{...CFG0},solved:false});
function load(){try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
// revisa lo guardado (o un archivo) antes de usarlo: solo números y letras válidas
function clean(d){
  const s=fresh(d&&d.lang==="en"?"en":"es"); if(!d||typeof d!=="object")return s;
  const int=(v,a,b,def)=>{v=Math.round(+v);return isFinite(v)?Math.max(a,Math.min(b,v)):def};
  s.level=int(d.level,START,MAX,START); s.passed=int(d.passed,0,s.level,0); s.best=int(d.best,0,MAX,0);
  for(const c in d.stats||{})if(MORSE[c]&&Array.isArray(d.stats[c]))s.stats[c]=[int(d.stats[c][0],0,1e6,0),int(d.stats[c][1],0,1e6,0)];
  s.hist=(Array.isArray(d.hist)?d.hist:[]).filter(h=>h&&/^\d{4}-\d\d-\d\d$/.test(h.d)&&T.es.modes[h.m]).slice(0,60)
    .map(h=>({d:h.d,m:h.m,ok:int(h.ok,0,999,0),n:int(h.n,0,999,0),w:!!h.w}));
  const c=d.cfg||{}; s.cfg={wpm:int(c.wpm,12,30,CFG0.wpm),eff:0,tone:int(c.tone,400,900,CFG0.tone),vol:int(c.vol,0,100,CFG0.vol)};
  s.cfg.eff=int(c.eff,4,s.cfg.wpm,Math.min(CFG0.eff,s.cfg.wpm)); s.solved=!!d.solved;
  return s;
}
let S=load(); S=S?clean(S):fresh((navigator.language||"es").slice(0,2)==="en"?"en":"es"); save();

let view="learn", sub="listen", R=null, timer=null;
const L=()=>T[S.lang], $=id=>document.getElementById(id);
const rName=r=>S.lang==="en"&&r.en?r.en:r.name, rText=r=>r[S.lang+"_t"], need=n=>Math.ceil(n*PASS-1e-9);
function rankIdx(n){let r=-1;RANKS.forEach((x,i)=>{if(n>=x.n)r=i});return r}
const letters=()=>ORDER.slice(0,S.level);
const newLetters=()=>S.level===START?ORDER.slice(0,START):[ORDER[S.level-1]];
const stat=c=>S.stats[c]||(S.stats[c]=[0,0]);
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const norm=s=>(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toUpperCase().replace(/[^A-Z0-9]/g,"");
// más probable si la has fallado o la has oído poco
function weightedPick(list){
  const w=list.map(c=>{const s=S.stats[c]||[0,0];return (1+s[1]*2)/(1+s[0]*.3)}), tot=w.reduce((a,b)=>a+b,0);
  let r=Math.random()*tot; for(let i=0;i<list.length;i++){r-=w[i];if(r<=0)return list[i]} return list[list.length-1];
}
// palabras que solo usan letras que ya sabes
function wordsAvail(){const ok=new Set(letters());return [...new Set(WORDS[S.lang].split(" ").map(norm))].filter(w=>w.length>=2&&[...w].every(c=>ok.has(c)))}
const symHTML=(p,cls)=>'<span class="pat'+(cls?" "+cls:"")+'">'+[...p].map(s=>'<i'+(s==="-"?' class="d"':'')+'></i>').join("")+'</span>';
const symText=p=>[...p].map(s=>s==="-"?"−":"·").join(" ");

/* ---------- sonido ---------- */
let AC=null, cur=null;
function ac(){if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;AC=new C()}if(AC.state==="suspended")AC.resume();return AC}
function stopAudio(){if(cur){try{cur.o.stop()}catch(e){}cur.timers.forEach(clearTimeout);cur.cleanup();cur=null}}
// toca un texto en Morse; si le pasas un patrón en pantalla, lo va iluminando
function play(text,pat,onEnd){
  stopAudio(); const a=ac(); if(!a)return;
  const c=S.cfg, u=1.2/c.wpm; let lg=3*u, wg=7*u;
  // espaciado Farnsworth: las letras a velocidad real, más tiempo entre ellas
  if(c.eff<c.wpm){const ta=(60*c.wpm-37.2*c.eff)/(c.wpm*c.eff);lg=3*ta/19;wg=7*ta/19}
  const o=a.createOscillator(), g=a.createGain(), V=c.vol/100*.35, E=.005;
  o.type="sine"; o.frequency.value=c.tone; g.gain.value=0; o.connect(g).connect(a.destination);
  const t0=a.currentTime+.06, timers=[], lit=new Set(); let t=t0;
  const wave=()=>$("wave");
  [...text.toUpperCase()].forEach((ch,ci)=>{
    if(ch===" "){t+=wg-lg;return}
    const p=MORSE[ch]; if(!p)return;
    [...p].forEach((s,si)=>{
      const d=s==="-"?3*u:u;
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(V,t+E); g.gain.setValueAtTime(V,t+d-E); g.gain.linearRampToValueAtTime(0,t+d);
      const on=(t-a.currentTime)*1000;
      timers.push(setTimeout(()=>{
        const w=wave(); if(w){w.classList.add("on");w.querySelectorAll("i").forEach(b=>{b.style.height=(8+Math.random()*20)+"px"})}
        const el=pat&&ci===0?pat.children[si]:null; if(el){el.classList.add("lit");lit.add(el)}
        timers.push(setTimeout(()=>{if(w){w.classList.remove("on");w.querySelectorAll("i").forEach(b=>{b.style.height=""})}if(el){el.classList.remove("lit");lit.delete(el)}},d*1000));
      },on));
      t+=d+u;
    });
    t+=lg-u;
  });
  o.start(t0-.03); o.stop(t+.05);
  const me={o,timers,cleanup:()=>{lit.forEach(e=>e.classList.remove("lit"));const w=wave();if(w)w.classList.remove("on")}};
  timers.push(setTimeout(()=>{if(cur===me)cur=null;if(onEnd)onEnd()},(t-a.currentTime)*1000));
  cur=me;
}
// tono mientras mantienes presionado el manipulador
let side=null;
function sideOn(){const a=ac();if(!a||side)return;const o=a.createOscillator(),g=a.createGain(),t=a.currentTime;o.frequency.value=S.cfg.tone;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(S.cfg.vol/100*.35,t+.005);o.connect(g).connect(a.destination);o.start();side={o,g}}
function sideOff(){if(!side)return;const a=ac(),t=a.currentTime;side.g.gain.cancelScheduledValues(t);side.g.gain.setValueAtTime(side.g.gain.value,t);side.g.gain.linearRampToValueAtTime(0,t+.006);side.o.stop(t+.02);side=null}

/* ---------- rondas ---------- */
function newRound(mode){
  clearTimeout(timer); timer=null; stopAudio();
  let q=[];
  if(mode==="lesson"){
    const nw=newLetters(), all=letters();
    while(q.length<LROUND){
      const c=Math.random()<.4?nw[Math.floor(Math.random()*nw.length)]:weightedPick(all);
      if(q.length>=2&&q[q.length-1]===c&&q[q.length-2]===c)continue; // nunca tres seguidas iguales
      q.push(c);
    }
  }else if(mode==="words")q=shuffle(wordsAvail()).slice(0,WROUND);
  else q=Array.from({length:PROUND},()=>weightedPick(letters()));
  R={mode,queue:q,i:0,total:q.length,miss:{},streak:0,state:"ask",ans:"",keyed:"",done:false,played:-1};
  render();
}
function judge(ans){
  if(!R||R.done||R.state!=="ask")return;
  const c=R.queue[R.i], isChar=R.mode!=="words", ok=isChar?ans===c:norm(ans)===c, first=!R.miss[c];
  R.ans=ans;
  if(ok){
    R.state="right"; R.streak++; if(isChar&&first)stat(c)[0]++;
    save(); render(); timer=setTimeout(nextQ,R.mode==="words"?1000:600);
  }else{
    R.state="reveal"; R.streak=0; if(first){R.miss[c]=1;if(isChar)stat(c)[1]++}
    R.queue.splice(Math.min(R.i+4,R.queue.length),0,c); // vuelve a salir 3 después
    save(); render(); setTimeout(()=>{if(R&&R.state==="reveal")play(c,document.querySelector(".reveal .pat"))},250);
  }
}
function nextQ(){
  clearTimeout(timer); timer=null;
  if(!R||R.done||R.state==="ask")return;
  R.i++; R.state="ask"; R.ans=""; R.keyed="";
  if(R.i>=R.queue.length){
    R.done=true;
    const ok=R.total-Object.keys(R.miss).length; R.won=ok>=need(R.total); R.unlocked=null;
    if(R.mode==="lesson"&&R.won){
      const before=rankIdx(S.best); S.passed=S.level; S.best=Math.max(S.best,S.level);
      const after=rankIdx(S.best); if(after>before)R.unlocked=after;
    }
    S.hist.unshift({d:TODAY,m:R.mode,ok,n:R.total,w:R.won}); S.hist.length=Math.min(S.hist.length,60);
    save();
  }
  render();
}
function learnNext(){if(S.passed===S.level&&S.level<MAX){S.level++;R=null;save();render();setTimeout(()=>playNew(),300)}}
function playNew(){const nl=newLetters();const pats=document.querySelectorAll(".lcard .pat");let i=0;(function go(){if(i>=nl.length)return;const k=i++;play(nl[k],pats[k],()=>setTimeout(go,350))})()}

/* mandar: corto = punto, largo = raya */
let kDown=null, gapT=null;
function keyPress(){if(!R||R.mode!=="send"||R.state!=="ask"||kDown!=null)return;clearTimeout(gapT);kDown=performance.now();sideOn();const k=$("keyer");if(k)k.classList.add("down")}
function keyRelease(){if(kDown==null)return;const d=performance.now()-kDown;kDown=null;sideOff();const k=$("keyer");if(k)k.classList.remove("down");addSym(d<DASH_MS?".":"-",false)}
function addSym(s,beep=true){
  if(!R||R.mode!=="send"||R.state!=="ask"||R.keyed.length>=6)return;
  if(beep){const u=1.2/S.cfg.wpm;sideOn();setTimeout(sideOff,(s==="-"?3*u:u)*1000)}
  R.keyed+=s; drawKeyed(); clearTimeout(gapT);
  gapT=setTimeout(()=>{if(R&&R.mode==="send"&&R.state==="ask"&&R.keyed){const c=R.queue[R.i];judge(R.keyed===MORSE[c]?c:"·"+R.keyed)}},GAP_MS);
}
function clearKeyed(){if(!R)return;clearTimeout(gapT);R.keyed="";drawKeyed()}
function drawKeyed(){const e=$("sent");if(e)e.innerHTML=R.keyed?symHTML(R.keyed,"lit-all"):""}

/* ---------- render ---------- */
function render(){
  const l=L();
  document.documentElement.lang=S.lang;
  $("tag").textContent=l.tag; $("foot").innerHTML=l.idea+" <b>Kevin_G</b>";
  [["tLearn","learn"],["tPractice","practice"],["tChart","chart"]].forEach(([id,v])=>{$(id).textContent=l[v];$(id).className=view===v?"on":""});
  $("lES").className=S.lang==="es"?"on":""; $("lEN").className=S.lang==="en"?"on":"";
  $("count").innerHTML=l.count(S.level);
  if(view==="learn")renderLearn();else if(view==="practice")renderPractice();else renderChart();
  renderSide(); renderMenu();
}
function courseHead(){
  const l=L(), nl=newLetters();
  return '<div class="course"><div class="row"><h2>'+l.lesson(S.level-1)+'</h2><span class="small">'+l.lessonOf(S.level-1,MAX-1)+'</span></div>'+
    '<div class="bar"><i style="width:'+((S.passed===S.level?S.level:S.level-1)/MAX*100)+'%"></i></div>'+
    '<div class="chips"><span class="eyebrow" style="border:0;align-self:center">'+l.yours+'</span>'+letters().map(c=>'<span'+(nl.includes(c)?' class="new"':'')+'>'+c+'</span>').join("")+'</div></div>';
}
function renderLearn(){
  const l=L();
  let h=courseHead();
  if(R&&R.mode==="lesson")h+=roundHTML();
  else if(S.passed===MAX){
    h+='<div class="result win"><div><h2>'+l.doneT+'</h2><p class="small">'+l.doneTxt+'</p></div><div class="acts"><button class="btn ghost" id="retryB">'+l.retry+'</button></div></div>'+missionHTML();
  }else{
    h+='<div class="letters">'+newLetters().map(c=>'<div class="lcard"><span class="tagnew">'+l.isNew+'</span><div class="big">'+c+'</div>'+symHTML(MORSE[c])+
      '<button class="btn ghost sm" data-play="'+c+'">'+l.listen+'</button></div>').join("")+'</div><p class="hint">'+l.introTxt+'</p>';
    if(S.passed===S.level)h+='<div class="result win"><div><h2>'+l.passedT+'</h2><p class="small">'+l.passTxt(ORDER[S.level])+'</p></div><div class="acts"><button class="btn ghost" id="retryB">'+l.retry+'</button><button class="btn" id="nextL">'+l.learnNext(ORDER[S.level])+'</button></div></div>';
    else h+='<div class="panel"><div><h2>'+l.testT+'</h2><p class="small">'+l.testTxt(LROUND)+'</p></div><button class="btn" id="startL">'+l.start+'</button></div>';
  }
  $("view").innerHTML=h; wire();
}
function renderPractice(){
  const l=L(), wa=wordsAvail().length;
  let h='<div class="subtabs">'+[["listen",l.pListen],["send",l.pSend],["words",l.pWords]].map(([m,t])=>'<button data-sub="'+m+'"'+(sub===m?' class="on"':'')+'>'+t+'</button>').join("")+'</div>';
  if(R&&R.mode===sub)h+=roundHTML();
  else if(sub==="words"&&wa<5)h+='<div class="center"><p>'+l.wordsLocked+'</p></div>';
  else{
    const tt={listen:[l.pListenT,l.pListenTxt],send:[l.pSendT,l.pSendTxt],words:[l.pWordsT,l.pWordsTxt]}[sub];
    h+='<div class="panel"><div><h2>'+tt[0]+'</h2><p class="small">'+tt[1]+'</p></div><button class="btn" id="startP">'+l.start+'</button></div>';
  }
  $("view").innerHTML=h; wire();
}
function renderChart(){
  const l=L();
  let h='<p class="hint">'+l.chartTxt+'</p><div class="chart">';
  ORDER.forEach((c,i)=>{
    h+=i<S.level?'<button class="cc" data-play="'+c+'"><b>'+c+'</b>'+symHTML(MORSE[c],"sm")+'</button>'
      :'<div class="cc lock"><b>?</b><small>🔒 '+l.lockedAt(Math.max(1,i))+'</small></div>';
  });
  $("view").innerHTML=h+'</div>'; wire();
}
function roundHTML(){
  const l=L(), c=R.queue[R.i];
  if(R.done){
    const missed=Object.keys(R.miss), ok=R.total-missed.length, lesson=R.mode==="lesson";
    let h='<div class="result '+(R.won?'win':'lose')+'"><div><h2>'+(lesson?(R.won?l.passT:l.failT):l.modes[R.mode])+'</h2><p class="small">'+l.score(ok,R.total)+' '+
      (lesson?(R.won?(S.level<MAX?l.passTxt(ORDER[S.level]):l.passAll):l.failTxt(need(R.total))):'')+'</p>'+
      (R.unlocked!=null?'<p style="margin-top:6px"><span class="eyebrow">'+l.newRank+'</span> · <b style="color:var(--ghost)">'+rName(RANKS[R.unlocked])+'</b></p>':'')+'</div><div class="acts">'+
      (lesson?'<button class="btn'+(R.won&&S.level<MAX?' ghost':'')+'" id="retryB">'+l.retry+'</button>'+(R.won&&S.level<MAX?'<button class="btn" id="nextL">'+l.learnNext(ORDER[S.level])+'</button>':'')
        :'<button class="btn" id="startP">'+l.another+'</button>')+'</div></div>';
    if(missed.length)h+='<div><span class="eyebrow">'+l.missed+'</span><div class="miss">'+missed.map(m=>'<span>'+m+(MORSE[m]?' '+symHTML(MORSE[m],"sm"):'')+'</span>').join("")+'</div></div>';
    if(lesson&&R.won&&S.level===MAX)h+=missionHTML();
    return h;
  }
  const reask=R.miss[c]&&R.queue.indexOf(c)<R.i;
  let h='<div class="qhead"><span class="eyebrow">'+l.q(R.i+1,R.queue.length)+(reask?'<span class="again">'+l.again+'</span>':'')+'</span>'+
    '<span class="streak'+(R.streak>=5?' hot':'')+'">'+l.streak+' <b>'+R.streak+'</b></span></div><div class="bar"><i style="width:'+(R.i/R.queue.length*100)+'%"></i></div><div class="stage">';
  const wave='<div class="wave" id="wave">'+'<i></i>'.repeat(14)+'</div>';
  if(R.mode==="send"){
    h+='<div class="screen"><span class="eyebrow">'+l.sendAsk+'</span><div class="big'+(R.state==="right"?" ok":"")+'">'+c+'</div><div class="sent" id="sent">'+(R.keyed?symHTML(R.keyed):'')+'</div></div>';
    if(R.state==="ask")h+='<button class="keyer" id="keyer">'+l.keyer+'</button><div class="acts"><button class="btn ghost sm" id="dotB">·</button><button class="btn ghost sm" id="dashB">−</button><button class="btn ghost sm" id="clrB">'+l.clear+'</button></div><p class="hint">'+l.sendHint+'</p>';
  }else{
    const shown=R.state==="ask"?'<div class="big q">?</div>':'<div class="big '+(R.state==="right"?"ok":"bad")+'">'+c+'</div>';
    h+='<div class="screen">'+wave+shown+(R.state!=="ask"&&R.mode!=="words"?symHTML(MORSE[c],R.state==="right"?"sm ok":"sm"):'')+'</div>';
    if(R.state==="ask"){
      h+='<p class="ask">'+(R.mode==="words"?l.wordAsk:l.typeAsk)+'</p><button class="btn ghost sm" id="replayB">'+l.replay+'</button>';
      if(R.mode==="words")h+='<form class="guess" id="wForm" autocomplete="off"><input id="wIn" type="text" spellcheck="false" autocapitalize="characters" autocomplete="off" placeholder="'+l.typeWord+'"><button class="btn">'+l.send+'</button></form>';
      else h+='<div class="keys">'+letters().map(k=>'<button data-k="'+k+'">'+k+'</button>').join("")+'</div><p class="hint">'+l.keysHint+'</p>';
    }
  }
  h+='</div>';
  if(R.state==="right")h+='<div class="fbok">'+l.right+'</div>';
  if(R.state==="reveal"){
    const was=R.mode==="send"?l.sentWas(symText(R.ans.replace("·","")),symText(MORSE[c])):l.youSaid(R.ans||"—");
    h+='<div class="reveal"><div><span class="eyebrow">'+l.itWas+'</span><h2>'+c+'</h2>'+(MORSE[c]?symHTML(MORSE[c]):'')+'<p class="small" style="margin-top:6px">'+was+' · '+l.willAsk+'</p></div><button class="btn" id="goNext">'+l.nextQ+'</button></div>';
  }
  return h;
}
function missionHTML(){
  const l=L();
  return '<div class="mission"><span class="eyebrow">✦ '+l.missionT+'</span><h2>'+(S.solved?l.decoder:l.missionT)+'</h2>'+
    (S.solved?'<p class="solved">'+l.missionOk+'</p>':'<p>'+l.missionTxt+'</p><form class="guess" id="mForm" style="margin:0;width:100%" autocomplete="off"><input id="mIn" type="text" spellcheck="false" placeholder="'+l.missionP+'" style="letter-spacing:.02em;text-transform:none;font-size:17px"><button class="btn">'+l.check+'</button></form><p class="small" id="mMsg"></p>')+'</div>';
}
async function checkMission(txt){
  const s=(txt||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]/g,"");
  let hex="";
  try{const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s));hex=[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}catch(e){}
  if(hex===FINAL){S.solved=true;save();render();play("SOS")}
  else{const m=$("mMsg");if(m){m.textContent=L().missionNo;m.style.color="#ff9aab"}const f=$("mForm");if(f){f.classList.remove("shake");void f.offsetWidth;f.classList.add("shake")}}
}
function wire(){
  const v=$("view"), on=(id,f)=>{const e=$(id);if(e)e.onclick=f};
  v.querySelectorAll("[data-play]").forEach(b=>b.onclick=()=>play(b.dataset.play,b.querySelector(".pat")||b.parentNode.querySelector(".pat")));
  v.querySelectorAll("[data-sub]").forEach(b=>b.onclick=()=>{sub=b.dataset.sub;render()});
  v.querySelectorAll(".keys [data-k]").forEach(b=>b.onclick=()=>judge(b.dataset.k));
  on("startL",()=>newRound("lesson")); on("retryB",()=>newRound("lesson")); on("nextL",learnNext);
  on("startP",()=>newRound(sub)); on("goNext",nextQ);
  on("replayB",()=>{if(R)play(R.queue[R.i])});
  on("dotB",()=>addSym(".")); on("dashB",()=>addSym("-")); on("clrB",clearKeyed);
  const k=$("keyer");
  if(k){
    k.addEventListener("pointerdown",e=>{e.preventDefault();k.setPointerCapture(e.pointerId);keyPress()});
    ["pointerup","pointercancel"].forEach(ev=>k.addEventListener(ev,keyRelease));
    k.addEventListener("contextmenu",e=>e.preventDefault());
  }
  if($("wForm")){$("wForm").onsubmit=e=>{e.preventDefault();const x=$("wIn").value;if(norm(x))judge(x)};$("wIn").focus({preventScroll:true})}
  if($("mForm"))$("mForm").onsubmit=e=>{e.preventDefault();checkMission($("mIn").value)};
  if($("goNext"))$("goNext").focus({preventScroll:true});
  // suena solo cuando aparece una pregunta nueva
  if(R&&!R.done&&R.state==="ask"&&R.mode!=="send"&&R.played!==R.i&&((view==="learn"&&R.mode==="lesson")||(view==="practice"&&R.mode===sub))){
    R.played=R.i; const c=R.queue[R.i]; setTimeout(()=>{if(R&&R.queue[R.i]===c&&R.state==="ask")play(c)},350);
  }
  if(R&&R.state==="right"&&!timer)timer=setTimeout(nextQ,600);
}

/* ---------- lateral ---------- */
function renderSide(){
  const l=L(), ri=rankIdx(S.best), nx=RANKS[ri+1], lo=ri<0?0:RANKS[ri].n, hi=nx?nx.n:MAX;
  $("rankBox").innerHTML='<span class="eyebrow">'+l.as+'</span><div class="who">'+(ri<0?l.nobody:rName(RANKS[ri]))+'</div>'+
    '<p class="small" style="margin-top:6px">'+(ri<0?l.nobodyT(rName(RANKS[0])):rText(RANKS[ri]))+'</p>'+
    '<div class="score"><b>'+S.best+'</b><span class="small">'+l.record+'</span></div>'+
    '<div class="bar" style="margin-top:12px"><i style="width:'+(nx?Math.max(3,(S.best-lo)/(hi-lo)*100):100)+'%"></i></div>'+
    '<p class="small" style="margin-top:8px">'+(nx?l.next(rName(nx),nx.n):l.end)+'</p>'+(S.solved?'<span class="badge">✦ '+l.decoder+'</span>':'');
  if(!$("cfgBox").dataset.ready||$("cfgBox").dataset.lang!==S.lang){
    const c=S.cfg, row=(id,lab,min,max,step,val,unit)=>'<label><span>'+lab+'<b id="'+id+'V">'+val+' '+unit+'</b></span><input type="range" id="'+id+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'"></label>';
    $("cfgBox").innerHTML='<span class="eyebrow">'+l.cfgT+'</span><div class="cfg">'+
      row("cWpm",l.wpm,12,30,1,c.wpm,l.ppm)+row("cEff",l.eff,4,c.wpm,1,c.eff,l.ppm)+row("cTone",l.tone,400,900,10,c.tone,"Hz")+row("cVol",l.vol,0,100,5,c.vol,"%")+
      '<p class="small">'+l.cfgTxt+'</p><button class="btn ghost sm" id="cTest">'+l.test+'</button></div>';
    $("cfgBox").dataset.ready=1; $("cfgBox").dataset.lang=S.lang;
    const bind=(id,key,unit)=>{$(id).oninput=e=>{S.cfg[key]=+e.target.value;$(id+"V").textContent=S.cfg[key]+" "+unit;
      if(key==="wpm"){$("cEff").max=S.cfg.wpm;if(S.cfg.eff>S.cfg.wpm){S.cfg.eff=S.cfg.wpm;$("cEff").value=S.cfg.eff;$("cEffV").textContent=S.cfg.eff+" "+l.ppm}}save()}};
    bind("cWpm","wpm",l.ppm); bind("cEff","eff",l.ppm); bind("cTone","tone","Hz"); bind("cVol","vol","%");
    $("cTest").onclick=()=>play("SPY");
  }
  $("howBox").innerHTML='<span class="eyebrow">'+l.how+'</span><ol class="steps">'+l.steps.map(s=>'<li>'+s+'</li>').join("")+'</ol>';
  const hs=S.hist.slice(0,6);
  $("histBox").innerHTML='<span class="eyebrow">'+l.hist+'</span>'+(hs.length?'<ul class="hist">'+hs.map(x=>
    '<li><span class="dot'+(x.w?' w':'')+'"></span><span>'+x.d.slice(5).replace("-","/")+' · '+l.modes[x.m]+'</span><b>'+x.ok+'/'+x.n+'</b></li>').join("")+'</ul>'
    :'<p class="small" style="margin-top:8px">'+l.histNone+'</p>');
}

/* ---------- menú: otros juegos y tu progreso ---------- */
const GLOBE='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4.4" ry="10"/><path d="M2 12h20M3.6 7h16.8M3.6 17h16.8"/></svg>';
function renderMenu(){
  const l=L();
  $("burger").setAttribute("aria-label",l.menu);
  $("menu").innerHTML='<span class="eyebrow">'+l.games+'</span>'+
    '<a class="mi" href="/"><span class="ico hq">HQ</span><span><b>SPY.HQ</b><small>'+l.hqSub+'</small></span></a>'+
    '<a class="mi" href="/pie-spy/"><span class="ico pi">π</span><span><b>Pie.Spy</b><small>'+l.piSub+'</small></span></a>'+
    '<a class="mi" href="/geo-spy/"><span class="ico">'+GLOBE+'</span><span><b>Geo.Spy</b><small>'+l.geoSub+'</small></span></a>'+
    '<div class="mi on"><span class="ico"><span class="mo"><i></i><i class="d"></i><i></i></span></span><span><b>Morse.Spy</b><small>'+l.here+'</small></span></div>'+
    '<a class="mi" href="/lock-spy/"><span class="ico"><svg viewBox="0 0 24 24" style="stroke-linecap:round"><circle cx="12" cy="12" r="10"/><path d="M12 6.5V12h4"/></svg></span><span><b>Lock.Spy</b><small>'+l.lkSub+'</small></span></a>'+
    '<hr><span class="eyebrow">'+l.prog+'</span><p class="small">'+l.auto+'</p>'+
    '<button class="mi" id="mSave"><span class="ico">⤓</span><span><b>'+l.saveF+'</b><small>'+l.saveSub+'</small></span></button>'+
    '<button class="mi" id="mLoad"><span class="ico">⤒</span><span><b>'+l.loadF+'</b><small>'+l.loadSub+'</small></span></button>'+
    '<button class="mi danger" id="mReset"><span class="ico">↺</span><span><b>'+l.reset+'</b><small>'+l.resetSub+'</small></span></button>';
  $("mSave").onclick=()=>{
    const blob=new Blob([JSON.stringify({game:"morse-spy",v:1,saved:new Date().toISOString(),data:S})],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="morse-spy-progreso-"+TODAY+".json";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000);
  };
  $("mLoad").onclick=()=>$("fileIn").click();
  $("mReset").onclick=()=>{if(!confirm(l.resetQ))return;stopAudio();R=null;S=fresh(S.lang);save();toggleMenu(false);$("cfgBox").dataset.ready="";render()};
}
function toggleMenu(open){$("menu").hidden=!open;$("burger").setAttribute("aria-expanded",open)}
$("fileIn").onchange=e=>{
  const f=e.target.files[0]; e.target.value=""; if(!f)return;
  f.text().then(t=>{
    let o=null; try{o=JSON.parse(t)}catch(err){}
    if(!o||o.game!=="morse-spy"||!o.data)return alert(L().badFile);
    stopAudio(); R=null; S=clean(o.data); save(); toggleMenu(false); $("cfgBox").dataset.ready=""; render(); alert(L().loaded);
  });
};

/* ---------- entrada ---------- */
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"&&!$("menu").hidden){toggleMenu(false);$("burger").focus();return}
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  const t=e.target;
  if(t.tagName==="INPUT"&&t.type!=="range")return; // escribiendo una palabra o la misión
  const active=R&&!R.done&&((view==="learn"&&R.mode==="lesson")||(view==="practice"&&R.mode===sub));
  if(!active){
    if(e.key===" "&&view==="learn"&&!(R&&R.mode==="lesson")&&S.passed<MAX&&t.tagName!=="BUTTON"){e.preventDefault();playNew()}
    return;
  }
  if(R.state!=="ask"){if(e.key==="Enter"||e.key===" "){e.preventDefault();nextQ()}return}
  if(R.mode==="send"){
    if(e.key===" "){e.preventDefault();if(!e.repeat)keyPress()}
    else if(e.key==="."){addSym(".")}
    else if(e.key==="-"){addSym("-")}
    else if(e.key==="Backspace"){e.preventDefault();clearKeyed()}
    return;
  }
  if(R.mode==="words")return;
  if(e.key===" "){e.preventDefault();play(R.queue[R.i]);return}
  if(/^[a-z0-9]$/i.test(e.key)){const k=e.key.toUpperCase();if(letters().includes(k))judge(k);else judge(k)}
});
document.addEventListener("keyup",e=>{if(e.key===" "){if(R&&R.mode==="send")keyRelease();if(e.target.tagName==="BUTTON")e.preventDefault()}});
$("burger").onclick=e=>{e.stopPropagation();toggleMenu($("menu").hidden)};
document.addEventListener("click",e=>{if(!$("menu").hidden&&!e.target.closest(".menuwrap"))toggleMenu(false)});
$("tLearn").onclick=()=>{view="learn";render()};
$("tPractice").onclick=()=>{view="practice";render()};
$("tChart").onclick=()=>{view="chart";render()};
$("lES").onclick=()=>{S.lang="es";save();render()};
$("lEN").onclick=()=>{S.lang="en";save();render()};

/* ---------- lluvia de puntos y rayas ---------- */
(function(){
  const c=$("rain"), x=c.getContext("2d"), G="··−−·−/✦KMRSEUAT", still=matchMedia("(prefers-reduced-motion: reduce)").matches;
  // semilla de la lluvia (una columna sigue su propio ritmo)
  const SEED="aGVjaG8gcG9yIGtldmluX0dvQXQgb1IgWk9OZSwgcGVhY2U=", B=[...atob(SEED)].flatMap(ch=>[...ch.charCodeAt(0).toString(2).padStart(8,"0")]);
  let cols=[], W, H, K=0, bi=0;
  function fit(){W=c.width=innerWidth;H=c.height=innerHeight;cols=Array.from({length:Math.ceil(W/26)},()=>Math.random()*H);K=Math.floor(cols.length*.38)}
  function draw(){
    x.fillStyle="rgba(11,4,20,.16)";x.fillRect(0,0,W,H);
    x.font="16px Consolas,monospace";
    cols.forEach((y,i)=>{
      x.fillStyle=Math.random()<.08?"rgba(234,217,255,.7)":"rgba(138,79,214,.45)";
      let ch=G[Math.floor(Math.random()*G.length)];
      if(i===K){ch=bi?(B[bi-1]==="1"?"−":"·"):"/";bi=(bi+1)%(B.length+1)}
      x.fillText(ch,i*26+6,y);
      cols[i]=y>H+Math.random()*400?0:y+22;
    });
  }
  fit();addEventListener("resize",fit);
  if(still){for(let i=0;i<40;i++)draw()}else setInterval(draw,90);
})();

render();
