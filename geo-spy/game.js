/* Geo.Spy - idea original y concepto: Kevin_G, 2026 */

const SETS={
  world:{items:WORLD,order:WORLD_ORDER,alias:WORLD_ALIAS,points:WORLD_POINTS,ranks:WORLD_RANKS,start:10,
    label:{es:"Mundo",en:"World"},unit:{es:"países",en:"countries"},ask:{es:"¿Qué país es?",en:"Which country is this?"},
    regions:["am","eu","as","af","oc"],topo:"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json",vb:[1000,520]},
  us:{items:STATES,order:STATES_ORDER,alias:STATES_ALIAS,points:{},ranks:STATES_RANKS,start:8,
    label:{es:"EE. UU.",en:"USA"},unit:{es:"estados",en:"states"},ask:{es:"¿Qué estado es?",en:"Which state is this?"},
    regions:["ne","mw","so","we"],topo:"https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json",vb:[975,610]}
};
const STEP=5, ROUND=15, SROUND=20, TRIES=3, PASS=.8, KEY="geospy.v2", OLDKEY="geospy.v1";
const pad=n=>String(n).padStart(2,"0"), d0=new Date(), TODAY=d0.getFullYear()+"-"+pad(d0.getMonth()+1)+"-"+pad(d0.getDate());
const FLAG=(c,w)=>"https://flagcdn.com/w"+w+"/"+c+".png";
const REDUCED=matchMedia("(prefers-reduced-motion: reduce)").matches;

const T={
es:{tag:{world:"Aprende los países del mundo por su forma y su bandera.",us:"Aprende los 50 estados de EE. UU. por su forma y su bandera."},
  idea:"GEO.SPY · idea original y concepto de",menu:"Menú",games:"Juegos de Kevin_G",here:"Estás aquí",piSub:"Memoriza π como una contraseña",hqSub:"Todos los juegos",moSub:"Aprende código Morse",lkSub:"Reloj para concentrarte",
  prog:"Tu progreso",auto:"Se guarda solo en este navegador. Con el archivo lo pasas a otro aparato o guardas una copia.",
  saveF:"Guardar progreso en un archivo",saveSub:"Descarga un .json",loadF:"Cargar progreso",loadSub:"Desde un archivo guardado",
  reset:"Empezar desde el inicio",resetSub:n=>"Borra tu progreso de "+n,resetQ:n=>"¿Borrar todo tu progreso de "+n+" y empezar desde el inicio? No se puede deshacer.",
  loaded:"Progreso cargado.",badFile:"Ese archivo no es un progreso de Geo.Spy.",
  play:"Jugar",study:"Estudiar",inPlay:u=>u+" en Jugar",pending:n=>"+"+n+" nuevos entran mañana",
  loading:"Cargando mapa…",loadErr:"No se pudo cargar el mapa. Revisa tu conexión a internet.",zoomOut:"Ver todo",
  startT:(n,u)=>n+" "+u+" para nombrar",startTxt:"El mapa te lleva a cada uno con su bandera adentro. Escribe su nombre.",start:"Empezar",
  q:(a,b)=>"Pregunta "+a+" de "+b,streak:"Racha",again:"repaso",typeP:"Escribe el nombre…",send:"Enviar",hint:"Pista",idk:"No sé",
  right:"¡Correcto!",near:"Casi perfecto. Se escribe:",wrongTry:n=>"No es ese. Te queda"+(n>1?"n ":" ")+n+" intento"+(n>1?"s":"")+".",
  itWas:"Era",willAsk:"Te lo vuelvo a preguntar más adelante en esta ronda.",nextQ:"Siguiente →",
  winT:"¡Ronda superada!",loseT:"Casi",score:(a,b)=>a+" de "+b+" al primer intento.",winTxt:"Tu récord sube. Si te sientes seguro, aprende más.",winAll:"Ya los tienes todos.",
  loseTxt:n=>"Necesitas "+n+" al primer intento. Repasa en Estudiar y vuelve a intentarlo.",missed:"Para repasar",
  more:n=>"Estoy seguro: aprender "+n+" más",retry:"Otra ronda",goStudy:"Ir a estudiar",
  newT:"Tus nuevos",newTxt:"Míralos y apréndete el nombre. Ya están en Estudiar; en Jugar entran a partir de mañana.",toStudy:"Estudiarlos ahora",toMap:"Volver al mapa",
  quiz:"Quiz",cards:"Tarjetas",sStartT:(n,u)=>"Quiz de "+n+" "+u,sStartTxt:"Para practicar: eliges entre varias opciones. No cambia tu récord.",
  sDoneT:"¡Repaso terminado!",keys:n=>"Teclas 1–"+n+" para responder · Enter para seguir",
  newRank:"Nuevo nivel",as:"Exploras como",nobody:"Nadie aún",nobodyT:n=>"Supera tu primera ronda en Jugar para igualar a "+n+".",record:u=>u+" · tu récord",
  next:(n,d,u)=>"Siguiente: "+n+" a los "+d+" "+u,end:"Llegaste al final.",
  how:"Cómo funciona",steps:["Jugar: el mapa te lleva a cada uno y escribes su nombre.","Estudiar: quiz de opciones y tarjetas para practicar.","Supera una ronda de Jugar con "+PASS*100+"% al primer intento y podrás aprender "+STEP+" más.","Los nuevos entran a Jugar al día siguiente."],
  lgKnown:"En tu Jugar",lgNew:"Nuevo (entra mañana)",lgOk:"Acertado",lgBad:"Fallado",
  hist:"Historial",histNone:"Aún no hay rondas.",mPlay:"Jugar",mStudy:"Estudiar",
  zoneL:{world:"Continente",us:"Región"},allZ:{world:"Todo el mundo",us:"Todo EE. UU."},zoneLock:"Termina la ronda para cambiar de zona.",
  firstT:z=>"Tus primeros de "+z,firstTxt:"Para empezar con esta zona. Ya están en Jugar y en Estudiar.",
  sIntro:"Toca una tarjeta para ver el nombre.",sLocked:"Estudiar se bloquea mientras tienes una ronda de Jugar empezada. Termínala primero.",
  all:"Todos",showAll:"Mostrar todo",hide:"Ocultar todo",isNew:"nuevo",
  regions:{am:"América",eu:"Europa",as:"Asia",af:"África",oc:"Oceanía",ne:"Noreste",mw:"Medio Oeste",so:"Sur",we:"Oeste"}},
en:{tag:{world:"Learn every country in the world by its shape and flag.",us:"Learn all 50 US states by their shape and flag."},
  idea:"GEO.SPY · original idea and concept by",menu:"Menu",games:"Kevin_G games",here:"You are here",piSub:"Memorize π like a password",hqSub:"All the games",moSub:"Learn Morse code",lkSub:"Focus clock",
  prog:"Your progress",auto:"Saved automatically in this browser. Use the file to move it to another device or keep a backup.",
  saveF:"Save progress to a file",saveSub:"Downloads a .json",loadF:"Load progress",loadSub:"From a saved file",
  reset:"Start over",resetSub:n=>"Erases your "+n+" progress",resetQ:n=>"Erase all your "+n+" progress and start over? This can't be undone.",
  loaded:"Progress loaded.",badFile:"That file is not a Geo.Spy save.",
  play:"Play",study:"Study",inPlay:u=>u+" in Play",pending:n=>"+"+n+" new join tomorrow",
  loading:"Loading map…",loadErr:"Couldn't load the map. Check your internet connection.",zoomOut:"Show all",
  startT:(n,u)=>n+" "+u+" to name",startTxt:"The map takes you to each one with its flag inside. Type its name.",start:"Start",
  q:(a,b)=>"Question "+a+" of "+b,streak:"Streak",again:"review",typeP:"Type the name…",send:"Send",hint:"Hint",idk:"I don't know",
  right:"Correct!",near:"Almost perfect. It's spelled:",wrongTry:n=>"Not that one. "+n+" "+(n>1?"tries":"try")+" left.",
  itWas:"It was",willAsk:"I'll ask you again later in this round.",nextQ:"Next →",
  winT:"Round cleared!",loseT:"So close",score:(a,b)=>a+" of "+b+" on the first try.",winTxt:"Your record goes up. If you feel confident, learn more.",winAll:"You have them all.",
  loseTxt:n=>"You need "+n+" on the first try. Review in Study and try again.",missed:"To review",
  more:n=>"I'm confident: learn "+n+" more",retry:"Another round",goStudy:"Go to study",
  newT:"Your new ones",newTxt:"Look at them and learn the names. They're already in Study; they join Play starting tomorrow.",toStudy:"Study them now",toMap:"Back to the map",
  quiz:"Quiz",cards:"Cards",sStartT:(n,u)=>"Quiz of "+n+" "+u,sStartTxt:"For practice: pick from a few options. It doesn't change your record.",
  sDoneT:"Review done!",keys:n=>"Keys 1–"+n+" to answer · Enter to continue",
  newRank:"New level",as:"You explore like",nobody:"Nobody yet",nobodyT:n=>"Clear your first Play round to match "+n+".",record:u=>u+" · your record",
  next:(n,d,u)=>"Next: "+n+" at "+d+" "+u,end:"You reached the end.",
  how:"How it works",steps:["Play: the map takes you to each one and you type its name.","Study: multiple-choice quiz and cards for practice.","Clear a Play round with "+PASS*100+"% on the first try and you can learn "+STEP+" more.","New ones join Play the next day."],
  lgKnown:"In your Play",lgNew:"New (joins tomorrow)",lgOk:"Got it",lgBad:"Missed",
  hist:"History",histNone:"No rounds yet.",mPlay:"Play",mStudy:"Study",
  zoneL:{world:"Continent",us:"Region"},allZ:{world:"Whole world",us:"All USA"},zoneLock:"Finish the round to change zone.",
  firstT:z=>"Your first ones from "+z,firstTxt:"To get you started in this zone. They're already in Play and Study.",
  sIntro:"Tap a card to see the name.",sLocked:"Study locks while a Play round is in progress. Finish it first.",
  all:"All",showAll:"Show all",hide:"Hide all",isNew:"new",
  regions:{am:"Americas",eu:"Europe",as:"Asia",af:"Africa",oc:"Oceania",ne:"Northeast",mw:"Midwest",so:"South",we:"West"}}
};

