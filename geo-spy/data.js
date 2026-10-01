/* Geo.Spy - datos. Idea original y concepto: Kevin_G, 2026 */

/* ---------- países: código ISO → [inglés, español, región, código numérico ISO] (193 de la ONU + Vaticano, Palestina, Kosovo, Taiwán) ---------- */
const WORLD={
mx:["Mexico","México","am",484],us:["United States","Estados Unidos","am",840],ca:["Canada","Canadá","am",124],br:["Brazil","Brasil","am",76],ar:["Argentina","Argentina","am",32],
co:["Colombia","Colombia","am",170],pe:["Peru","Perú","am",604],cl:["Chile","Chile","am",152],cu:["Cuba","Cuba","am",192],ve:["Venezuela","Venezuela","am",862],
do:["Dominican Republic","República Dominicana","am",214],ec:["Ecuador","Ecuador","am",218],uy:["Uruguay","Uruguay","am",858],py:["Paraguay","Paraguay","am",600],bo:["Bolivia","Bolivia","am",68],
gt:["Guatemala","Guatemala","am",320],hn:["Honduras","Honduras","am",340],sv:["El Salvador","El Salvador","am",222],cr:["Costa Rica","Costa Rica","am",188],pa:["Panama","Panamá","am",591],
ni:["Nicaragua","Nicaragua","am",558],jm:["Jamaica","Jamaica","am",388],ht:["Haiti","Haití","am",332],bs:["Bahamas","Bahamas","am",44],tt:["Trinidad and Tobago","Trinidad y Tobago","am",780],
bz:["Belize","Belice","am",84],gy:["Guyana","Guyana","am",328],sr:["Suriname","Surinam","am",740],bb:["Barbados","Barbados","am",52],ag:["Antigua and Barbuda","Antigua y Barbuda","am",28],
dm:["Dominica","Dominica","am",212],gd:["Grenada","Granada","am",308],kn:["Saint Kitts and Nevis","San Cristóbal y Nieves","am",659],lc:["Saint Lucia","Santa Lucía","am",662],vc:["Saint Vincent and the Grenadines","San Vicente y las Granadinas","am",670],
es:["Spain","España","eu",724],fr:["France","Francia","eu",250],it:["Italy","Italia","eu",380],gb:["United Kingdom","Reino Unido","eu",826],de:["Germany","Alemania","eu",276],
ru:["Russia","Rusia","eu",643],pt:["Portugal","Portugal","eu",620],gr:["Greece","Grecia","eu",300],nl:["Netherlands","Países Bajos","eu",528],ch:["Switzerland","Suiza","eu",756],
se:["Sweden","Suecia","eu",752],no:["Norway","Noruega","eu",578],ie:["Ireland","Irlanda","eu",372],pl:["Poland","Polonia","eu",616],be:["Belgium","Bélgica","eu",56],
at:["Austria","Austria","eu",40],dk:["Denmark","Dinamarca","eu",208],fi:["Finland","Finlandia","eu",246],ua:["Ukraine","Ucrania","eu",804],cz:["Czechia","Chequia","eu",203],
hu:["Hungary","Hungría","eu",348],ro:["Romania","Rumania","eu",642],is:["Iceland","Islandia","eu",352],hr:["Croatia","Croacia","eu",191],va:["Vatican City","Ciudad del Vaticano","eu",336],
mc:["Monaco","Mónaco","eu",492],rs:["Serbia","Serbia","eu",688],bg:["Bulgaria","Bulgaria","eu",100],sk:["Slovakia","Eslovaquia","eu",703],si:["Slovenia","Eslovenia","eu",705],
ba:["Bosnia and Herzegovina","Bosnia y Herzegovina","eu",70],me:["Montenegro","Montenegro","eu",499],mk:["North Macedonia","Macedonia del Norte","eu",807],al:["Albania","Albania","eu",8],xk:["Kosovo","Kosovo","eu",0],
md:["Moldova","Moldavia","eu",498],by:["Belarus","Bielorrusia","eu",112],lt:["Lithuania","Lituania","eu",440],lv:["Latvia","Letonia","eu",428],ee:["Estonia","Estonia","eu",233],
lu:["Luxembourg","Luxemburgo","eu",442],mt:["Malta","Malta","eu",470],cy:["Cyprus","Chipre","eu",196],li:["Liechtenstein","Liechtenstein","eu",438],ad:["Andorra","Andorra","eu",20],
sm:["San Marino","San Marino","eu",674],
jp:["Japan","Japón","as",392],cn:["China","China","as",156],in:["India","India","as",356],kr:["South Korea","Corea del Sur","as",410],tr:["Turkey","Turquía","as",792],
sa:["Saudi Arabia","Arabia Saudita","as",682],il:["Israel","Israel","as",376],th:["Thailand","Tailandia","as",764],vn:["Vietnam","Vietnam","as",704],ph:["Philippines","Filipinas","as",608],
id:["Indonesia","Indonesia","as",360],pk:["Pakistan","Pakistán","as",586],ir:["Iran","Irán","as",364],iq:["Iraq","Irak","as",368],kp:["North Korea","Corea del Norte","as",408],
ae:["United Arab Emirates","Emiratos Árabes Unidos","as",784],qa:["Qatar","Catar","as",634],sg:["Singapore","Singapur","as",702],my:["Malaysia","Malasia","as",458],tw:["Taiwan","Taiwán","as",158],
mn:["Mongolia","Mongolia","as",496],af:["Afghanistan","Afganistán","as",4],bd:["Bangladesh","Bangladés","as",50],lk:["Sri Lanka","Sri Lanka","as",144],np:["Nepal","Nepal","as",524],
kh:["Cambodia","Camboya","as",116],la:["Laos","Laos","as",418],mm:["Myanmar","Myanmar","as",104],jo:["Jordan","Jordania","as",400],lb:["Lebanon","Líbano","as",422],
sy:["Syria","Siria","as",760],ps:["Palestine","Palestina","as",275],kw:["Kuwait","Kuwait","as",414],om:["Oman","Omán","as",512],kz:["Kazakhstan","Kazajistán","as",398],
uz:["Uzbekistan","Uzbekistán","as",860],tm:["Turkmenistan","Turkmenistán","as",795],kg:["Kyrgyzstan","Kirguistán","as",417],tj:["Tajikistan","Tayikistán","as",762],ge:["Georgia","Georgia","as",268],
am:["Armenia","Armenia","as",51],az:["Azerbaijan","Azerbaiyán","as",31],ye:["Yemen","Yemen","as",887],bh:["Bahrain","Baréin","as",48],bt:["Bhutan","Bután","as",64],
bn:["Brunei","Brunéi","as",96],tl:["Timor-Leste","Timor Oriental","as",626],mv:["Maldives","Maldivas","as",462],
eg:["Egypt","Egipto","af",818],za:["South Africa","Sudáfrica","af",710],ma:["Morocco","Marruecos","af",504],ng:["Nigeria","Nigeria","af",566],ke:["Kenya","Kenia","af",404],
dz:["Algeria","Argelia","af",12],tn:["Tunisia","Túnez","af",788],sn:["Senegal","Senegal","af",686],gh:["Ghana","Ghana","af",288],ci:["Ivory Coast","Costa de Marfil","af",384],
et:["Ethiopia","Etiopía","af",231],cm:["Cameroon","Camerún","af",120],cd:["DR Congo","República Democrática del Congo","af",180],ao:["Angola","Angola","af",24],mg:["Madagascar","Madagascar","af",450],
ly:["Libya","Libia","af",434],sd:["Sudan","Sudán","af",729],ss:["South Sudan","Sudán del Sur","af",728],er:["Eritrea","Eritrea","af",232],dj:["Djibouti","Yibuti","af",262],
so:["Somalia","Somalia","af",706],ug:["Uganda","Uganda","af",800],rw:["Rwanda","Ruanda","af",646],bi:["Burundi","Burundi","af",108],tz:["Tanzania","Tanzania","af",834],
cg:["Republic of the Congo","República del Congo","af",178],ga:["Gabon","Gabón","af",266],gq:["Equatorial Guinea","Guinea Ecuatorial","af",226],cf:["Central African Republic","República Centroafricana","af",140],td:["Chad","Chad","af",148],
ne:["Niger","Níger","af",562],ml:["Mali","Malí","af",466],mr:["Mauritania","Mauritania","af",478],gm:["Gambia","Gambia","af",270],gw:["Guinea-Bissau","Guinea-Bisáu","af",624],
gn:["Guinea","Guinea","af",324],sl:["Sierra Leone","Sierra Leona","af",694],lr:["Liberia","Liberia","af",430],tg:["Togo","Togo","af",768],bj:["Benin","Benín","af",204],
bf:["Burkina Faso","Burkina Faso","af",854],cv:["Cape Verde","Cabo Verde","af",132],st:["São Tomé and Príncipe","Santo Tomé y Príncipe","af",678],zm:["Zambia","Zambia","af",894],zw:["Zimbabwe","Zimbabue","af",716],
mw:["Malawi","Malaui","af",454],mz:["Mozambique","Mozambique","af",508],na:["Namibia","Namibia","af",516],bw:["Botswana","Botsuana","af",72],ls:["Lesotho","Lesoto","af",426],
sz:["Eswatini","Esuatini","af",748],mu:["Mauritius","Mauricio","af",480],sc:["Seychelles","Seychelles","af",690],km:["Comoros","Comoras","af",174],
au:["Australia","Australia","oc",36],nz:["New Zealand","Nueva Zelanda","oc",554],fj:["Fiji","Fiyi","oc",242],pg:["Papua New Guinea","Papúa Nueva Guinea","oc",598],sb:["Solomon Islands","Islas Salomón","oc",90],
vu:["Vanuatu","Vanuatu","oc",548],ws:["Samoa","Samoa","oc",882],to:["Tonga","Tonga","oc",776],ki:["Kiribati","Kiribati","oc",296],tv:["Tuvalu","Tuvalu","oc",798],
nr:["Nauru","Nauru","oc",520],fm:["Micronesia","Micronesia","oc",583],mh:["Marshall Islands","Islas Marshall","oc",584],pw:["Palau","Palaos","oc",585]
};
// orden en que se aprenden: primero los conocidos, luego mezclando regiones
const WORLD_ORDER=("mx us ca br ar es fr it jp cn gb de co pe cl in kr au ru pt cu ve eg za gr do ec uy py bo gt hn sv cr pa ni nl ch se no "+
 "ie tr ma ng ke sa il nz th vn ph id pk jm ht pl be at dk fi ua ir iq kp ae qa cz hu ro is hr va mc sg my dz tn sn gh ci "+
 "et cm cd ao mg tw mn af bd lk np kh la mm jo lb sy ps kw om bs tt bz gy sr rs bg sk si ba me mk al xk md by lt lv ee lu "+
 "mt cy li ad sm kz uz tm kg tj ge am az ye bh bt bn tl mv bb ly sd ss er dj so ug rw bi tz cg ga gq cf td ne ml mr gm gw "+
 "gn sl lr tg bj bf cv st zm zw mw mz na bw ls sz mu sc km fj pg sb vu ws to ki tv nr fm mh pw ag dm gd kn lc vc").split(" ");
