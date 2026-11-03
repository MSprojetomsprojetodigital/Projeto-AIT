// ============================================
// PLACAS DE TRÂNSITO — desenhos próprios em SVG
// Baseado no Manual Brasileiro de Sinalização de Trânsito (CONTRAN)
// Os desenhos são simplificados, para fins de estudo.
// ============================================
(function(){
const K='#111',RED='#d32f2f',YEL='#fbc02d',ORG='#ef6c00',W='#fff',GRN='#1b7f3a',BLU='#1565c0',BRN='#7b4a26';

// ---------- utilidades de desenho ----------
const svg=(inner,vb='0 0 100 100')=>`<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" class="sign-svg" role="img">${inner}</svg>`;
const g=(inner,x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
const txt=(t,x,y,size,fill=K,weight=800)=>`<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif">${t}</text>`;

function arcPts(cx,cy,r,a0,a1,n=12){const p=[];for(let i=0;i<=n;i++){const a=(a0+(a1-a0)*i/n)*Math.PI/180;p.push([cx+r*Math.cos(a),cy+r*Math.sin(a)]);}return p;}
function arrow(pts,w=8,color=K){
  const n=pts.length,[x2,y2]=pts[n-1],[x1,y1]=pts[n-2];
  let dx=x2-x1,dy=y2-y1;const L=Math.hypot(dx,dy)||1;dx/=L;dy/=L;
  const hl=w*2.1,hw=w*1.4;
  const body=pts.slice(0,-1).filter(p=>Math.hypot(p[0]-x2,p[1]-y2)>hl).concat([[x2-dx*hl*0.8,y2-dy*hl*0.8]]);
  const bx=x2-dx*hl,by=y2-dy*hl,nx=-dy,ny=dx;
  return `<polyline points="${body.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linejoin="round"/>`+
    `<polygon points="${x2},${y2} ${bx+nx*hw},${by+ny*hw} ${bx-nx*hw},${by-ny*hw}" fill="${color}"/>`;
}
const line=(pts,w=6,color=K,cap='butt')=>`<polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="${cap}" stroke-linejoin="round"/>`;

// ---------- molduras ----------
const reg=(inner,proib=false)=>svg(`<circle cx="50" cy="50" r="47" fill="${RED}"/><circle cx="50" cy="50" r="37" fill="${W}"/>${inner}${proib?`<line x1="24" y1="24" x2="76" y2="76" stroke="${RED}" stroke-width="8"/>`:''}`);
const adv=(inner,bg=YEL)=>svg(`<polygon points="50,2 98,50 50,98 2,50" fill="${K}"/><polygon points="50,7 93,50 50,93 7,50" fill="${bg}"/>${inner}`);
const rect=(bg,inner,border=W,vb='0 0 140 80')=>svg(`<rect x="2" y="2" width="136" height="76" rx="8" fill="${bg}" stroke="${border}" stroke-width="3"/>${inner}`,vb);

// ---------- pictogramas (centro em 0,0; largura ~40) ----------
const P={
 car:`<path d="M-20,4 L-20,-2 L-13,-3.5 L-8,-11 L8,-11 L13,-3.5 L20,-2 L20,4 Z" fill="${K}"/><path d="M-6,-9 L-2,-9 L-2,-4 L-10,-4 Z M1,-9 L6,-9 L10,-4 L1,-4 Z" fill="${W}"/><circle cx="-11" cy="5" r="4.5" fill="${K}"/><circle cx="11" cy="5" r="4.5" fill="${K}"/><circle cx="-11" cy="5" r="1.6" fill="${W}"/><circle cx="11" cy="5" r="1.6" fill="${W}"/>`,
 truck:`<rect x="-21" y="-15" width="27" height="19" fill="${K}"/><path d="M8,-11 L15,-11 L20,-4 L20,4 L8,4 Z" fill="${K}"/><path d="M10,-9 L14,-9 L17,-4 L10,-4 Z" fill="${W}"/><circle cx="-14" cy="6" r="4.5" fill="${K}"/><circle cx="-4" cy="6" r="4.5" fill="${K}"/><circle cx="14" cy="6" r="4.5" fill="${K}"/><circle cx="-14" cy="6" r="1.5" fill="${W}"/><circle cx="-4" cy="6" r="1.5" fill="${W}"/><circle cx="14" cy="6" r="1.5" fill="${W}"/>`,
 bus:`<rect x="-22" y="-13" width="44" height="18" rx="3" fill="${K}"/><rect x="-19" y="-10" width="7" height="6" fill="${W}"/><rect x="-10" y="-10" width="7" height="6" fill="${W}"/><rect x="-1" y="-10" width="7" height="6" fill="${W}"/><rect x="8" y="-10" width="10" height="6" fill="${W}"/><circle cx="-13" cy="6" r="4.5" fill="${K}"/><circle cx="13" cy="6" r="4.5" fill="${K}"/><circle cx="-13" cy="6" r="1.5" fill="${W}"/><circle cx="13" cy="6" r="1.5" fill="${W}"/>`,
 moto:`<circle cx="-13" cy="5" r="6" fill="none" stroke="${K}" stroke-width="3"/><circle cx="13" cy="5" r="6" fill="none" stroke="${K}" stroke-width="3"/><path d="M-13,5 L-5,-4 L7,-4 L13,5" fill="none" stroke="${K}" stroke-width="3.5"/><path d="M-6,-6 L5,-6 L4,-1 L-5,-1 Z" fill="${K}"/><path d="M7,-4 L9,-11 L13,-11" fill="none" stroke="${K}" stroke-width="3"/>`,
 bike:`<circle cx="-12" cy="5" r="7" fill="none" stroke="${K}" stroke-width="2.8"/><circle cx="12" cy="5" r="7" fill="none" stroke="${K}" stroke-width="2.8"/><path d="M-12,5 L-3,-6 L8,-6 L12,5 M-3,-6 L1,5 L8,-6 M-6,-9 L-1,-9 M8,-6 L7,-11 L11,-11" fill="none" stroke="${K}" stroke-width="2.8" stroke-linejoin="round"/>`,
 ped:`<circle cx="1" cy="-15" r="4.2" fill="${K}"/><path d="M0,-9 L-1,3 M0,-7 L-7,-1 M0,-7 L6,-2 M-1,3 L-7,14 M-1,3 L5,14" fill="none" stroke="${K}" stroke-width="4.5" stroke-linecap="round"/>`,
 tractor:`<circle cx="-8" cy="3" r="9" fill="${K}"/><circle cx="-8" cy="3" r="3" fill="${W}"/><circle cx="13" cy="7" r="5" fill="${K}"/><circle cx="13" cy="7" r="1.6" fill="${W}"/><rect x="-3" y="-5" width="21" height="8" fill="${K}"/><path d="M-14,-6 L-14,-17 L-1,-17 L-1,-6" fill="none" stroke="${K}" stroke-width="3"/><rect x="11" y="-12" width="2.5" height="7" fill="${K}"/>`,
 cow:`<ellipse cx="-2" cy="-2" rx="15" ry="7.5" fill="${K}"/><path d="M11,-6 L18,-9 L21,-4 L16,0 Z" fill="${K}"/><path d="M16,-9 L15,-13 M19,-9 L21,-12" stroke="${K}" stroke-width="2"/><rect x="-14" y="2" width="3.5" height="11" fill="${K}"/><rect x="-8" y="2" width="3.5" height="11" fill="${K}"/><rect x="3" y="2" width="3.5" height="11" fill="${K}"/><rect x="8" y="2" width="3.5" height="11" fill="${K}"/><path d="M-17,-4 L-20,6" stroke="${K}" stroke-width="2"/>`,
 deer:`<path d="M-16,-2 Q-14,-9 0,-8 Q8,-8 9,-5 L12,-15 L16,-15 L15,-4 Q12,2 8,2 L-14,2 Q-18,1 -16,-2 Z" fill="${K}"/><path d="M13,-15 L10,-22 M13,-15 L13,-23 M15,-15 L19,-22 M10,-22 L7,-24 M19,-22 L22,-24" stroke="${K}" stroke-width="2"/><path d="M-13,1 L-15,13 M-9,1 L-8,13 M3,1 L1,13 M7,1 L9,13" stroke="${K}" stroke-width="3"/>`,
 train:`<rect x="-20" y="-8" width="28" height="14" fill="${K}"/><rect x="8" y="-15" width="13" height="21" fill="${K}"/><rect x="11" y="-12" width="7" height="6" fill="${W}"/><rect x="-16" y="-15" width="5" height="7" fill="${K}"/><circle cx="-14" cy="8" r="4.5" fill="${K}"/><circle cx="-3" cy="8" r="4.5" fill="${K}"/><circle cx="13" cy="8" r="4.5" fill="${K}"/><circle cx="-14" cy="8" r="1.5" fill="${W}"/><circle cx="-3" cy="8" r="1.5" fill="${W}"/><circle cx="13" cy="8" r="1.5" fill="${W}"/>`,
 plane:`<path d="M0,-20 Q3,-20 3,-14 L3,-4 L20,5 L20,9 L3,4 L3,13 L8,17 L8,20 L0,18 L-8,20 L-8,17 L-3,13 L-3,4 L-20,9 L-20,5 L-3,-4 L-3,-14 Q-3,-20 0,-20 Z" fill="${K}"/>`,
 cart:`<ellipse cx="9" cy="-4" rx="9" ry="5" fill="${K}"/><path d="M15,-7 L19,-15 L23,-13 L19,-5 Z" fill="${K}"/><path d="M3,0 L2,10 M7,0 L7,10 M12,0 L13,10 M16,-1 L17,10" stroke="${K}" stroke-width="2.4"/><rect x="-22" y="-8" width="16" height="7" fill="${K}"/><path d="M-6,-5 L2,-4" stroke="${K}" stroke-width="2"/><circle cx="-14" cy="4" r="6" fill="none" stroke="${K}" stroke-width="2.6"/>`,
 horn:`<path d="M-14,-5 L-4,-5 L12,-14 L12,14 L-4,5 L-14,5 Z" fill="${K}"/><rect x="-18" y="-3" width="5" height="6" fill="${K}"/>`,
 worker:`<circle cx="4" cy="-17" r="4.5" fill="${K}"/><path d="M3,-11 L-2,3 M1,-8 L9,-3 M1,-7 L-8,-6 M-2,3 L-8,15 M-2,3 L5,15" fill="none" stroke="${K}" stroke-width="4.5" stroke-linecap="round"/><path d="M-8,-6 L-16,12" stroke="${K}" stroke-width="2.5"/><path d="M-20,11 L-12,13 L-15,18 Z" fill="${K}"/><path d="M8,15 L20,15 L17,10 Z" fill="${K}"/>`,
 skid:`<path d="M-20,4 L-20,-2 L-13,-3.5 L-8,-11 L8,-11 L13,-3.5 L20,-2 L20,4 Z" fill="${K}"/><circle cx="-11" cy="5" r="4.5" fill="${K}"/><circle cx="11" cy="5" r="4.5" fill="${K}"/><path d="M-14,12 Q-8,17 -14,24 M-8,12 Q-2,17 -8,24 M8,12 Q14,17 8,24 M14,12 Q20,17 14,24" fill="none" stroke="${K}" stroke-width="2.5"/>`
};
const pic=(name,x=50,y=52,s=1)=>g(P[name],x,y,s);
const kids=g(`<g transform="translate(-9 3) scale(.8)">${P.ped}</g><g transform="translate(9 6) scale(.62)">${P.ped}</g>`,50,50);
const lightsTL=`<rect x="40" y="24" width="20" height="52" rx="5" fill="${K}"/><circle cx="50" cy="34" r="6.5" fill="#e53935"/><circle cx="50" cy="50" r="6.5" fill="#fdd835"/><circle cx="50" cy="66" r="6.5" fill="#43a047"/>`;
const pareMini=(cx,cy,r)=>{const p=[];for(let i=0;i<8;i++){const a=(22.5+45*i)*Math.PI/180;p.push((cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1));}return `<polygon points="${p.join(' ')}" fill="${RED}" stroke="${W}" stroke-width="2"/>`+txt('PARE',cx,cy+r*0.28,r*0.62,W);};

// ---------- placas especiais ----------
const R1=svg((()=>{const o=(r)=>{const p=[];for(let i=0;i<8;i++){const a=(22.5+45*i)*Math.PI/180;p.push((50+r*Math.cos(a)).toFixed(1)+','+(50+r*Math.sin(a)).toFixed(1));}return p.join(' ');};return `<polygon points="${o(49)}" fill="${W}"/><polygon points="${o(45)}" fill="${RED}"/>${txt('PARE',50,60,27,W)}`;})());
const R2=svg(`<polygon points="4,10 96,10 50,92" fill="${RED}"/><polygon points="20,19 80,19 50,72" fill="${W}"/>`);
const R3=svg(`<circle cx="50" cy="50" r="47" fill="${RED}"/><rect x="18" y="42" width="64" height="16" fill="${W}"/>`);
const A41=svg(`<g transform="rotate(35 50 50)"><rect x="4" y="41" width="92" height="18" fill="${RED}"/><rect x="7" y="44" width="86" height="12" fill="${W}"/></g><g transform="rotate(-35 50 50)"><rect x="4" y="41" width="92" height="18" fill="${RED}"/><rect x="7" y="44" width="86" height="12" fill="${W}"/></g>`);

// ---------- dispositivos de obra ----------
const cone=svg(`<path d="M42,14 L58,14 L76,82 L24,82 Z" fill="${ORG}"/><path d="M38,32 L62,32 L66,46 L34,46 Z" fill="${W}"/><path d="M30,58 L70,58 L73,70 L27,70 Z" fill="${W}"/><rect x="16" y="82" width="68" height="8" fill="${K}"/>`);
const cavalete=svg(`<rect x="8" y="22" width="84" height="22" fill="${W}" stroke="${K}" stroke-width="1"/><clipPath id="cvc"><rect x="8" y="22" width="84" height="22"/></clipPath><g clip-path="url(#cvc)">${[0,1,2,3,4,5,6].map(i=>`<path d="M${i*16-6},44 L${i*16+6},22 L${i*16+14},22 L${i*16+2},44 Z" fill="${ORG}"/>`).join('')}</g><path d="M18,44 L10,90 M82,44 L90,90 M22,44 L30,90 M78,44 L70,90" stroke="${K}" stroke-width="4"/>`);
const tambor=svg(`<rect x="28" y="14" width="44" height="74" rx="8" fill="${ORG}"/><rect x="28" y="30" width="44" height="12" fill="${W}"/><rect x="28" y="56" width="44" height="12" fill="${W}"/><rect x="22" y="86" width="56" height="6" fill="${K}"/>`);

// ---------- textos de placas retangulares ----------
const rtxt=(lines,bg,fg,border)=>{const mx=Math.max(...lines.map(l=>l.length));const fs=Math.min(18,Math.floor(170/mx));return rect(bg,lines.map((l,i)=>txt(l,70,(lines.length===1?56:34+i*26),fs,fg,800)).join(''),border);};

// ============================================
// LISTA DE PLACAS
// ============================================
const SIGNS=[
// ----- REGULAMENTAÇÃO -----
{code:'R-1',name:'Parada obrigatória',group:'reg',svg:R1,meaning:'O condutor deve parar completamente o veículo antes de entrar na via e só seguir quando for seguro.',tip:'É a única placa octogonal (8 lados). Dá para reconhecer até de costas.'},
{code:'R-2',name:'Dê a preferência',group:'reg',svg:R2,meaning:'O condutor deve reduzir a velocidade e dar preferência aos veículos da via em que vai entrar.',tip:'É a única placa em forma de triângulo com a ponta para baixo.'},
{code:'R-3',name:'Sentido proibido',group:'reg',svg:R3,meaning:'Proíbe seguir em frente: aquela via ou pista é contramão para você.',tip:'Círculo vermelho com uma faixa branca no meio.'},
{code:'R-4a',name:'Proibido virar à esquerda',group:'reg',svg:reg(arrow([[58,72],[58,46],[32,46]],8),true),meaning:'É proibido fazer a conversão à esquerda.',tip:'Seta virando para a esquerda, cortada pela faixa vermelha.'},
{code:'R-4b',name:'Proibido virar à direita',group:'reg',svg:reg(arrow([[42,72],[42,46],[68,46]],8),true),meaning:'É proibido fazer a conversão à direita.',tip:'Seta virando para a direita, cortada pela faixa vermelha.'},
{code:'R-5a',name:'Proibido retornar à esquerda',group:'reg',svg:reg(arrow([[62,74],[62,44]].concat(arcPts(50,44,12,0,-180,10)).concat([[38,64]]),7),true),meaning:'É proibido fazer o retorno (meia-volta) pela esquerda.',tip:'Seta em forma de "U" com a faixa vermelha.'},
{code:'R-6a',name:'Proibido estacionar',group:'reg',svg:reg(txt('E',50,66,46),true),meaning:'É proibido estacionar. A parada rápida para embarque e desembarque é permitida.',tip:'Letra "E" cortada por UMA faixa vermelha.'},
{code:'R-6b',name:'Estacionamento regulamentado',group:'reg',svg:reg(txt('E',50,66,46)),meaning:'É permitido estacionar, seguindo as regras informadas (horário, tempo, tipo de veículo).',tip:'Letra "E" sem faixa vermelha. Geralmente vem com informação complementar.'},
{code:'R-6c',name:'Proibido parar e estacionar',group:'reg',svg:reg(txt('E',50,66,46)+`<line x1="24" y1="24" x2="76" y2="76" stroke="${RED}" stroke-width="8"/><line x1="76" y1="24" x2="24" y2="76" stroke="${RED}" stroke-width="8"/>`),meaning:'É proibido parar e também estacionar, nem por um instante.',tip:'Letra "E" com um "X" vermelho (duas faixas). É mais rígida que a R-6a.'},
{code:'R-7',name:'Proibido ultrapassar',group:'reg',svg:reg(pic('car',35,57,.72)+pic('car',65,43,.72),true),meaning:'É proibido ultrapassar outros veículos naquele trecho.',tip:'Dois carros e a faixa vermelha.'},
{code:'R-9',name:'Proibido trânsito de caminhões',group:'reg',svg:reg(pic('truck',50,52,1.05),true),meaning:'Caminhões não podem circular naquela via.',tip:'Desenho de caminhão cortado pela faixa vermelha.'},
{code:'R-10',name:'Proibido trânsito de veículos automotores',group:'reg',svg:reg(pic('car',50,54,1.1),true),meaning:'Veículos automotores não podem circular na via.',tip:'Desenho de carro cortado pela faixa vermelha.'},
{code:'R-11',name:'Proibido trânsito de veículos de tração animal',group:'reg',svg:reg(pic('cart',50,52,1),true),meaning:'Carroças e outros veículos puxados por animais não podem circular.',tip:'Desenho de carroça com animal e a faixa vermelha.'},
{code:'R-12',name:'Proibido trânsito de bicicletas',group:'reg',svg:reg(pic('bike',50,52,1.05),true),meaning:'Bicicletas não podem circular naquela via.',tip:'Bicicleta cortada pela faixa vermelha.'},
{code:'R-13',name:'Proibido trânsito de tratores e máquinas de obras',group:'reg',svg:reg(pic('tractor',50,52,1),true),meaning:'Tratores e máquinas de obras não podem circular.',tip:'Trator cortado pela faixa vermelha.'},
{code:'R-14',name:'Peso bruto total máximo permitido',group:'reg',svg:reg(txt('10t',50,62,30)),meaning:'Só podem passar veículos com peso total (veículo + carga) até o valor indicado.',tip:'Número seguido de "t" (toneladas).'},
{code:'R-15',name:'Altura máxima permitida',group:'reg',svg:reg(`<polygon points="38,20 62,20 50,30" fill="${K}"/><polygon points="38,80 62,80 50,70" fill="${K}"/>`+txt('3,0 m',50,57,17)),meaning:'Só podem passar veículos com altura até o valor indicado (ex.: viadutos e túneis).',tip:'Triângulos em cima e embaixo, apontando para o número.'},
{code:'R-16',name:'Largura máxima permitida',group:'reg',svg:reg(`<polygon points="20,38 20,62 30,50" fill="${K}"/><polygon points="80,38 80,62 70,50" fill="${K}"/>`+txt('1,8 m',50,56,15)),meaning:'Só podem passar veículos com largura até o valor indicado.',tip:'Triângulos dos lados, apontando para o número.'},
{code:'R-19',name:'Velocidade máxima permitida',group:'reg',svg:reg(txt('80',50,58,34)+txt('km/h',50,74,11,K,700)),meaning:'Indica a velocidade máxima permitida naquele trecho.',tip:'Número dentro do círculo vermelho. Ultrapassar pode ser infração média, grave ou gravíssima, conforme o excesso.'},
{code:'R-20',name:'Proibido acionar buzina ou sinal sonoro',group:'reg',svg:reg(pic('horn',50,50,1.15),true),meaning:'É proibido buzinar, comum perto de hospitais e escolas.',tip:'Corneta cortada pela faixa vermelha.'},
{code:'R-25a',name:'Vire à esquerda',group:'reg',svg:reg(arrow([[58,74],[58,48],[30,48]],8)),meaning:'O condutor é obrigado a virar à esquerda.',tip:'Seta sem faixa vermelha = obrigação.'},
{code:'R-25b',name:'Vire à direita',group:'reg',svg:reg(arrow([[42,74],[42,48],[70,48]],8)),meaning:'O condutor é obrigado a virar à direita.',tip:'Seta sem faixa vermelha = obrigação.'},
{code:'R-26',name:'Siga em frente',group:'reg',svg:reg(arrow([[50,78],[50,22]],9)),meaning:'O condutor é obrigado a seguir em frente.',tip:'Seta reta para cima.'},
{code:'R-28',name:'Duplo sentido de circulação',group:'reg',svg:reg(arrow([[38,76],[38,24]],7)+arrow([[62,24],[62,76]],7)),meaning:'A via tem trânsito nos dois sentidos (mão dupla).',tip:'Duas setas em sentidos opostos.'},
{code:'R-29',name:'Proibido trânsito de pedestres',group:'reg',svg:reg(pic('ped',50,52,1.15),true),meaning:'Pedestres não podem andar por ali.',tip:'Pedestre cortado pela faixa vermelha.'},
{code:'R-32',name:'Circulação exclusiva de ônibus',group:'reg',svg:reg(pic('bus',50,52,1)),meaning:'Faixa ou via só para ônibus.',tip:'Ônibus sem faixa vermelha.'},
{code:'R-33',name:'Sentido circular obrigatório',group:'reg',svg:reg(arrow(arcPts(50,50,20,200,300,8),6)+arrow(arcPts(50,50,20,320,420,8),6)+arrow(arcPts(50,50,20,80,180,8),6)),meaning:'Indica rotatória: circule no sentido indicado pelas setas.',tip:'Três setas formando um círculo.'},
{code:'R-34',name:'Circulação exclusiva de bicicletas',group:'reg',svg:reg(pic('bike',50,52,1.05)),meaning:'Via ou faixa exclusiva para bicicletas (ciclovia ou ciclofaixa).',tip:'Bicicleta sem faixa vermelha.'},
{code:'R-37',name:'Proibido trânsito de motocicletas, motonetas e ciclomotores',group:'reg',svg:reg(pic('moto',50,52,1.05),true),meaning:'Motos, motonetas e ciclomotores não podem circular.',tip:'Moto cortada pela faixa vermelha.'},
{code:'R-38',name:'Proibido trânsito de ônibus',group:'reg',svg:reg(pic('bus',50,52,1),true),meaning:'Ônibus não podem circular naquela via.',tip:'Ônibus cortado pela faixa vermelha.'},
{code:'R-39',name:'Circulação exclusiva de caminhão',group:'reg',svg:reg(pic('truck',50,52,1.05)),meaning:'Via ou faixa exclusiva para caminhões.',tip:'Caminhão sem faixa vermelha.'},

// ----- ADVERTÊNCIA -----
{code:'A-1a',name:'Curva acentuada à esquerda',group:'adv',svg:adv(arrow([[56,76],[56,40],[34,40]],8)),meaning:'Atenção: curva fechada à esquerda adiante. Reduza a velocidade.',tip:'Seta em ângulo (dobra forte).'},
{code:'A-1b',name:'Curva acentuada à direita',group:'adv',svg:adv(arrow([[44,76],[44,40],[66,40]],8)),meaning:'Atenção: curva fechada à direita adiante.',tip:'Seta em ângulo para a direita.'},
{code:'A-2a',name:'Curva à esquerda',group:'adv',svg:adv(arrow([[56,78],[56,58]].concat(arcPts(36,58,20,0,-80,8)),8)),meaning:'Curva suave à esquerda adiante.',tip:'Seta arredondada.'},
{code:'A-2b',name:'Curva à direita',group:'adv',svg:adv(arrow([[44,78],[44,58]].concat(arcPts(64,58,20,180,260,8)),8)),meaning:'Curva suave à direita adiante.',tip:'Seta arredondada para a direita.'},
{code:'A-3a',name:'Pista sinuosa à esquerda',group:'adv',svg:adv(arrow([[50,80],[50,72],[42,64],[58,52],[42,40],[50,30],[50,24]].map(p=>p),6)),meaning:'Várias curvas seguidas adiante, começando pela esquerda.',tip:'Seta em zigue-zague.'},
{code:'A-6',name:'Cruzamento de vias',group:'adv',svg:adv(`<rect x="44" y="22" width="12" height="56" fill="${K}"/><rect x="22" y="44" width="56" height="12" fill="${K}"/>`),meaning:'Cruzamento adiante.',tip:'Uma cruz (+).'},
{code:'A-7a',name:'Via lateral à esquerda',group:'adv',svg:adv(`<rect x="48" y="22" width="12" height="56" fill="${K}"/><rect x="26" y="40" width="24" height="10" fill="${K}"/>`),meaning:'Uma via entra pela esquerda adiante.',tip:'Traço vertical com um ramo saindo para a esquerda.'},
{code:'A-8',name:'Interseção em "T"',group:'adv',svg:adv(`<rect x="22" y="32" width="56" height="12" fill="${K}"/><rect x="44" y="32" width="12" height="46" fill="${K}"/>`),meaning:'A via termina em outra via, formando um "T".',tip:'Desenho de um "T".'},
{code:'A-9',name:'Bifurcação em "Y"',group:'adv',svg:adv(line([[50,80],[50,52]],11)+line([[50,54],[32,28]],10)+line([[50,54],[68,28]],10)),meaning:'A via se divide em duas adiante.',tip:'Desenho de um "Y".'},
{code:'A-12',name:'Interseção em círculo (rotatória)',group:'adv',svg:adv(arrow(arcPts(50,50,18,200,320,8),6)+arrow(arcPts(50,50,18,340,460,8),6)+arrow(arcPts(50,50,18,100,180,6),6)),meaning:'Rotatória adiante.',tip:'Setas em círculo, em fundo amarelo.'},
{code:'A-14',name:'Semáforo à frente',group:'adv',svg:adv(lightsTL),meaning:'Semáforo adiante. Prepare-se para parar.',tip:'É uma das poucas placas de advertência com cores além do preto.'},
{code:'A-15',name:'Parada obrigatória à frente',group:'adv',svg:adv(pareMini(50,50,20)),meaning:'Placa PARE adiante. Prepare-se para parar.',tip:'Mini placa "PARE" dentro do losango.'},
{code:'A-17',name:'Pista irregular',group:'adv',svg:adv(`<path d="M26,62 Q32,50 38,62 Q44,50 50,62 Q56,50 62,62 Q68,50 74,62 L74,67 L26,67 Z" fill="${K}"/>`),meaning:'Pista com buracos ou ondulações adiante.',tip:'Várias ondinhas.'},
{code:'A-18',name:'Saliência ou lombada',group:'adv',svg:adv(`<path d="M26,64 L34,64 Q50,38 66,64 L74,64 L74,69 L26,69 Z" fill="${K}"/>`),meaning:'Lombada adiante. Reduza a velocidade.',tip:'Uma "corcova" só.'},
{code:'A-21a',name:'Estreitamento de pista ao centro',group:'adv',svg:adv(line([[34,78],[34,58],[42,44],[42,22]],7)+line([[66,78],[66,58],[58,44],[58,22]],7)),meaning:'A pista fica mais estreita adiante, dos dois lados.',tip:'Duas linhas que se aproximam.'},
{code:'A-22',name:'Ponte estreita',group:'adv',svg:adv(line([[30,24],[40,38],[40,62],[30,76]],6)+line([[70,24],[60,38],[60,62],[70,76]],6)),meaning:'Ponte estreita adiante: cuidado com veículos no sentido contrário.',tip:'Linhas que entram e saem, como uma ponte.'},
{code:'A-24',name:'Obras',group:'adv',svg:adv(pic('worker',50,54,1.05)),meaning:'Obras na pista adiante.',tip:'Trabalhador com pá. Na sinalização temporária, aparece com fundo laranja.'},
{code:'A-26b',name:'Sentido duplo',group:'adv',svg:adv(arrow([[40,78],[40,24]],7)+arrow([[60,24],[60,78]],7)),meaning:'Adiante a via passa a ter mão dupla.',tip:'Duas setas opostas, em fundo amarelo.'},
{code:'A-28',name:'Pista escorregadia',group:'adv',svg:adv(pic('skid',50,42,1)),meaning:'Pista escorregadia adiante (chuva, óleo, areia).',tip:'Carro com marcas de derrapagem.'},
{code:'A-30a',name:'Trânsito de ciclistas',group:'adv',svg:adv(pic('bike',50,52,1)),meaning:'Atenção: ciclistas na via adiante.',tip:'Bicicleta em fundo amarelo (advertência), diferente da R-34 (obrigação).'},
{code:'A-31',name:'Trânsito de tratores ou maquinaria agrícola',group:'adv',svg:adv(pic('tractor',50,52,1)),meaning:'Tratores e máquinas agrícolas podem estar na via.',tip:'Trator em fundo amarelo.'},
{code:'A-32a',name:'Trânsito de pedestres',group:'adv',svg:adv(pic('ped',50,52,1.1)),meaning:'Pedestres circulando na via ou perto dela.',tip:'Pedestre andando.'},
{code:'A-32b',name:'Passagem sinalizada de pedestres',group:'adv',svg:adv(pic('ped',50,44,.9)+`<rect x="30" y="66" width="6" height="10" fill="${K}"/><rect x="40" y="66" width="6" height="10" fill="${K}"/><rect x="50" y="66" width="6" height="10" fill="${K}"/><rect x="60" y="66" width="6" height="10" fill="${K}"/>`),meaning:'Faixa de pedestres adiante.',tip:'Pedestre sobre a faixa listrada.'},
{code:'A-33a',name:'Área escolar',group:'adv',svg:adv(kids),meaning:'Escola nas proximidades: redobre a atenção e reduza a velocidade.',tip:'Duas crianças andando.'},
{code:'A-35',name:'Animais',group:'adv',svg:adv(pic('cow',50,52,1)),meaning:'Animais domésticos podem atravessar a via.',tip:'Desenho de vaca/boi.'},
{code:'A-36',name:'Animais selvagens',group:'adv',svg:adv(pic('deer',50,54,1)),meaning:'Animais silvestres podem atravessar a via.',tip:'Animal com chifres (cervo).'},
{code:'A-37',name:'Altura limitada',group:'adv',svg:adv(`<polygon points="40,24 60,24 50,32" fill="${K}"/><polygon points="40,76 60,76 50,68" fill="${K}"/>`+txt('3,0 m',50,56,15)),meaning:'Adiante há limite de altura (viaduto, túnel).',tip:'Avisa antes; a R-15 é a regra no local.'},
{code:'A-39',name:'Passagem de nível sem barreira',group:'adv',svg:adv(pic('train',50,52,1)),meaning:'Linha de trem adiante SEM cancela. Pare, olhe e escute.',tip:'Locomotiva = sem barreira.'},
{code:'A-40',name:'Passagem de nível com barreira',group:'adv',svg:adv(`<rect x="26" y="34" width="6" height="36" fill="${K}"/><rect x="68" y="34" width="6" height="36" fill="${K}"/><rect x="26" y="40" width="48" height="6" fill="${K}"/><rect x="26" y="54" width="48" height="6" fill="${K}"/>`),meaning:'Linha de trem adiante COM cancela.',tip:'Cerca/cancela = com barreira.'},
{code:'A-41',name:'Cruz de Santo André',group:'adv',svg:A41,meaning:'Fica junto à linha do trem: indica o local exato da passagem de nível.',tip:'Placa em "X", branca com borda vermelha.'},
{code:'A-43',name:'Aeroporto',group:'adv',svg:adv(pic('plane',50,50,1.05)),meaning:'Aeroporto nas proximidades; aviões podem passar em baixa altitude.',tip:'Avião visto de cima.'},
{code:'A-45',name:'Rua sem saída',group:'adv',svg:adv(`<rect x="44" y="36" width="12" height="42" fill="${K}"/><rect x="30" y="26" width="40" height="10" fill="${RED}"/>`),meaning:'A rua não tem saída adiante.',tip:'Traço vertical terminando em uma barra.'},

// ----- OBRAS (SINALIZAÇÃO TEMPORÁRIA) -----
{code:'A-24 (temp.)',name:'Obras (sinalização temporária)',group:'obra',svg:adv(pic('worker',50,54,1.05),ORG),meaning:'Obras adiante. Em sinalização temporária, as placas de advertência usam fundo laranja.',tip:'Laranja = obra / situação temporária.'},
{code:'A-21a (temp.)',name:'Estreitamento de pista (obras)',group:'obra',svg:adv(line([[34,78],[34,58],[42,44],[42,22]],7)+line([[66,78],[66,58],[58,44],[58,22]],7),ORG),meaning:'A pista fica mais estreita por causa de obras.',tip:'Mesmo desenho da A-21a, em fundo laranja.'},
{code:'Obras a … m',name:'Placa de obras à distância',group:'obra',svg:rtxt(['OBRAS','A 500 m'],ORG,K,K),meaning:'Avisa a que distância começam as obras.',tip:'Placas de obra são laranja com letras pretas.'},
{code:'Desvio',name:'Placa de desvio',group:'obra',svg:rtxt(['DESVIO','→'],ORG,K,K),meaning:'Indica que o trânsito deve seguir pelo desvio indicado.',tip:'Siga a direção da seta.'},
{code:'Pista interditada',name:'Pista interditada',group:'obra',svg:rtxt(['PISTA','INTERDITADA'],ORG,K,K),meaning:'Aquela pista ou faixa está fechada por obras.',tip:'Procure a faixa ou o desvio liberado.'},
{code:'Cone',name:'Cone de sinalização',group:'obra',svg:cone,meaning:'Dispositivo usado para canalizar o trânsito e isolar áreas de obra ou acidente.',tip:'Laranja com faixas brancas.'},
{code:'Cavalete',name:'Cavalete',group:'obra',svg:cavalete,meaning:'Bloqueia ou delimita a área de obra.',tip:'Listras diagonais laranja e branco.'},
{code:'Tambor',name:'Tambor (barril)',group:'obra',svg:tambor,meaning:'Usado para canalizar o trânsito em obras, principalmente em rodovias.',tip:'Faixas laranja e branca, bem visível à noite.'},

// ----- INDICAÇÃO -----
{code:'Identificação de rodovia',name:'Identificação de rodovia federal',group:'ind',svg:svg(`<path d="M15,10 L85,10 L85,55 Q85,82 50,94 Q15,82 15,55 Z" fill="${W}" stroke="${K}" stroke-width="4"/>${txt('BR',50,42,20)}${txt('116',50,72,24)}`),meaning:'Informa o número da rodovia. "BR" = rodovia federal.',tip:'Escudo branco com o número da rodovia.'},
{code:'Orientação de destino',name:'Placa de orientação de destino',group:'ind',svg:rtxt(['CENTRO ↑','AEROPORTO →'],GRN,W,W),meaning:'Indica a direção para chegar a cidades, bairros ou locais.',tip:'Fundo verde em rodovias e vias urbanas.'},
{code:'Distância',name:'Placa de distância',group:'ind',svg:rtxt(['CURITIBA 45 km','JOINVILLE 120 km'],GRN,W,W),meaning:'Mostra a distância até os próximos destinos.',tip:'Fundo verde, nomes e quilômetros.'},
{code:'Serviço: hospital',name:'Serviços auxiliares — hospital',group:'ind',svg:svg(`<rect x="4" y="4" width="92" height="92" rx="8" fill="${BLU}"/><rect x="16" y="16" width="68" height="68" fill="${W}"/>${txt('H',50,72,52,BLU)}`),meaning:'Indica hospital ou pronto-socorro próximo.',tip:'Serviços auxiliares têm fundo azul.'},
{code:'Serviço: abastecimento',name:'Serviços auxiliares — posto de combustível',group:'ind',svg:svg(`<rect x="4" y="4" width="92" height="92" rx="8" fill="${BLU}"/><rect x="16" y="16" width="68" height="68" fill="${W}"/><rect x="32" y="26" width="24" height="46" rx="2" fill="${K}"/><rect x="36" y="31" width="16" height="12" fill="${W}"/><path d="M56,40 L64,40 L64,62 Q64,66 68,64 L68,34 L62,28" fill="none" stroke="${K}" stroke-width="3"/><rect x="28" y="70" width="32" height="4" fill="${K}"/>`),meaning:'Indica posto de combustível próximo.',tip:'Fundo azul = serviço.'},
{code:'Atrativo turístico',name:'Atrativo turístico',group:'ind',svg:rtxt(['PARQUE','NACIONAL →'],BRN,W,W),meaning:'Indica pontos turísticos (parques, praias, monumentos).',tip:'Fundo marrom = turismo.'},
{code:'Educativa',name:'Placa educativa',group:'ind',svg:rtxt(['USE O CINTO','DE SEGURANÇA'],W,K,K),meaning:'Orienta e educa condutores e pedestres sobre comportamento seguro.',tip:'Fundo branco com letras pretas.'},

// ----- AUXILIARES / INFORMAÇÃO COMPLEMENTAR -----
{code:'Complementar (regulamentação)',name:'Informação complementar de regulamentação',group:'aux',svg:svg(`<g transform="translate(25 0) scale(.5)">${reg(txt('E',50,66,46),true).replace(/<\/?svg[^>]*>/g,'')}</g><rect x="10" y="54" width="80" height="40" rx="4" fill="${W}" stroke="${K}" stroke-width="2"/>${txt('SEG A SÁB',50,70,11)}${txt('8h às 18h',50,86,11)}`),meaning:'Placa menor, colocada junto à placa principal, que diz QUANDO ou PARA QUEM vale a regra. Aqui: proibido estacionar de segunda a sábado, das 8h às 18h.',tip:'Em regulamentação, o painel complementar tem fundo branco.'},
{code:'Complementar (exceção)',name:'Informação complementar — exceção',group:'aux',svg:svg(`<g transform="translate(25 0) scale(.5)">${reg(pic('truck',50,52,1.05),true).replace(/<\/?svg[^>]*>/g,'')}</g><rect x="10" y="56" width="80" height="34" rx="4" fill="${W}" stroke="${K}" stroke-width="2"/>${txt('EXCETO',50,70,11)}${txt('CARGA E DESCARGA',50,84,8.5)}`),meaning:'Mostra uma exceção à regra. Aqui: caminhões proibidos, exceto para carga e descarga.',tip:'Palavras como "EXCETO", "INÍCIO", "FIM" e horários aparecem nesses painéis.'},
{code:'Complementar (advertência)',name:'Informação complementar de advertência',group:'aux',svg:svg(`<g transform="translate(25 0) scale(.5)">${adv(`<path d="M26,64 L34,64 Q50,38 66,64 L74,64 L74,69 L26,69 Z" fill="${K}"/>`).replace(/<\/?svg[^>]*>/g,'')}</g><rect x="14" y="58" width="72" height="30" rx="4" fill="${YEL}" stroke="${K}" stroke-width="2"/>${txt('A 200 m',50,79,14)}`),meaning:'Complementa a advertência. Aqui: lombada a 200 metros.',tip:'Em advertência, o painel complementar tem fundo amarelo.'},
];

const GROUPS={reg:{name:'Regulamentação',color:'#ef4444',desc:'Obrigam, limitam ou proíbem. Desobedecer é infração.'},
 adv:{name:'Advertência',color:'#f59e0b',desc:'Alertam sobre perigos ou situações adiante.'},
 obra:{name:'Obras',color:'#ea580c',desc:'Sinalização temporária: cor laranja.'},
 ind:{name:'Indicação',color:'#22c55e',desc:'Orientam: direções, distâncias, serviços e turismo.'},
 aux:{name:'Complementares',color:'#94a3b8',desc:'Painéis que completam a placa principal.'}};

window.SIGNS=SIGNS;window.SIGN_GROUPS=GROUPS;

// ============================================
// TELA DE PLACAS
// ============================================
let curGroup='reg',signQuiz=null;

window.openSigns=function(group){
  if(group)curGroup=group;
  navigate('screen-signs');
  renderSignList();
};

window.renderSignList=function(){
  const tabs=Object.entries(GROUPS).map(([k,v])=>`<button class="sign-tab${k===curGroup?' active':''}" style="${k===curGroup?`border-color:${v.color};color:${v.color}`:''}" onclick="curSignGroup('${k}')">${v.name}</button>`).join('');
  const q=(document.getElementById('signSearch')||{}).value||'';
  const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const list=SIGNS.filter(s=>q?norm(s.name+' '+s.code+' '+s.meaning).includes(norm(q)):s.group===curGroup);
  document.getElementById('signTabs').innerHTML=tabs;
  document.getElementById('signGroupDesc').textContent=q?`${list.length} resultado(s) para "${q}"`:GROUPS[curGroup].desc;
  document.getElementById('signGrid').innerHTML=list.map(s=>`<div class="sign-card" onclick="openSign('${s.code}')"><div class="sign-img">${s.svg}</div><div class="sign-code">${s.code}</div><div class="sign-name">${s.name}</div></div>`).join('')||'<p style="color:var(--gray);font-size:13px">Nenhuma placa encontrada.</p>';
};
window.curSignGroup=function(k){curGroup=k;const i=document.getElementById('signSearch');if(i)i.value='';renderSignList();};

window.openSign=function(code){
  const s=SIGNS.find(x=>x.code===code);if(!s)return;
  const gr=GROUPS[s.group];
  document.getElementById('signModalBody').innerHTML=`
    <div class="sign-big">${s.svg}</div>
    <span class="badge" style="background:${gr.color}22;color:${gr.color}">${gr.name}</span>
    <h3 style="margin:8px 0 4px">${s.code} — ${s.name}</h3>
    <p style="font-size:14px;line-height:1.5;color:#cbd5e1">${s.meaning}</p>
    <div class="highlight-box"><div class="label">DICA PARA LEMBRAR</div><div class="value" style="font-size:13px">${s.tip}</div></div>`;
  document.getElementById('signModal').classList.add('show');
};
window.closeSign=function(){document.getElementById('signModal').classList.remove('show');};

// ---------- Quiz "Que placa é esta?" ----------
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
function makeSignQuestion(s){
  const same=shuf(SIGNS.filter(x=>x.group===s.group&&x.code!==s.code&&x.name!==s.name));
  const others=shuf(SIGNS.filter(x=>x.group!==s.group));
  const wrong=same.concat(others).slice(0,3).map(x=>x.name);
  const opts=shuf([s.name,...wrong]);
  return {sign:s,options:opts,correct:opts.indexOf(s.name)};
}
window.startSignQuiz=function(){
  const pool=shuf(SIGNS.filter(s=>s.group!=='aux'&&!s.code.startsWith('Serviço')));
  signQuiz={qs:pool.slice(0,10).map(makeSignQuestion),i:0,score:0,answered:false};
  document.getElementById('signListView').style.display='none';
  document.getElementById('signQuizView').style.display='block';
  renderSignQuiz();
};
function renderSignQuiz(){
  const sq=signQuiz,q=sq.qs[sq.i];
  document.getElementById('signQuizView').innerHTML=`
    <div class="question-num">Placa ${sq.i+1}/${sq.qs.length} · Acertos: ${sq.score}</div>
    <div class="sign-big">${q.sign.svg}</div>
    <div class="question-text" style="text-align:center">Que placa é esta?</div>
    ${q.options.map((o,i)=>`<div class="option" id="sqo${i}" onclick="answerSign(${i})"><span class="option-letter">${'ABCD'[i]}</span><span>${o}</span></div>`).join('')}
    <div class="explanation" id="sqExp"></div>
    <button class="btn btn-primary" id="sqNext" style="display:none;margin-top:12px" onclick="nextSign()">Próxima →</button>
    <button class="btn btn-outline" style="margin-top:8px" onclick="exitSignQuiz()">Sair do quiz</button>`;
  sq.answered=false;
}
window.answerSign=function(i){
  const sq=signQuiz;if(sq.answered)return;sq.answered=true;
  const q=sq.qs[sq.i];
  if(i===q.correct)sq.score++;
  document.getElementById('sqo'+q.correct).classList.add('correct');
  if(i!==q.correct)document.getElementById('sqo'+i).classList.add('wrong');
  const e=document.getElementById('sqExp');e.innerHTML=`<strong>${q.sign.code} — ${q.sign.name}.</strong> ${q.sign.meaning}`;e.classList.add('show');
  const b=document.getElementById('sqNext');b.style.display='';b.textContent=sq.i===sq.qs.length-1?'Ver resultado':'Próxima →';
};
window.nextSign=function(){
  const sq=signQuiz;sq.i++;
  if(sq.i<sq.qs.length)return renderSignQuiz();
  const pct=Math.round(sq.score/sq.qs.length*100);
  document.getElementById('signQuizView').innerHTML=`
    <div class="card" style="text-align:center;padding:24px">
      <div style="font-size:48px">${pct>=70?'🏆':'📚'}</div>
      <h3 style="margin:8px 0">Você acertou ${sq.score} de ${sq.qs.length}</h3>
      <p>${pct>=70?'Muito bem! Você conhece bem as placas.':'Continue praticando: revise as placas e tente de novo.'}</p>
    </div>
    <button class="btn btn-primary" onclick="startSignQuiz()">Jogar de novo</button>
    <button class="btn btn-outline" style="margin-top:8px" onclick="exitSignQuiz()">Voltar às placas</button>`;
};
window.exitSignQuiz=function(){
  signQuiz=null;
  document.getElementById('signQuizView').style.display='none';
  document.getElementById('signListView').style.display='block';
  renderSignList();
};

// ---------- Questões de placas no simulado ----------
if(typeof QUESTIONS!=="undefined"){
  const base=SIGNS.filter(s=>['reg','adv'].includes(s.group));
  base.forEach((s,idx)=>{
    const q=makeSignQuestion(s);
    QUESTIONS.push({id:1000+idx,theme:'Legislação',
      text:`<div class="sign-in-q">${s.svg}</div>O que significa esta placa?`,
      options:q.options,correct:q.correct,
      explanation:`${s.code} — ${s.name}: ${s.meaning}`,legal:'Manual Brasileiro de Sinalização de Trânsito (CONTRAN)',category:'all',sign:true});
  });
}
})();