/* ---------- estado (se guarda solo en el navegador) ---------- */
function newSet(id){const st=SETS[id],known={};st.order.slice(0,st.start).forEach(c=>known[c]="0");return {known,zone:"all",best:0,stats:{},hist:[],play:null,study:null,intro:null}}
function load(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
// trae el progreso de la primera versión (solo banderas)
function migrate(){
  const o=load(OLDKEY); if(!o||!o.pool)return null;
  const w=newSet("world"), od=d0.getFullYear()+"-"+(d0.getMonth()+1)+"-"+d0.getDate();
  w.known={}; o.pool.forEach(c=>{if(WORLD[c])w.known[c]="0"});
  if(o.today&&o.today.introSeen)(o.today.batch||[]).forEach(c=>{if(WORLD[c]&&!(c in w.known))w.known[c]=o.today.date===od?TODAY:"0"});
  w.best=+o.best||0; w.stats=o.stats||{};
  return {lang:o.lang,world:w};
}
let S=load(KEY);
if(!S||!S.sets){const m=migrate();S={lang:(m&&m.lang)||((navigator.language||"es").slice(0,2)==="en"?"en":"es"),set:"world",sets:{}};if(m)S.sets.world=m.world}
for(const id in SETS)if(!S.sets[id])S.sets[id]=newSet(id);
if(!SETS[S.set])S.set="world";
save();

let view="play", sub="quiz", shown={}, showAll=false, timer=null;
const L=()=>T[S.lang], $=id=>document.getElementById(id), ST=()=>SETS[S.set], G=()=>S.sets[S.set];
const nm=c=>ST().items[c][S.lang==="en"?0:1], rgOf=c=>ST().items[c][2], unit=()=>ST().unit[S.lang];
const rName=r=>S.lang==="en"&&r.en?r.en:r.name, rText=r=>r[S.lang+"_t"], need=n=>Math.ceil(n*PASS-1e-9);
function rankIdx(n){let r=-1;ST().ranks.forEach((x,i)=>{if(n>=x.n)r=i});return r}
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const known=()=>Object.keys(G().known);
// continente (o región de EE. UU.) que estás jugando; "all" = todos
const zone=()=>G().zone||"all", inZone=c=>zone()==="all"||rgOf(c)===zone();
const knownZ=()=>known().filter(inZone);
const playable=()=>knownZ().filter(c=>G().known[c]<TODAY);
const playableAll=()=>known().filter(c=>G().known[c]<TODAY);
const pendingNew=()=>knownZ().filter(c=>G().known[c]>=TODAY);
// la primera vez que eliges un continente del que sabes poco, te da sus más conocidos para empezar
function seedZone(){
  const g=G(); if(zone()==="all"||playable().length>=4)return;
  const b=ST().order.filter(c=>inZone(c)&&!(c in g.known)).slice(0,5-playable().length);
  if(!b.length)return;
  b.forEach(c=>{g.known[c]="0"}); g.intro=b; g.introSeed=true; g.play=null; g.study=null;
}
const stat=c=>G().stats[c]||(G().stats[c]=[0,0]);
// más probable si lo has fallado o lo has visto poco
function weighted(list,n){
  const w=c=>{const s=G().stats[c]||[0,0];return (1+s[1]*2)/(1+s[0]*.5)};
  return list.map(c=>[c,Math.random()**(1/w(c))]).sort((a,b)=>b[1]-a[1]).slice(0,n).map(x=>x[0]);
}
function logHist(m,ok,n){const g=G();g.hist.unshift({d:TODAY,m,ok,n,w:ok>=need(n)});g.hist.length=Math.min(g.hist.length,60)}

/* ---------- nombres: acepta español o inglés, sin acentos y con una letra mal ---------- */
const norm=s=>(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9]+/g," ").trim().replace(/^(the|el|la|los|las) /,"");
function namesOf(id,c){const st=SETS[id],it=st.items[c];return [it[0],it[1],...(st.alias[c]||[])].map(norm)}
const NAMEIDX={};
function nameIdx(){
  if(!NAMEIDX[S.set]){const m={};for(const c in ST().items)namesOf(S.set,c).forEach(n=>{m[n]=c});NAMEIDX[S.set]=m}
  return NAMEIDX[S.set];
}
function lev(a,b){
  const v=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){let p=v[0];v[0]=i;for(let j=1;j<=b.length;j++){const t=v[j];v[j]=Math.min(v[j]+1,v[j-1]+1,p+(a[i-1]===b[j-1]?0:1));p=t}}
  return v[b.length];
}
function match(txt,c){
  const x=norm(txt); if(!x)return null;
  const mine=namesOf(S.set,c); if(mine.includes(x))return "exact";
  const owner=nameIdx()[x]; if(owner&&owner!==c)return null; // es el nombre de otro (Níger ≠ Nigeria)
  return mine.some(a=>a.length>=5&&lev(a,x)<=(a.length>=10?2:1))?"near":null;
}