// si el mapa no trae la forma (países diminutos), se marca este punto [lon, lat]
const WORLD_POINTS={va:[12.45,41.90],mc:[7.42,43.74],sm:[12.46,43.94],li:[9.55,47.16],ad:[1.52,42.51],mt:[14.4,35.9],nr:[166.93,-.52],tv:[179.2,-8.5],
 mh:[171.2,7.1],ki:[173,1.4],pw:[134.5,7.5],fm:[158.2,6.9],sg:[103.8,1.35],bh:[50.55,26.07],mv:[73.5,4.2],sc:[55.45,-4.6],km:[43.3,-11.7],mu:[57.55,-20.2],
 st:[6.6,.3],cv:[-23.6,15.1],ag:[-61.8,17.1],dm:[-61.37,15.42],gd:[-61.68,12.12],kn:[-62.75,17.3],lc:[-60.98,13.9],vc:[-61.2,13.25],bb:[-59.55,13.17],
 to:[-175.2,-21.2],ws:[-172.1,-13.75],xk:[20.9,42.6]};
// otras formas de escribirlos que también valen
const WORLD_ALIAS={us:["usa","eeuu","ee uu","eua","united states of america","estados unidos de america","america"],gb:["uk","great britain","gran bretana","britain"],
 cd:["drc","rdc","congo kinshasa","democratic republic of the congo","rd congo","congo democratico"],cg:["congo","congo brazzaville","republic of congo"],
 ci:["cote d ivoire","cote divoire"],cz:["czech republic","republica checa"],mm:["burma","birmania"],sz:["swaziland","suazilandia"],tl:["east timor"],
 va:["vatican","vaticano","holy see","santa sede"],mk:["macedonia"],kr:["korea","corea","republic of korea"],ae:["uae","emiratos","eau"],tr:["turkiye"],
 nl:["holland","holanda"],bs:["the bahamas"],gm:["the gambia"],cv:["cabo verde"],fm:["federated states of micronesia","estados federados de micronesia"],
 sa:["arabia saudi"],bd:["bangladesh"],ru:["russian federation","federacion rusa"],lc:["st lucia"],kn:["st kitts and nevis","saint kitts"],vc:["st vincent","saint vincent","san vicente"],
 ag:["antigua"],tt:["trinidad"],ba:["bosnia"],st:["sao tome","santo tome"],pg:["papua"],ps:["state of palestine","estado de palestina"],cf:["car","rca"],
 ir:["persia"],lk:["ceylon","ceilan"],la:["lao"],vn:["viet nam"],kg:["kirguizistan"],by:["bielorusia"],dz:["algerie"],ma:["maroc"]};

