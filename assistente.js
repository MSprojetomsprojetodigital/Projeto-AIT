// ============================================
// ASSISTENTE DE TRÂNSITO (Opção A — sem custo)
// Responde com o conteúdo do próprio app: leis, placas, multas e pontos.
// Preparado para, no futuro, chamar uma IA quando não souber (askAI).
// ============================================
(function(){
const NAT={leve:{v:88.38,p:3,n:'leve'},media:{v:130.16,p:4,n:'média'},grave:{v:195.23,p:5,n:'grave'},gravissima:{v:293.47,p:7,n:'gravíssima'}};
const brl=v=>'R$ '+v.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');
const norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

// Infrações mais comuns. k = expressões que identificam a infração (sem acento).
const INF=[
 {k:['sinal vermelho','semaforo vermelho','furar o sinal','avancar o sinal','passar no vermelho'],t:'Avançar o sinal vermelho',nat:'gravissima',art:'208'},
 {k:['segurando o celular','manuseando o celular','mexer no celular','celular na mao','celular ao volante','usar celular','usando celular','celular dirigindo','falar no celular','mexendo no celular','celular'],t:'Dirigir segurando ou manuseando o celular',nat:'gravissima',art:'252',extra:'Usar fone de ouvido ou celular sem segurá-lo é infração média (4 pontos, R$ 130,16).'},
 {k:['fone de ouvido','fones de ouvido'],t:'Dirigir usando fone de ouvido',nat:'media',art:'252'},
 {k:['sem cinto','cinto de seguranca','nao usar cinto','sem o cinto'],t:'Não usar o cinto de segurança (condutor ou passageiro)',nat:'grave',art:'167',extra:'Além da multa, o veículo fica retido até a situação ser corrigida.'},
 {k:['cadeirinha','crianca sem','bebe conforto','assento de elevacao','transportar crianca'],t:'Transportar criança sem o dispositivo de segurança',nat:'gravissima',art:'168'},
 {k:['bafometro recusar','recusar o bafometro','recusar bafometro','recusa do bafometro','recusei o bafometro','recusei','nao soprar','bafometro'],t:'Recusar o teste do bafômetro',nat:'gravissima',mult:10,art:'165-A',extra:'Também gera suspensão do direito de dirigir por 12 meses, recolhimento da CNH e retenção do veículo.'},
 {k:['alcool','bebida','bebado','embriagado','embriaguez','beber e dirigir','bebi','lei seca','cerveja'],t:'Dirigir sob efeito de álcool',nat:'gravissima',mult:10,art:'165',extra:'Também gera suspensão do direito de dirigir por 12 meses. Com 0,3 mg/L ou mais no bafômetro, também é crime (Art. 306).'},
 {k:['sem habilitacao','sem cnh','sem carteira','nao habilitado','sem carta'],t:'Dirigir sem CNH ou Permissão',nat:'gravissima',mult:3,art:'162',extra:'O veículo fica retido até aparecer um condutor habilitado. Se gerar perigo, também é crime (Art. 309).'},
 {k:['cnh vencida','carteira vencida','habilitacao vencida'],t:'Dirigir com a CNH vencida há mais de 30 dias',nat:'gravissima',art:'162',extra:'A CNH é recolhida e o veículo, retido.'},
 {k:['vaga de idoso','vaga de deficiente','vaga para deficiente','vaga para idoso','vaga reservada','vaga pcd'],t:'Estacionar em vaga reservada (idoso ou pessoa com deficiência) sem credencial',nat:'gravissima',art:'181'},
 {k:['estacionar na calcada','estacionar em cima da calcada','estacionar na faixa','estacionar na ciclovia','parar na calcada'],t:'Estacionar na calçada, na faixa de pedestres ou na ciclovia',nat:'gravissima',art:'181'},
 {k:['esquina'],t:'Estacionar a menos de 5 metros da esquina',nat:'media',art:'181'},
 {k:['garagem','guia rebaixada','frente da garagem'],t:'Estacionar em frente à guia rebaixada (garagem)',nat:'media',art:'181'},
 {k:['hidrante'],t:'Estacionar junto a hidrante',nat:'media',art:'181'},
 {k:['fila dupla'],t:'Estacionar em fila dupla',nat:'grave',art:'181'},
 {k:['proibido estacionar','local proibido','estacionar em lugar proibido','estacionamento proibido'],t:'Estacionar onde a placa proíbe',nat:'media',art:'181'},
 {k:['faixa amarela','linha amarela','faixa continua','linha continua','ultrapassar na contramao','ultrapassagem proibida','ultrapassar em local proibido'],t:'Ultrapassar pela contramão onde é proibido (ex.: linha amarela contínua)',nat:'gravissima',mult:5,art:'203',extra:'Na reincidência em 12 meses, a multa dobra.'},
 {k:['pedestre na faixa','preferencia ao pedestre','preferencia do pedestre','nao parar para pedestre','atropelar'],t:'Não dar preferência ao pedestre na faixa',nat:'gravissima',art:'214'},
 {k:['seta','pisca','sinalizar a manobra','nao sinalizar'],t:'Não usar a seta antes de uma manobra',nat:'grave',art:'196'},
 {k:['buzina','buzinar'],t:'Usar a buzina de forma indevida (ex.: entre 22h e 6h)',nat:'leve',art:'227'},
 {k:['jogar lixo','jogar objeto','pela janela','jogar bituca'],t:'Jogar objetos ou lixo pela janela',nat:'media',art:'172'},
 {k:['acostamento'],t:'Transitar pelo acostamento (fora de emergência)',nat:'gravissima',mult:3,art:'193'},
 {k:['racha','pega','corrida na rua','disputar corrida'],t:'Disputar corrida (racha)',nat:'gravissima',mult:10,art:'173',extra:'Também gera suspensão do direito de dirigir e é crime (Art. 308).'},
 {k:['sem capacete','capacete'],t:'Pilotar moto sem capacete',nat:'gravissima',art:'244',extra:'Também gera suspensão do direito de dirigir.'},
 {k:['empinar','uma roda so','em uma roda'],t:'Empinar a moto (equilibrar-se em uma roda)',nat:'gravissima',art:'244',extra:'Também gera suspensão do direito de dirigir.'},
 {k:['nao licenciado','sem licenciamento','licenciamento atrasado','sem documento do carro','ipva atrasado'],t:'Conduzir veículo não licenciado',nat:'gravissima',art:'230',extra:'O veículo pode ser removido.'},
 {k:['placa adulterada','placa falsa','placa clonada'],t:'Veículo com placa ou identificação adulterada',nat:'gravissima',art:'230'},
 {k:['escapamento','barulho do motor','descarga livre'],t:'Escapamento com descarga livre ou silenciador defeituoso',nat:'grave',art:'230'},
 {k:['banguela','ponto morto na descida','desengrenado'],t:'Descer em "banguela" (desligado ou desengrenado em declive)',nat:'media',art:'231'},
 {k:['excesso de peso','sobrepeso','peso acima'],t:'Transitar com excesso de peso',nat:'media',art:'231',extra:'A multa aumenta conforme o excesso, e a carga pode ter que ser transferida.'},
 {k:['socorro','fugir do acidente','omissao de socorro','nao socorrer'],t:'Condutor envolvido em acidente com vítima que não presta socorro',nat:'gravissima',mult:5,art:'176',extra:'Também gera suspensão do direito de dirigir. Fugir do local e omitir socorro também são crimes (Arts. 304 e 305).'},
 {k:['sem atencao','distraido','dirigir distraido'],t:'Dirigir sem atenção ou sem os cuidados indispensáveis',nat:'leve',art:'169'},
];

const SUG=['Quanto é a multa por avançar o sinal vermelho?','Quantos pontos perde quem usa celular?','O que significa a placa R-6c?','Com quantos pontos a CNH é suspensa?','Minha CNH foi cassada, o que faço?','Preciso de um advogado de trânsito'];

let chat=[];
function st(){return state;}

window.openAssistant=function(){navigate('screen-assistant');renderAssistant();};

function renderAssistant(){
  const body=document.getElementById('assistantBody');
  if(!body.dataset.ready){
    body.dataset.ready='1';
    body.innerHTML=`
      <div class="card" style="border-color:var(--blue)">
        <h3>🤖 Assistente de Trânsito</h3>
        <p>Pergunte sobre multas, pontos, placas, leis, suspensão da CNH ou peça ajuda para encontrar um advogado. Toque no 🎙️ para falar.</p>
      </div>
      <div id="asChat" class="as-chat"></div>
      <div class="as-sugs" id="asSugs">${SUG.map(s=>`<button class="law-chip" onclick="askAssistant(this.textContent)">${s}</button>`).join('')}</div>
      <div class="as-bar">
        <button class="as-mic" id="asMic" onclick="toggleListen()" aria-label="Falar">🎙️</button>
        <input class="search-input" id="asInput" placeholder="Digite ou fale sua pergunta…" onkeydown="if(event.key==='Enter')askAssistant(this.value)">
        <button class="btn btn-primary as-send" onclick="askAssistant(document.getElementById('asInput').value)">➤</button>
      </div>
      <p style="font-size:11px;color:var(--gray);margin-top:8px">Respostas para estudo, baseadas no CTB. Não substituem orientação jurídica. Confirme sempre no Detran do seu estado.</p>`;
    if(!chat.length)addMsg('bot','Olá! 👋 Sou o assistente do AIT Simulado. Como posso ajudar?');
  }
  drawChat();
}

function addMsg(who,html,speak){chat.push({who,html});drawChat();if(who==='bot'&&speak&&window.speakText){const t=document.createElement('div');t.innerHTML=html;t.querySelectorAll('button,a,.as-actions').forEach(e=>e.remove());speakText(t.textContent.replace(/\s+/g,' ').trim());}}
function drawChat(){
  const el=document.getElementById('asChat');if(!el)return;
  el.innerHTML=chat.map(m=>`<div class="as-msg ${m.who}">${m.html}</div>`).join('');
  el.scrollTop=el.scrollHeight;
  const last=el.lastElementChild;if(last&&last.scrollIntoView)last.scrollIntoView({block:'nearest'});
}

// ---------- voz ----------
let rec=null,listening=false,lastWasVoice=false;
window.toggleListen=function(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){addMsg('bot','Seu navegador não tem reconhecimento de voz. Use o Chrome ou o Safari, ou digite a pergunta. 😉');return;}
  if(listening){rec&&rec.stop();return;}
  if(window.speechSynthesis)speechSynthesis.cancel();
  rec=new SR();rec.lang='pt-BR';rec.interimResults=true;rec.maxAlternatives=1;
  const btn=document.getElementById('asMic'),inp=document.getElementById('asInput');
  rec.onstart=()=>{listening=true;btn.classList.add('on');inp.placeholder='Ouvindo… pode falar';};
  rec.onresult=e=>{let t='';for(const r of e.results)t+=r[0].transcript;inp.value=t;if(e.results[e.results.length-1].isFinal){lastWasVoice=true;askAssistant(t);}};
  rec.onerror=e=>{if(e.error==='not-allowed')addMsg('bot','Preciso da permissão do microfone. Libere nas configurações do navegador e tente de novo.');};
  rec.onend=()=>{listening=false;btn.classList.remove('on');inp.placeholder='Digite ou fale sua pergunta…';};
  rec.start();
};

// ---------- cérebro ----------
window.askAssistant=function(q){
  q=(q||'').trim();if(!q)return;
  const inp=document.getElementById('asInput');if(inp)inp.value='';
  const sug=document.getElementById('asSugs');if(sug)sug.style.display='none';
  addMsg('user',q.replace(/</g,'&lt;'));
  const ans=answer(q);
  const voice=lastWasVoice;lastWasVoice=false;
  setTimeout(()=>addMsg('bot',ans,voice),150);
};

function has(n,list){return list.some(k=>n.includes(k));}

function answer(q){
  const n=norm(q);

  // 1) advogado / ajuda jurídica
  if(has(n,['advogado','advocacia','advogada','defensoria','juridic','processo contra','me ajudar com a multa'])){
    const loc=extractLoc(q);
    return lawyerAnswer(loc);
  }
  // localização respondida após pedido de advogado
  if(window.__asWaitLoc){window.__asWaitLoc=false;if(!/\?/.test(q)&&q.split(/\s+/).length<=8)return lawyerAnswer(q);}

  // 2) placa por código
  const code=n.match(/\b([ra])\s*-\s*(\d{1,2})\s*([a-e])?\b/)||(n.includes('placa')&&n.match(/\b([ra])\s*(\d{1,2})\s*([a-e])?\b/));
  if(code&&window.SIGNS){
    const c=(code[1].toUpperCase()+'-'+code[2]+(code[3]||'')).toLowerCase();
    const s=SIGNS.find(x=>x.code.toLowerCase()===c)||SIGNS.find(x=>x.code.toLowerCase().startsWith(c));
    if(s)return signAnswer(s);
  }

  // 2b) PPD (antes das naturezas)
  if(has(n,['ppd','permissao para dirigir','carteira provisoria','cnh provisoria','provisoria'])) return `<strong>Permissão para Dirigir (PPD):</strong> vale 1 ano. Para receber a CNH definitiva, você não pode cometer infração <strong>grave</strong> ou <strong>gravíssima</strong>, nem ser reincidente em infração <strong>média</strong>. Se isso acontecer, é preciso reiniciar o processo de habilitação, mas você pode recorrer da multa dentro do prazo.${acts([['🔄 O que fazer',"openRecover();setRecoverSit('ppd')"],['📖 Ver Art. 148',"openLaw('art148')"]])}`;

  // 2c) cores das placas
  if(has(n,['placa','sinaliz'])&&has(n,['cor','cores','laranja','amarela','azul','verde','marrom','obra'])){
    if(has(n,['obra'])) return `As placas de <strong>obras</strong> (sinalização temporária) usam fundo <strong>laranja</strong> com símbolos pretos. Também aparecem cones, cavaletes e tambores laranja e brancos.${acts([['🚧 Ver placas de obras',"openSigns('obra')"]])}`;
    return `<strong>Cores das placas:</strong><br>• <strong>Vermelho e branco</strong>: regulamentação (obrigam ou proíbem)<br>• <strong>Amarelo</strong>: advertência (perigo adiante)<br>• <strong>Laranja</strong>: obras e sinalização temporária<br>• <strong>Verde</strong>: orientação de destino e distância<br>• <strong>Azul</strong>: serviços (hospital, posto)<br>• <strong>Marrom</strong>: atrativos turísticos${acts([['🚦 Ver as placas',"openSigns()"]])}`;
  }

  // 3) quantos pontos para suspender
  if(has(n,['suspens','suspend','perder a cnh','perder a carteira','perco a cnh','limite de pontos'])&&has(n,['ponto','quantos','limite','quando'])){
    return `<strong>Limite de pontos para suspensão (em 12 meses):</strong><br>• <strong>20 pontos</strong> se houver 2 ou mais infrações gravíssimas<br>• <strong>30 pontos</strong> se houver 1 gravíssima<br>• <strong>40 pontos</strong> se não houver nenhuma gravíssima (e para motoristas com atividade remunerada)<br><br>Algumas infrações suspendem direto, sem depender de pontos, como dirigir sob efeito de álcool.${acts([['🧮 Calcular meus pontos',"openRecover()"],['📖 Ver Art. 261',"openLaw('art261')"]])}`;
  }

  // 4) valor/pontos de uma natureza
  const natKey=n.match(/\b(leve|media|grave|gravissima)\b/);
  if(natKey&&has(n,['multa','valor','quanto','ponto','custa'])&&!INF.some(i=>has(n,i.k))){
    const x=NAT[natKey[1]];
    return `A infração <strong>${x.n}</strong> vale <strong>${x.p} pontos</strong> e a multa é de <strong>${brl(x.v)}</strong>.<br><br>Tabela completa: leve 3 pts (R$ 88,38) · média 4 pts (R$ 130,16) · grave 5 pts (R$ 195,23) · gravíssima 7 pts (R$ 293,47).${acts([['📖 Ver valores (Art. 258)',"openLaw('art258')"]])}`;
  }

  // 5) excesso de velocidade
  if(has(n,['velocidade','radar','acima do limite','correr demais','excesso de velocidade','km/h','km por hora'])&&has(n,['multa','ponto','quanto','valor','infra','acima','excesso','radar'])){
    return `<strong>Excesso de velocidade (Art. 218):</strong><br>• Até 20% acima: <strong>média</strong>, 4 pontos, ${brl(NAT.media.v)}<br>• De 20% a 50% acima: <strong>grave</strong>, 5 pontos, ${brl(NAT.grave.v)}<br>• Mais de 50% acima: <strong>gravíssima</strong>, 7 pontos, multa ×3 = ${brl(NAT.gravissima.v*3)} e <strong>suspensão</strong> do direito de dirigir.${acts([['📖 Ver Art. 218',"openLaw('art218')"],['📖 Limites de velocidade',"openLaw('art61')"]])}`;
  }

  // 6) infração específica
  let best=null,bestLen=0;
  INF.forEach(i=>i.k.forEach(k=>{if(n.includes(k)&&k.length>bestLen){best=i;bestLen=k.length;}}));
  if(best)return infAnswer(best);

  // 7) situações: cassada / suspensa / PPD / recurso
  if(has(n,['cassad','cassacao'])) return `<strong>CNH cassada:</strong> o direito de dirigir é extinto. Depois de <strong>2 anos</strong>, é possível pedir a reabilitação, refazendo todo o processo (exames médico, psicológico, teórico e prático).<br><br>Dirigir nesse período é infração e crime.${acts([['🔄 Passo a passo',"openRecover();setRecoverSit('cassada')"],['📖 Ver Art. 263',"openLaw('art263')"]])}`;
  if(has(n,['suspens','suspenso','suspensa','reciclagem'])) return `<strong>CNH suspensa:</strong> você fica sem dirigir por um prazo (6 meses a 1 ano, ou de 8 a 24 meses na reincidência) e precisa fazer o <strong>curso de reciclagem</strong>. Depois, recupera a mesma CNH.<br><br>Nunca dirija durante a suspensão: isso leva à cassação.${acts([['🔄 Passo a passo',"openRecover();setRecoverSit('suspensa')"],['📖 Ver Art. 261',"openLaw('art261')"]])}`;
  if(has(n,['ppd','permissao','carteira provisoria','provisoria'])) return `<strong>Permissão para Dirigir (PPD):</strong> vale 1 ano. Para receber a CNH definitiva, você não pode cometer infração <strong>grave</strong> ou <strong>gravíssima</strong>, nem ser reincidente em infração <strong>média</strong>.${acts([['🔄 O que fazer',"openRecover();setRecoverSit('ppd')"],['📖 Ver Art. 148',"openLaw('art148')"]])}`;
  if(has(n,['recorrer','recurso','jari','cetran','defesa previa','contestar','multa injusta'])) return `<strong>Como recorrer de uma multa:</strong> 1) defesa prévia (prazo na notificação da autuação); 2) recurso à <strong>JARI</strong>; 3) recurso ao <strong>CETRAN</strong> (ou CONTRANDIFE, no DF). Recorrer é gratuito. Se a notificação não chegar em até 30 dias, o auto deve ser arquivado.${acts([['🔄 Passo a passo',"openRecover();setRecoverSit('multa')"],['📖 Ver Art. 281',"openLaw('art281')"]])}`;
  if(has(n,['pontos']) && has(n,['quanto','quantos','cada'])) return `Cada infração soma pontos: <strong>leve 3</strong>, <strong>média 4</strong>, <strong>grave 5</strong> e <strong>gravíssima 7</strong>. Diga qual infração (ex.: "celular", "sinal vermelho") que eu digo o valor exato.${acts([['🧮 Calcular meus pontos',"openRecover()"]])}`;

  // 8) placas por palavra
  if(window.SIGNS&&has(n,['placa','sinaliz','significa'])){
    const s=bestMatch(SIGNS,n,x=>x.name+' '+x.meaning);
    if(s)return signAnswer(s);
  }

  // 9) busca geral nas leis
  if(window.LAWS){
    const l=bestMatch(LAWS,n,x=>x.title+' '+x.simple+' '+(x.ex||''));
    if(l)return `<strong>${l.art?'Art. '+l.art:l.code} — ${l.title}</strong><br>${l.simple}${acts([['📖 Abrir na Biblioteca',`openLaw('${l.art?'art'+l.art:l.code}')`]])}`;
  }
  if(window.SIGNS){
    const s=bestMatch(SIGNS,n,x=>x.name+' '+x.meaning);
    if(s)return signAnswer(s);
  }

  // 10) não sei (futuro: askAI)
  return `Hmm, ainda não sei responder isso. 😅 Tente perguntar de outro jeito, por exemplo: <em>"Quanto é a multa por estacionar na calçada?"</em> ou <em>"O que significa a placa A-18?"</em>${acts([['📖 Abrir a Biblioteca de Leis',"openLaws()"],['🚦 Ver as placas',"openSigns()"]])}`;
}

const STOP=new Set('a o e de da do das dos em no na nos nas um uma para por com que qual quais quanto quantos como se eu meu minha e o os as ao sobre ter tem pode posso faz fazer significa e isso esta essa esse placa lei artigo multa'.split(' '));
function bestMatch(list,n,text){
  const words=n.split(/[^a-z0-9]+/).filter(w=>w.length>2&&!STOP.has(w));
  if(!words.length)return null;
  let best=null,score=0;
  list.forEach(x=>{const t=norm(text(x));let s=0;words.forEach(w=>{if(t.includes(w))s+=w.length>4?2:1;});if(s>score){score=s;best=x;}});
  return score>=2?best:null;
}
function acts(list){return '<div class="as-actions">'+list.map(([l,f])=>`<button class="law-chip" onclick="${f.replace(/"/g,'&quot;')}">${l}</button>`).join('')+'</div>';}
function infAnswer(i){
  const x=NAT[i.nat],m=i.mult||1;
  return `<strong>${i.t}</strong><br>Infração <strong>${x.n}</strong>: <strong>${x.p} pontos</strong> e multa de <strong>${brl(x.v*m)}</strong>${m>1?` (valor ×${m})`:''}.${i.extra?'<br>'+i.extra:''}${acts([[`📖 Ver Art. ${i.art}`,`openLaw('art${i.art}')`]])}`;
}
function signAnswer(s){
  return `<div class="sign-in-q" style="width:90px;height:90px">${s.svg}</div><strong>${s.code} — ${s.name}</strong><br>${s.meaning}<br><em style="font-size:12px">Dica: ${s.tip}</em>${acts([['🚦 Ver nas placas',`openSign('${s.code}')`]])}`;
}

// ---------- advogados ----------
function extractLoc(q){
  const m=q.match(/(?:moro|estou|fico|perto|pr[óo]ximo|regi[ãa]o|bairro)\s+(?:em|no|na|de|do|da)?\s*(.+)$/i)||q.match(/\b(?:em|no|na)\s+([A-ZÀ-Ú][^?.!]+)$/);
  return m?m[1].replace(/[,.;]?\s*(preciso|quero|procuro|gostaria|me ajud|onde).*/i,'').replace(/[?.!,]+$/,'').trim():'';
}
function lawyerAnswer(loc){
  loc=(loc||'').trim();
  const info=`<br><br>✅ Antes de contratar, confira se o advogado está registrado no <a href="https://cna.oab.org.br" target="_blank" rel="noopener" style="color:var(--blue)">Cadastro Nacional dos Advogados (OAB)</a>.<br>🏛️ Se não puder pagar, procure a <strong>Defensoria Pública</strong> do seu estado.<br><span style="font-size:11px;color:var(--gray)">O app não indica advogados específicos: pesquise, compare avaliações e confirme o registro.</span>`;
  if(!loc){
    window.__asWaitLoc=true;
    return `Posso te ajudar a encontrar advogados especialistas em trânsito perto de você. 📍<br>Me diga o <strong>bairro e a cidade</strong> (ex.: "Tatuapé, São Paulo") ou use a sua localização.${acts([['📍 Usar minha localização',"lawyerGeo()"]])}${info}`;
  }
  const url='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('advogado de trânsito '+loc);
  return `Aqui está a busca por <strong>advogados de trânsito</strong> perto de <strong>${loc.replace(/</g,'&lt;')}</strong>:<div class="as-actions"><a class="law-chip" href="${url}" target="_blank" rel="noopener">🗺️ Abrir no Google Maps</a></div>${info}`;
}
window.lawyerGeo=function(){
  if(!navigator.geolocation){addMsg('bot','Seu navegador não permite usar a localização. Digite o bairro e a cidade. 😉');return;}
  navigator.geolocation.getCurrentPosition(p=>{
    window.__asWaitLoc=false;
    const {latitude:la,longitude:lo}=p.coords;
    const url=`https://www.google.com/maps/search/${encodeURIComponent('advogado de trânsito')}/@${la.toFixed(5)},${lo.toFixed(5)},14z`;
    addMsg('bot',`Encontrei a sua localização. 📍<div class="as-actions"><a class="law-chip" href="${url}" target="_blank" rel="noopener">🗺️ Ver advogados de trânsito perto de mim</a></div><span style="font-size:11px;color:var(--gray)">Confira o registro na OAB antes de contratar.</span>`);
  },()=>addMsg('bot','Não consegui pegar a localização. Digite o bairro e a cidade, por exemplo: "Tatuapé, São Paulo".'),{timeout:10000});
};

window.assistantAnswer=answer; // usado nos testes
})();