/* ---------- geografía ---------- */
const GEO={}, GEOR={};
// países con territorios lejanos: la forma solo muestra la parte principal
const TIGHT=new Set(["us","fr","es","cl","ec","no","nl","za","pt","dk","gb"]);
const polyArea=p=>{const a=d3.geoArea(p);return a>2*Math.PI?4*Math.PI-a:a};
function coreOf(code,f){
  if(!f.geometry||f.geometry.type!=="MultiPolygon")return f;
  const polys=f.geometry.coordinates.map(c=>({type:"Polygon",coordinates:c})), areas=polys.map(polyArea);
  const m=areas.indexOf(Math.max(...areas)), c0=d3.geoCentroid(polys[m]);
  const R=d3.max(polys[m].coordinates[0],p=>d3.geoDistance(c0,p)), lim=(TIGHT.has(code)?1.2:3)*R+.03;
  const keep=polys.filter((p,i)=>i===m||d3.geoDistance(c0,d3.geoCentroid(p))<lim);
  return {type:"Feature",geometry:{type:"MultiPolygon",coordinates:keep.map(p=>p.coordinates)},main:polys[m]};
}
function loadGeo(id){
  if(GEO[id])return GEO[id];
  return GEO[id]=(async()=>{
    const st=SETS[id], res=await fetch(st.topo); if(!res.ok)throw new Error(res.status);
    const topo=await res.json(), obj=id==="world"?topo.objects.countries:topo.objects.states;
    const byNum={}, byName={Somaliland:"so",Kosovo:"xk"}, groups={}, other=[];
    for(const c in st.items){if(st.items[c][3])byNum[st.items[c][3]]=c;byName[st.items[c][0]]=c}
    obj.geometries.forEach(g=>{
      const code=(id==="world"&&g.id!=null&&byNum[+g.id])||byName[g.properties&&g.properties.name];
      if(code)(groups[code]=groups[code]||[]).push(g);else other.push(g);
    });
    const feats={}, cores={};
    for(const c in groups){
      const gs=groups[c];
      feats[c]=gs.length>1?{type:"Feature",geometry:topojson.merge(topo,gs)}:topojson.feature(topo,gs[0]);
      cores[c]=coreOf(c,feats[c]);
    }
    for(const c in st.points)if(!feats[c])feats[c]=cores[c]={type:"Feature",geometry:{type:"Point",coordinates:st.points[c]}};
    return GEOR[id]={feats,cores,other:other.map(g=>topojson.feature(topo,g))};
  })().catch(e=>{delete GEO[id];throw e});
}
const r1=n=>Math.round(n*10)/10;
let uid=0;
// la forma del país con su bandera adentro
function shape(c,W,H){
  const g=GEOR[S.set], f=g&&g.cores[c];
  if(!f)return '<div class="noshape"><img class="flag" src="'+FLAG(c,320)+'" alt=""></div>';
  const id="sp"+(++uid);
  if(f.geometry.type==="Point"){
    const r=Math.min(W,H)/2-8;
    return '<svg class="shape" viewBox="0 0 '+W+' '+H+'"><defs><clipPath id="'+id+'"><circle cx="'+W/2+'" cy="'+H/2+'" r="'+r+'"/></clipPath></defs>'+
      '<circle class="base" cx="'+W/2+'" cy="'+H/2+'" r="'+r+'"/><image href="'+FLAG(c,320)+'" x="'+(W/2-r*1.5)+'" y="'+(H/2-r)+'" width="'+r*3+'" height="'+r*2+'" preserveAspectRatio="xMidYMid slice" clip-path="url(#'+id+')"/>'+
      '<circle class="edge" fill="none" cx="'+W/2+'" cy="'+H/2+'" r="'+r+'"/></svg>';
  }
  const ctr=d3.geoCentroid(f.main||f);
  const proj=d3.geoAzimuthalEqualArea().rotate([-ctr[0],-ctr[1]]).fitExtent([[8,8],[W-8,H-8]],f), p=d3.geoPath(proj).digits(1);
  const d=p(f), b=p.bounds(f), x=r1(b[0][0]), y=r1(b[0][1]), w=r1(b[1][0]-b[0][0]), h=r1(b[1][1]-b[0][1]);
  return '<svg class="shape" viewBox="0 0 '+W+' '+H+'"><defs><pattern id="'+id+'" patternUnits="userSpaceOnUse" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'">'+
    '<image href="'+FLAG(c,w>200?640:320)+'" width="'+w+'" height="'+h+'" preserveAspectRatio="xMidYMid slice"/></pattern></defs>'+
    '<path class="base" d="'+d+'"/><path class="edge" d="'+d+'" fill="url(#'+id+')"/></svg>';
}