/* ---------- estados de EE. UU.: "us-xx" → [inglés, español, región] ---------- */
const STATES={
"us-al":["Alabama","Alabama","so"],"us-ak":["Alaska","Alaska","we"],"us-az":["Arizona","Arizona","we"],"us-ar":["Arkansas","Arkansas","so"],"us-ca":["California","California","we"],
"us-co":["Colorado","Colorado","we"],"us-ct":["Connecticut","Connecticut","ne"],"us-de":["Delaware","Delaware","so"],"us-fl":["Florida","Florida","so"],"us-ga":["Georgia","Georgia","so"],
"us-hi":["Hawaii","Hawái","we"],"us-id":["Idaho","Idaho","we"],"us-il":["Illinois","Illinois","mw"],"us-in":["Indiana","Indiana","mw"],"us-ia":["Iowa","Iowa","mw"],
"us-ks":["Kansas","Kansas","mw"],"us-ky":["Kentucky","Kentucky","so"],"us-la":["Louisiana","Luisiana","so"],"us-me":["Maine","Maine","ne"],"us-md":["Maryland","Maryland","so"],
"us-ma":["Massachusetts","Massachusetts","ne"],"us-mi":["Michigan","Míchigan","mw"],"us-mn":["Minnesota","Minnesota","mw"],"us-ms":["Mississippi","Misisipi","so"],"us-mo":["Missouri","Misuri","mw"],
"us-mt":["Montana","Montana","we"],"us-ne":["Nebraska","Nebraska","mw"],"us-nv":["Nevada","Nevada","we"],"us-nh":["New Hampshire","Nuevo Hampshire","ne"],"us-nj":["New Jersey","Nueva Jersey","ne"],
"us-nm":["New Mexico","Nuevo México","we"],"us-ny":["New York","Nueva York","ne"],"us-nc":["North Carolina","Carolina del Norte","so"],"us-nd":["North Dakota","Dakota del Norte","mw"],"us-oh":["Ohio","Ohio","mw"],
"us-ok":["Oklahoma","Oklahoma","so"],"us-or":["Oregon","Oregón","we"],"us-pa":["Pennsylvania","Pensilvania","ne"],"us-ri":["Rhode Island","Rhode Island","ne"],"us-sc":["South Carolina","Carolina del Sur","so"],
"us-sd":["South Dakota","Dakota del Sur","mw"],"us-tn":["Tennessee","Tennessee","so"],"us-tx":["Texas","Texas","so"],"us-ut":["Utah","Utah","we"],"us-vt":["Vermont","Vermont","ne"],
"us-va":["Virginia","Virginia","so"],"us-wa":["Washington","Washington","we"],"us-wv":["West Virginia","Virginia Occidental","so"],"us-wi":["Wisconsin","Wisconsin","mw"],"us-wy":["Wyoming","Wyoming","we"]
};
const STATES_ORDER=("ca tx fl ny nc ak hi az wa nv co il ga sc va pa nj ma oh mi tn la ok nm ut or mn wi mo ky al ms ar in ia ks ne sd nd mt wy id wv md de ct ri vt nh me")
 .split(" ").map(s=>"us-"+s);