/* ---------- mapa ---------- */
let MAP=null, mapBuilding=null;
function ensureMap(){
  if(MAP&&MAP.id===S.set)return Promise.resolve(MAP);
  if(mapBuilding&&mapBuilding.id===S.set)return mapBuilding.p;
  const id=S.set, p=buildMap(id);
  mapBuilding={id,p}; p.finally(()=>{if(mapBuilding&&mapBuilding.p===p)mapBuilding=null});
  return p;
}
async function buildMap(id){
  const box=$("mapBox");
  box.innerHTML='<div class="maploading">'+L().loading+'</div>';
  let g; try{g=await loadGeo(id)}catch(e){if(S.set===id)box.innerHTML='<div class="maploading err">'+L().loadErr+'</div>';return null}
  if(S.set!==id)return null;
  const st=SETS[id], [W,H]=st.vb;
  // Equal Earth: la proyección de 2018 que respeta el tamaño real (África se ve grande)
  const proj=id==="world"?d3.geoEqualEarth().fitExtent([[6,6],[W-6,H-6]],{type:"Sphere"})
    :d3.geoAlbersUsa().fitExtent([[12,12],[W-12,H-12]],{type:"FeatureCollection",features:Object.values(g.feats)});
  const path=d3.geoPath(proj).digits(2);
  const svg=d3.create("svg").attr("viewBox",[0,0,W,H]).attr("class","map");
  const defs=svg.append("defs");
  const fl=defs.append("filter").attr("id","glow").attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%");
  fl.append("feDropShadow").attr("dx",0).attr("dy",0).attr("stdDeviation",3).attr("flood-color","#c884ff");
  const pat=defs.append("pattern").attr("id","tflag").attr("patternUnits","userSpaceOnUse"), pimg=pat.append("image").attr("preserveAspectRatio","xMidYMid slice");
  const z=svg.append("g");
  if(id==="world"){z.append("path").attr("class","sphere").attr("d",path({type:"Sphere"}));z.append("path").attr("class","grat").attr("d",path(d3.geoGraticule10()))}
  z.append("g").selectAll("path").data(g.other).join("path").attr("class","land").attr("d",path);
  const paths={};
  for(const c in g.feats){
    const f=g.feats[c];
    if(f.geometry.type==="Point"){const p=proj(f.geometry.coordinates);if(p)paths[c]=z.append("circle").attr("cx",p[0]).attr("cy",p[1]).attr("r",2.2).node()}
    else paths[c]=z.append("path").attr("d",path(f)).node();
  }
  const ring=z.append("circle").attr("class","ring").attr("r",0);
  const M={id,svg,z,paths,path,proj,W,H,pat,pimg,ring,k:1,ringR:0,cur:null};
  M.zoom=d3.zoom().scaleExtent([1,120]).translateExtent([[0,0],[W,H]]).extent([[0,0],[W,H]]).on("zoom",e=>{
    M.k=e.transform.k; z.attr("transform",e.transform); ring.attr("r",M.ringR/M.k);
    z.selectAll("circle:not(.ring)").attr("r",2.2/Math.sqrt(M.k));
    $("zoomOut").hidden=M.k<1.05;
  });
  svg.call(M.zoom).on("dblclick.zoom",null);
  box.innerHTML=""; box.append(svg.node());
  box.insertAdjacentHTML("beforeend",'<div class="inset" id="inset" hidden></div><button class="zoomout" id="zoomOut" hidden>'+L().zoomOut+'</button>');
  $("zoomOut").onclick=()=>svg.transition().duration(REDUCED?0:700).call(M.zoom.transform,d3.zoomIdentity);
  MAP=M; return M;
}
function paintMap(){
  if(!MAP||MAP.id!==S.set)return;
  const g=G(), r=g.play, active=view==="play"&&r&&!r.done&&!g.intro, target=active?r.queue[r.i]:null;
  MAP.svg.classed("playing",!!active);
  for(const c in MAP.paths){
    const el=MAP.paths[c], k=g.known[c];
    let cls="land"+(el.tagName==="circle"?" dotc":"");
    if(k!=null)cls+=k<TODAY?" known":" fresh";
    if(r&&r.res&&r.res[c]&&c!==target)cls+=" "+r.res[c];
    if(c===target)cls+=" target";
    else if(!inZone(c))cls+=" out";
    el.setAttribute("class",cls);
    el.style.fill=c===target&&el.tagName==="path"?"url(#tflag)":"";
  }
  if(target&&target!==MAP.cur)focusOn(target);
  else if(!target&&(MAP.cur||MAP.rest!==zone())){
    MAP.cur=null; MAP.rest=zone(); MAP.ringR=0; MAP.ring.attr("r",0); $("inset").hidden=true;
    MAP.svg.transition().duration(REDUCED?0:900).call(MAP.zoom.transform,zoneView());
  }
}
// recuadro [oeste, sur, este, norte] de cada continente
const ZONEBOX={am:[-168,-56,-34,72],eu:[-25,34,45,71],as:[26,-11,148,56],af:[-19,-36,52,38],oc:[112,-48,180,0]};
function zoneView(){
  const z=zone(); if(z==="all")return d3.zoomIdentity;
  let pts=[];
  if(S.set==="world"){
    const [w,s,e,n]=ZONEBOX[z];
    for(let i=0;i<=10;i++){const lo=w+(e-w)*i/10, la=s+(n-s)*i/10;pts.push(MAP.proj([lo,s]),MAP.proj([lo,n]),MAP.proj([w,la]),MAP.proj([e,la]))}
  }else for(const c in MAP.paths)if(rgOf(c)===z)pts.push(...MAP.path.bounds(GEOR[S.set].cores[c]));
  pts=pts.filter(p=>p&&isFinite(p[0]));
  if(!pts.length)return d3.zoomIdentity;
  const [x0,x1]=d3.extent(pts,p=>p[0]), [y0,y1]=d3.extent(pts,p=>p[1]);
  const k=Math.max(1,Math.min(8,.94/Math.max((x1-x0)/MAP.W,(y1-y0)/MAP.H)));
  return d3.zoomIdentity.translate(MAP.W/2,MAP.H/2).scale(k).translate(-(x0+x1)/2,-(y0+y1)/2);
}
function focusOn(c){
  MAP.cur=c;
  const f=GEOR[S.set].cores[c], el=MAP.paths[c]; if(!f||!el)return;
  let b;
  if(f.geometry.type==="Point"){const p=MAP.proj(f.geometry.coordinates);b=[[p[0]-3,p[1]-3],[p[0]+3,p[1]+3]]}
  else{b=MAP.path.bounds(f);if(b[1][0]-b[0][0]>MAP.W*.5&&f.main)b=MAP.path.bounds(f.main)} // cruza el antimeridiano
  const [[x0,y0],[x1,y1]]=b, dx=Math.max(x1-x0,.5), dy=Math.max(y1-y0,.5), cx=(x0+x1)/2, cy=(y0+y1)/2;
  const k=Math.max(1,Math.min(S.set==="world"?40:10,.5/Math.max(dx/MAP.W,dy/MAP.H)));
  MAP.pat.attr("x",x0).attr("y",y0).attr("width",dx).attr("height",dy);
  MAP.pimg.attr("href",FLAG(c,dx*k>260?640:320)).attr("width",dx).attr("height",dy);
  d3.select(el).raise(); MAP.ring.raise().attr("cx",cx).attr("cy",cy);
  // si es diminuto, un anillo para encontrarlo y su forma en grande en la esquina
  const tiny=f.geometry.type==="Point"||dx*k<28||dy*k<28;
  MAP.ringR=tiny?20:0; MAP.ring.attr("r",MAP.ringR/MAP.k);
  const ins=$("inset"); ins.hidden=!tiny; ins.innerHTML=tiny?shape(c,150,100):"";
  MAP.svg.transition().duration(REDUCED?0:900).call(MAP.zoom.transform,d3.zoomIdentity.translate(MAP.W/2,MAP.H/2).scale(k).translate(-cx,-cy));
}

/* ---------- Jugar: escribir el nombre en el mapa ---------- */
function startPlay(){
  const q=weighted(playable(),ROUND), g=G();
  g.play={queue:q,i:0,total:q.length,miss:{},res:{},streak:0,tries:0,hint:false,state:"ask",msg:"",done:false};
  g.intro=null; save(); render();
}
function markMiss(r,c){if(!r.miss[c]){r.miss[c]=1;stat(c)[1]++}}
function guess(txt){
  const r=G().play; if(!r||r.done||r.state!=="ask")return;
  const c=r.queue[r.i], m=match(txt,c);
  if(!m){
    if(!norm(txt))return;
    r.tries++; markMiss(r,c);
    if(r.tries>=TRIES)return reveal();
    r.msg=L().wrongTry(TRIES-r.tries); save(); renderPlay(true); return;
  }
  r.state="right"; r.near=m==="near"; r.streak++;
  if(!r.miss[c]){stat(c)[0]++;r.res[c]="ok"}else r.res[c]="bad";
  save(); renderPlay(); timer=setTimeout(nextPlay,r.near?1800:1100);
}
function reveal(){
  const r=G().play, c=r.queue[r.i]; if(r.state!=="ask")return;
  markMiss(r,c); r.state="reveal"; r.streak=0; r.res[c]="bad";
  r.queue.splice(Math.min(r.i+4,r.queue.length),0,c); // vuelve a salir 3 preguntas después
  save(); renderPlay();
}
function nextPlay(){
  clearTimeout(timer); timer=null;
  const g=G(), r=g.play; if(!r||r.done||r.state==="ask")return;
  r.i++; r.state="ask"; r.tries=0; r.hint=false; r.msg=""; r.near=false;
  if(r.i>=r.queue.length){
    r.done=true;
    const ok=r.total-Object.keys(r.miss).length; r.won=ok>=need(r.total); r.unlocked=null;
    if(r.won){const before=rankIdx(g.best);g.best=Math.max(g.best,playableAll().length);const after=rankIdx(g.best);if(after>before)r.unlocked=after}
    logHist("play",ok,r.total);
  }
  save(); render();
}
function learnMore(){
  const g=G(), b=ST().order.filter(c=>inZone(c)&&!(c in g.known)).slice(0,STEP);
  b.forEach(c=>{g.known[c]=TODAY}); g.intro=b; g.introSeed=false; g.play=null; save(); render();
}
const zoneName=()=>zone()==="all"?L().allZ[S.set]:L().regions[zone()];
const leftInZone=()=>ST().order.filter(c=>inZone(c)&&!(c in G().known)).length;
const hintOf=c=>[...nm(c)].map((ch,i)=>i===0?ch:/\s/.test(ch)?" ":/\p{L}/u.test(ch)?"_":ch).join(" ");

function renderPlay(shake){
  const l=L(), g=G(), r=g.play, u=unit();
  paintMap();
  let h="";
  if(g.intro){
    h='<div class="center"><span class="eyebrow">'+(g.introSeed?l.firstT(zoneName()):l.newT)+'</span><div class="grid big">';
    g.intro.forEach(c=>{h+='<div class="card new"><span class="tagnew">'+l.isNew+'</span><div class="fl">'+shape(c,190,130)+'</div><div class="nm">'+nm(c)+'</div><div class="rg">'+l.regions[rgOf(c)]+'</div></div>'});
    h+='</div><p>'+(g.introSeed?l.firstTxt:l.newTxt)+'</p><div class="acts"><button class="btn ghost" id="toMap">'+l.toMap+'</button><button class="btn" id="toStudy">'+l.toStudy+'</button></div></div>';
  }else if(!r){
    h='<div class="panel"><div><span class="eyebrow">'+zoneName()+'</span><h2>'+l.startT(playable().length,u)+'</h2><p class="small">'+l.startTxt+'</p></div><button class="btn" id="startB">'+l.start+'</button></div>';
  }else if(r.done){
    const missed=Object.keys(r.miss), ok=r.total-missed.length, left=leftInZone();
    h='<div class="result '+(r.won?'win':'lose')+'"><div><h2>'+(r.won?l.winT:l.loseT)+'</h2><p class="small">'+l.score(ok,r.total)+' '+(r.won?(left?l.winTxt:l.winAll):l.loseTxt(need(r.total)))+'</p>'+
      (r.unlocked!=null?'<p style="margin-top:6px"><span class="eyebrow">'+l.newRank+'</span> · <b style="color:var(--ghost)">'+rName(ST().ranks[r.unlocked])+'</b></p>':'')+'</div>'+
      '<div class="acts">'+(r.won?'':'<button class="btn ghost" id="stBtn">'+l.goStudy+'</button>')+
      '<button class="btn'+(r.won&&left?' ghost':'')+'" id="reBtn">'+l.retry+'</button>'+(r.won&&left?'<button class="btn" id="moreBtn">'+l.more(Math.min(STEP,left))+'</button>':'')+'</div></div>';
    if(missed.length){h+='<div><span class="eyebrow">'+l.missed+'</span><div class="miss">';missed.forEach(c=>{h+='<span><img src="'+FLAG(c,80)+'" alt="">'+nm(c)+'</span>'});h+='</div></div>'}
  }else{
    const c=r.queue[r.i], reask=r.miss[c]&&r.queue.indexOf(c)<r.i;
    h='<div class="qhead"><span class="eyebrow">'+l.q(r.i+1,r.queue.length)+(reask?'<span class="again">'+l.again+'</span>':'')+'</span>'+
      '<span class="streak'+(r.streak>=5?' hot':'')+'">'+l.streak+' <b>'+r.streak+'</b></span></div><div class="qbar"><i style="width:'+(r.i/r.queue.length*100)+'%"></i></div>';
    if(r.state==="ask"){
      h+='<form class="guess'+(shake?' shake':'')+'" id="gForm" autocomplete="off"><input id="gIn" type="text" spellcheck="false" autocapitalize="off" autocomplete="off" enterkeyhint="send" placeholder="'+l.typeP+'" aria-label="'+ST().ask[S.lang]+'"><button class="btn">'+l.send+'</button></form>'+
        '<div class="tools"><button class="btn ghost sm" id="hintB"'+(r.hint?' disabled':'')+'>'+l.hint+'</button><button class="btn ghost sm" id="idkB">'+l.idk+'</button></div>'+
        '<div class="fb'+(r.hint?' hint':r.msg?' err':'')+'">'+(r.hint?hintOf(c):r.msg)+'</div>';
    }else if(r.state==="right"){
      h+='<div class="okcard"><div><span class="eyebrow">'+(r.near?l.near:l.right)+'</span><h2>'+nm(c)+'</h2></div><button class="btn" id="goNext">'+l.nextQ+'</button></div>';
    }else{
      h+='<div class="reveal"><div><span class="eyebrow">'+l.itWas+'</span><h2>'+nm(c)+'</h2><p class="small">'+l.willAsk+'</p></div><button class="btn" id="goNext">'+l.nextQ+'</button></div>';
    }
  }
  $("view").innerHTML=h;
  const on=(id,f)=>{const e=$(id);if(e)e.onclick=f};
  on("startB",startPlay); on("reBtn",startPlay); on("moreBtn",learnMore); on("goNext",nextPlay); on("idkB",reveal);
  on("hintB",()=>{const r=G().play;r.hint=true;markMiss(r,r.queue[r.i]);save();renderPlay();$("gIn").focus()});
  on("stBtn",()=>{view="study";sub="quiz";render()});
  on("toMap",()=>{G().intro=null;G().introSeed=false;save();render()});
  on("toStudy",()=>{G().intro=null;G().introSeed=false;save();view="study";sub="cards";render()});
  if($("gForm")){$("gForm").onsubmit=e=>{e.preventDefault();guess($("gIn").value)};$("gIn").focus({preventScroll:true})}
  if($("goNext"))$("goNext").focus({preventScroll:true});
  if(r&&r.state==="right"&&!timer)timer=setTimeout(nextPlay,1100);
  if(r&&!r.done&&r.queue[r.i+1])new Image().src=FLAG(r.queue[r.i+1],320);
}