const STATES_ALIAS={"us-hi":["hawai"],"us-tn":["tenesi"],"us-nh":["nueva hampshire"],"us-ms":["misisipi","misisipí"],"us-mo":["misuri"],"us-pa":["pensilvania"],
 "us-wv":["west virginia"],"us-nc":["n carolina"],"us-sc":["s carolina"],"us-nd":["n dakota"],"us-sd":["s dakota"]};

/* ---------- niveles ---------- */
const WORLD_RANKS=[
  {n:10,name:"Heródoto",en:"Herodotus",es_t:"Viajó por Egipto, Babilonia y Grecia y lo contó en sus Historias (siglo V a. C.).",en_t:"Travelled through Egypt, Babylon and Greece and wrote it all down in his Histories (5th century BC)."},
  {n:20,name:"Piteas",en:"Pytheas",es_t:"Navegó desde Massalia (Marsella) hasta Britania y el mar del Norte hacia el 325 a. C.",en_t:"Sailed from Massalia (Marseille) to Britain and the North Sea around 325 BC."},
  {n:35,name:"Marco Polo",es_t:"Pasó 24 años viajando por Asia y sirvió en la corte de Kublai Kan (1271–1295).",en_t:"Spent 24 years travelling across Asia and served at Kublai Khan's court (1271–1295)."},
  {n:50,name:"Ibn Battuta",es_t:"Recorrió unos 117.000 km por África, Asia y Europa en casi 30 años (1325–1354).",en_t:"Covered about 117,000 km across Africa, Asia and Europe in almost 30 years (1325–1354)."},
  {n:70,name:"Zheng He",es_t:"Dirigió siete grandes flotas chinas hasta las costas de África (1405–1433).",en_t:"Led seven great Chinese fleets as far as the coast of Africa (1405–1433)."},
  {n:90,name:"Elcano",es_t:"Completó la primera vuelta al mundo en 1522, tras la muerte de Magallanes.",en_t:"Completed the first trip around the world in 1522, after Magellan's death."},
  {n:115,name:"James Cook",es_t:"Cartografió Nueva Zelanda y la costa este de Australia en tres viajes (1768–1779).",en_t:"Mapped New Zealand and Australia's east coast over three voyages (1768–1779)."},
  {n:140,name:"Humboldt",es_t:"Exploró Venezuela, Colombia, Ecuador, Perú, Cuba y México entre 1799 y 1804.",en_t:"Explored Venezuela, Colombia, Ecuador, Peru, Cuba and Mexico between 1799 and 1804."},
  {n:170,name:"Nellie Bly",es_t:"Dio la vuelta al mundo en 72 días (1889–1890), más rápido que el héroe de Julio Verne.",en_t:"Went around the world in 72 days (1889–1890), faster than Jules Verne's hero."},
  {n:193,name:"La ONU",en:"The UN",es_t:"Tiene 193 estados miembros. Ya reconoces tantos países como ella.",en_t:"It has 193 member states. You now recognize as many countries."},
  {n:197,name:"El mundo entero",en:"The whole world",es_t:"Los 193 de la ONU más Vaticano, Palestina, Kosovo y Taiwán.",en_t:"The 193 UN members plus Vatican City, Palestine, Kosovo and Taiwan."}
];
const STATES_RANKS=[
  {n:8,name:"Los peregrinos",en:"The Pilgrims",es_t:"Llegaron en el Mayflower a Plymouth, Massachusetts, en 1620.",en_t:"Arrived on the Mayflower at Plymouth, Massachusetts, in 1620."},
  {n:15,name:"Lewis y Clark",en:"Lewis and Clark",es_t:"Cruzaron desde Misuri hasta el Pacífico entre 1804 y 1806.",en_t:"Crossed from Missouri to the Pacific between 1804 and 1806."},
  {n:22,name:"Pony Express",es_t:"Llevaba el correo de Misuri a California en unos 10 días (1860–1861).",en_t:"Carried the mail from Missouri to California in about 10 days (1860–1861)."},
  {n:30,name:"El Transcontinental",en:"The Transcontinental",es_t:"El primer tren de costa a costa se unió en Promontory, Utah, en 1869.",en_t:"The first coast-to-coast railroad was joined at Promontory, Utah, in 1869."},
  {n:40,name:"Ruta 66",en:"Route 66",es_t:"Unía Chicago con Santa Mónica pasando por 8 estados (1926).",en_t:"Linked Chicago and Santa Monica through 8 states (1926)."},
  {n:50,name:"Las 50 estrellas",en:"The 50 stars",es_t:"La bandera de 50 estrellas ondea desde 1960, tras la llegada de Hawái.",en_t:"The 50-star flag has flown since 1960, after Hawaii joined."}
];