/* ---------- Estudiar: quiz de opciones y tarjetas ---------- */
function startStudy(){const q=weighted(knownZ(),SROUND);G().study={queue:q,i:0,total:q.length,miss:{},streak:0,opts:null,pick:null,done:false};save();renderStudy()}
function makeOpts(c){
  const all=knownZ(), n=all.length>=40?6:4;
  // distractores: primero los que ya conoces y de la misma región, para que se parezcan
  let cand=shuffle(all.filter(x=>x!==c)).sort((a,b)=>(rgOf(a)!==rgOf(c))-(rgOf(b)!==rgOf(c)));
  if(cand.length<n-1)cand=cand.concat(shuffle(ST().order.filter(x=>x!==c&&!cand.includes(x))).sort((a,b)=>inZone(b)-inZone(a)));
  return shuffle([c,...cand.slice(0,n-1)]);
}
function answer(k){
  const q=G().study; if(!q||q.done||q.pick!=null)return;
  const c=q.queue[q.i], first=!q.miss[c]; q.pick=k;
  if(q.opts[k]===c){q.streak++;if(first)stat(c)[0]++;timer=setTimeout(nextS,800)}
  else{q.streak=0;if(first)stat(c)[1]++;q.miss[c]=1;q.queue.splice(Math.min(q.i+4,q.queue.length),0,c)}
  save(); renderStudy();
}
function nextS(){
  clearTimeout(timer); timer=null;
  const q=G().study; if(!q||q.pick==null)return;
  q.i++; q.pick=null; q.opts=null;
  if(q.i>=q.queue.length){q.done=true;logHist("study",q.total-Object.keys(q.miss).length,q.total)}
  save(); render();
}
function renderStudy(){
  const l=L(), g=G(), r=g.play, u=unit();
  if(!GEOR[S.set])loadGeo(S.set).then(()=>{if(view==="study")renderStudy()}).catch(()=>{});
  if(r&&!r.done&&(r.i>0||r.state!=="ask"||r.tries>0)){$("view").innerHTML='<div class="center"><p>'+l.sLocked+'</p></div>';return}
  let h='<div class="subtabs"><button id="sQuiz"'+(sub==="quiz"?' class="on"':'')+'>'+l.quiz+'</button><button id="sCards"'+(sub==="cards"?' class="on"':'')+'>'+l.cards+'</button></div>';
  const q=g.study;
  if(sub==="quiz"){
    if(!q){
      h+='<div class="panel"><div><h2>'+l.sStartT(Math.min(SROUND,knownZ().length),u)+'</h2><p class="small">'+l.sStartTxt+'</p></div><button class="btn" id="sStart">'+l.start+'</button></div>';
    }else if(q.done){
      const missed=Object.keys(q.miss), ok=q.total-missed.length;
      h+='<div class="result '+(ok>=need(q.total)?'win':'lose')+'"><div><h2>'+l.sDoneT+'</h2><p class="small">'+l.score(ok,q.total)+'</p></div><div class="acts"><button class="btn" id="sStart">'+l.retry+'</button></div></div>';
      if(missed.length){h+='<div><span class="eyebrow">'+l.missed+'</span><div class="miss">';missed.forEach(c=>{h+='<span><img src="'+FLAG(c,80)+'" alt="">'+nm(c)+'</span>'});h+='</div></div>'}
    }else{
      const c=q.queue[q.i], reask=q.miss[c]&&q.queue.indexOf(c)<q.i;
      if(!q.opts){q.opts=makeOpts(c);save()}
      h+='<div class="quiz"><div class="qhead"><span class="eyebrow">'+l.q(q.i+1,q.queue.length)+(reask?'<span class="again">'+l.again+'</span>':'')+'</span>'+
        '<span class="streak'+(q.streak>=5?' hot':'')+'">'+l.streak+' <b>'+q.streak+'</b></span></div>'+
        '<div class="qbar"><i style="width:'+(q.i/q.queue.length*100)+'%"></i></div>'+
        '<div class="stage"><div class="shapewrap">'+shape(c,380,230)+'</div><p class="ask">'+ST().ask[S.lang]+'</p></div><div class="opts'+(q.pick!=null?' locked':'')+'">';
      q.opts.forEach((o,k)=>{
        let s=""; if(q.pick!=null){if(o===c)s=" right";else if(k===q.pick)s=" wrong"}
        h+='<button class="opt o'+k+s+'" data-k="'+k+'"'+(q.pick!=null?' tabindex="-1"':'')+'><span class="k">'+(k+1)+'</span>'+nm(o)+'</button>';
      });
      h+='</div>';
      if(q.pick==null)h+='<p class="keys">'+l.keys(q.opts.length)+'</p>';
      else if(q.opts[q.pick]===c)h+='<div class="fb" style="color:var(--ok);font-weight:700">'+l.right+'</div>';
      else h+='<div class="reveal"><div><span class="eyebrow">'+l.itWas+'</span><h2>'+nm(c)+'</h2><p class="small">'+l.willAsk+'</p></div><button class="btn" id="sNext">'+l.nextQ+'</button></div>';
      h+='</div>';
      if(q.pick!=null&&q.opts[q.pick]===c&&!timer)timer=setTimeout(nextS,800);
    }
  }else{
    const isNew=c=>g.known[c]>=TODAY;
    const list=knownZ();
    h+='<div class="center"><button class="btn ghost sm" id="sa">'+(showAll?l.hide:l.showAll)+'</button><p>'+l.sIntro+'</p></div><div class="grid">';
    list.forEach(c=>{
      const open=showAll||shown[c], n=isNew(c);
      h+='<button class="card'+(n?' new':'')+'" data-c="'+c+'">'+(n?'<span class="tagnew">'+l.isNew+'</span>':'')+
        '<div class="fl">'+shape(c,180,120)+'</div><div class="nm'+(open?'':' hid')+'">'+(open?nm(c):'?')+'</div></button>';
    });
    h+='</div>';
  }
  $("view").innerHTML=h;
  $("sQuiz").onclick=()=>{sub="quiz";renderStudy()};
  $("sCards").onclick=()=>{sub="cards";renderStudy()};
  if($("sStart"))$("sStart").onclick=startStudy;
  if($("sNext")){$("sNext").onclick=nextS;$("sNext").focus({preventScroll:true})}
  $("view").querySelectorAll(".opt").forEach(b=>b.onclick=()=>answer(+b.dataset.k));
  $("view").querySelectorAll(".card[data-c]").forEach(b=>b.onclick=()=>{const c=b.dataset.c;shown[c]=!shown[c];renderStudy()});
  if($("sa"))$("sa").onclick=()=>{showAll=!showAll;shown={};renderStudy()};
}

/* ---------- lateral ---------- */
function renderSide(){
  const l=L(), g=G(), u=unit(), R=ST().ranks, MAX=ST().order.length, ri=rankIdx(g.best), nx=R[ri+1], lo=ri<0?0:R[ri].n, hi=nx?nx.n:MAX;
  $("rankBox").innerHTML='<span class="eyebrow">'+l.as+'</span><div class="who">'+(ri<0?l.nobody:rName(R[ri]))+'</div>'+
    '<p class="small" style="margin-top:6px">'+(ri<0?l.nobodyT(rName(R[0])):rText(R[ri]))+'</p>'+
    '<div class="score"><b>'+g.best+'</b><span class="small">'+l.record(u)+'</span></div>'+
    '<div class="bar"><i style="width:'+(nx?Math.max(3,(g.best-lo)/(hi-lo)*100):100)+'%"></i></div>'+
    '<p class="small" style="margin-top:8px">'+(nx?l.next(rName(nx),nx.n,u):l.end)+'</p>';
  $("howBox").innerHTML='<span class="eyebrow">'+l.how+'</span><ol class="steps">'+l.steps.map(s=>'<li>'+s+'</li>').join("")+'</ol>'+
    '<div class="lg"><i style="background:#4b2486"></i><span>'+l.lgKnown+'</span></div>'+
    '<div class="lg"><i style="background:#3a1d63;outline:1px dashed var(--ghost)"></i><span>'+l.lgNew+'</span></div>'+
    '<div class="lg"><i style="background:#1e8a55"></i><span>'+l.lgOk+'</span></div>'+
    '<div class="lg"><i style="background:#9d1f39"></i><span>'+l.lgBad+'</span></div>';
  const hs=g.hist.slice(0,6);
  $("histBox").innerHTML='<span class="eyebrow">'+l.hist+'</span>'+(hs.length?'<ul class="hist">'+hs.map(x=>
    '<li><span class="dot'+(x.w?' w':'')+'"></span><span>'+x.d.slice(5).replace("-","/")+' · '+(x.m==="study"?l.mStudy:l.mPlay)+'</span><b>'+x.ok+'/'+x.n+'</b></li>').join("")+'</ul>'
    :'<p class="small" style="margin-top:8px">'+l.histNone+'</p>');
}

/* ---------- menú: otros juegos y tu progreso ---------- */
function renderMenu(){
  const l=L(), lab=ST().label[S.lang];
  $("burger").setAttribute("aria-label",l.menu);
  $("menu").innerHTML='<span class="eyebrow">'+l.games+'</span>'+
    '<a class="mi" href="/"><span class="ico hq">HQ</span><span><b>SPY.HQ</b><small>'+l.hqSub+'</small></span></a>'+
    '<a class="mi" href="/pie-spy/"><span class="ico pi">π</span><span><b>Pie.Spy</b><small>'+l.piSub+'</small></span></a>'+
    '<div class="mi on"><span class="ico"><svg class="globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4.4" ry="10"/><path d="M2 12h20M3.6 7h16.8M3.6 17h16.8"/></svg></span><span><b>Geo.Spy</b><small>'+l.here+'</small></span></div>'+
    '<a class="mi" href="/morse-spy/"><span class="ico"><span class="mo"><i></i><i class="d"></i><i></i></span></span><span><b>Morse.Spy</b><small>'+l.moSub+'</small></span></a>'+
    '<a class="mi" href="/lock-spy/"><span class="ico"><svg viewBox="0 0 24 24" style="fill:none;stroke:var(--ghost);stroke-width:1.7;stroke-linecap:round"><circle cx="12" cy="12" r="10"/><path d="M12 6.5V12h4"/></svg></span><span><b>Lock.Spy</b><small>'+l.lkSub+'</small></span></a>'+
    '<hr><span class="eyebrow">'+l.prog+'</span><p class="small">'+l.auto+'</p>'+
    '<button class="mi" id="mSave"><span class="ico">⤓</span><span><b>'+l.saveF+'</b><small>'+l.saveSub+'</small></span></button>'+
    '<button class="mi" id="mLoad"><span class="ico">⤒</span><span><b>'+l.loadF+'</b><small>'+l.loadSub+'</small></span></button>'+
    '<button class="mi danger" id="mReset"><span class="ico">↺</span><span><b>'+l.reset+'</b><small>'+l.resetSub(lab)+'</small></span></button>';
  $("mSave").onclick=exportSave;
  $("mLoad").onclick=()=>$("fileIn").click();
  $("mReset").onclick=()=>{
    if(!confirm(l.resetQ(lab)))return;
    clearTimeout(timer); timer=null; S.sets[S.set]=newSet(S.set); save(); toggleMenu(false); render();
  };
}
function toggleMenu(open){$("menu").hidden=!open;$("burger").setAttribute("aria-expanded",open)}
function exportSave(){
  const blob=new Blob([JSON.stringify({game:"geo-spy",v:2,saved:new Date().toISOString(),data:S})],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="geo-spy-progreso-"+TODAY+".json";
  document.body.append(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),2000);
}
// revisa el archivo antes de usarlo: solo se quedan códigos y números válidos
function cleanSet(id,s){
  const items=SETS[id].items, out=newSet(id);
  if(!s||typeof s!=="object"||!s.known||typeof s.known!=="object")return out;
  out.known={}; for(const c in s.known)if(items[c])out.known[c]=/^(0|\d{4}-\d\d-\d\d)$/.test(s.known[c])?s.known[c]:"0";
  if(!Object.keys(out.known).length)return newSet(id);
  out.zone=SETS[id].regions.includes(s.zone)?s.zone:"all";
  out.best=Math.max(0,Math.min(SETS[id].order.length,+s.best||0));
  for(const c in s.stats||{})if(items[c]&&Array.isArray(s.stats[c]))out.stats[c]=[+s.stats[c][0]||0,+s.stats[c][1]||0];
  out.hist=(Array.isArray(s.hist)?s.hist:[]).filter(h=>h&&/^\d{4}-\d\d-\d\d$/.test(h.d)).slice(0,60)
    .map(h=>({d:h.d,m:h.m==="study"?"study":"play",ok:+h.ok||0,n:+h.n||0,w:!!h.w}));
  return out;
}
$("fileIn").onchange=e=>{
  const f=e.target.files[0]; e.target.value=""; if(!f)return;
  f.text().then(t=>{
    let o=null; try{o=JSON.parse(t)}catch(err){}
    const d=o&&o.game==="geo-spy"&&o.data;
    if(!d||!d.sets)return alert(L().badFile);
    const sets={}; for(const id in SETS)sets[id]=cleanSet(id,d.sets[id]);
    clearTimeout(timer); timer=null;
    S={lang:d.lang==="en"?"en":"es",set:SETS[d.set]?d.set:"world",sets}; save();
    toggleMenu(false); render(); alert(L().loaded);
  });
};

/* ---------- render general ---------- */
function render(){
  const l=L(), g=G(), pend=pendingNew().length;
  document.documentElement.lang=S.lang;
  $("tag").textContent=l.tag[S.set]; $("foot").innerHTML=l.idea+" <b>Kevin_G</b>";
  $("tPlay").textContent=l.play; $("tStudy").textContent=l.study;
  $("tPlay").className=view==="play"?"on":""; $("tStudy").className=view==="study"?"on":"";
  $("lES").className=S.lang==="es"?"on":""; $("lEN").className=S.lang==="en"?"on":"";
  $("sets").innerHTML=Object.keys(SETS).map(id=>'<button data-s="'+id+'"'+(S.set===id?' class="on"':'')+'>'+SETS[id].label[S.lang]+'</button>').join("");
  $("sets").querySelectorAll("button").forEach(b=>b.onclick=()=>{if(S.set===b.dataset.s)return;clearTimeout(timer);timer=null;S.set=b.dataset.s;shown={};seedZone();save();render()});
  const r=g.play, busy=r&&!r.done&&(r.i>0||r.state!=="ask"||r.tries>0);
  $("zones").innerHTML='<span class="eyebrow">'+l.zoneL[S.set]+'</span>'+["all",...ST().regions].map(z=>{
    const tot=ST().order.filter(c=>z==="all"||rgOf(c)===z).length, kn=known().filter(c=>z==="all"||rgOf(c)===z).length;
    return '<button data-z="'+z+'"'+(zone()===z?' class="on"':'')+(busy?' disabled title="'+l.zoneLock+'"':'')+'>'+(z==="all"?l.allZ[S.set]:l.regions[z])+' <small>'+kn+'/'+tot+'</small></button>';
  }).join("");
  $("zones").querySelectorAll("button").forEach(b=>b.onclick=()=>{
    const z=b.dataset.z; if(zone()===z)return;
    clearTimeout(timer); timer=null; g.zone=z; g.play=null; g.study=null; g.intro=null; g.introSeed=false; shown={}; seedZone(); save(); render();
  });
  $("count").innerHTML="<b>"+playable().length+"</b> "+l.inPlay(unit())+(pend?"<small>"+l.pending(pend)+"</small>":"");
  $("mapBox").hidden=view!=="play";
  if(view==="play"){ensureMap().then(m=>{if(m&&view==="play")paintMap()});renderPlay()}else renderStudy();
  renderSide(); renderMenu();
}

/* ---------- entrada ---------- */
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"&&!$("menu").hidden){toggleMenu(false);$("burger").focus();return}
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  const g=G();
  if(view==="play"){
    const r=g.play;
    if(r&&!r.done&&r.state!=="ask"&&e.key==="Enter"){e.preventDefault();nextPlay()}
    return;
  }
  if(sub!=="quiz")return;
  const q=g.study; if(!q||q.done||!q.opts)return;
  if(q.pick==null&&/^[1-6]$/.test(e.key)){const k=+e.key-1;if(k<q.opts.length)answer(k)}
  else if(q.pick!=null&&(e.key==="Enter"||e.key===" ")){e.preventDefault();nextS()}
});
$("burger").onclick=e=>{e.stopPropagation();toggleMenu($("menu").hidden)};
document.addEventListener("click",e=>{if(!$("menu").hidden&&!e.target.closest(".menuwrap"))toggleMenu(false)});
document.addEventListener("copy",e=>{if(view==="study")e.preventDefault()});
$("tPlay").onclick=()=>{view="play";render()};
$("tStudy").onclick=()=>{view="study";shown={};showAll=false;render()};
$("lES").onclick=()=>{S.lang="es";save();render()};
$("lEN").onclick=()=>{S.lang="en";save();render()};

/* ---------- lluvia de coordenadas ---------- */
(function(){
  const c=$("rain"), x=c.getContext("2d"), G2="NSEW°′″⊕✦+";
  // semilla de la lluvia (una columna sigue su propio ritmo)
  const SEED="aGVjaG8gcG9yIGtldmluX0dvQXQgb1IgWk9OZSwgcGVhY2U=", B=[...atob(SEED)].flatMap(ch=>[...ch.charCodeAt(0).toString(2).padStart(8,"0")]);
  let cols=[], W, H, K=0, bi=0;
  function fit(){W=c.width=innerWidth;H=c.height=innerHeight;cols=Array.from({length:Math.ceil(W/26)},()=>Math.random()*H);K=Math.floor(cols.length*.38)}
  function draw(){
    x.fillStyle="rgba(11,4,20,.16)";x.fillRect(0,0,W,H);
    x.font="16px Consolas,monospace";
    cols.forEach((y,i)=>{
      x.fillStyle=Math.random()<.08?"rgba(234,217,255,.7)":"rgba(138,79,214,.45)";
      let ch=G2[Math.floor(Math.random()*G2.length)];
      if(i===K){ch=bi?(B[bi-1]==="1"?"N":"S"):"⊕";bi=(bi+1)%(B.length+1)}
      x.fillText(ch,i*26+6,y);
      cols[i]=y>H+Math.random()*400?0:y+22;
    });
  }
  fit();addEventListener("resize",fit);
  if(REDUCED){for(let i=0;i<40;i++)draw()}else setInterval(draw,90);
})();

render();
