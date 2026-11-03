// ============================================
// TRILHA "RECUPERAR MINHA CNH"
// Orientação geral para estudo. Os procedimentos variam por estado:
// confirme sempre no Detran do seu estado.
// ============================================
(function(){

const SITUATIONS={
 suspensa:{icon:'⏸️',title:'Minha CNH foi suspensa',
  intro:'Na suspensão, você perde o direito de dirigir por um tempo, mas <strong>recupera a mesma CNH</strong> depois de cumprir o prazo e fazer o curso de reciclagem.',
  why:['Somou pontos acima do limite em 12 meses (20, 30 ou 40 pontos, conforme as gravíssimas)','Cometeu uma infração que suspende diretamente, como dirigir sob efeito de álcool ou recusar o bafômetro (12 meses), racha ou excesso de velocidade acima de 50%'],
  steps:[
   {t:'Confira a notificação e o processo',d:'Veja na notificação (ou no app Carteira Digital de Trânsito / site do Detran) o motivo, o prazo da suspensão e o prazo para defesa ou recurso.'},
   {t:'Decida se vai recorrer',d:'Você pode apresentar defesa e recorrer à JARI e depois ao CETRAN. Fique atento aos prazos escritos na notificação.'},
   {t:'Entregue a CNH ou registre o início da suspensão',d:'Quando a penalidade for definitiva, siga a orientação do Detran para começar a contar o prazo (entrega do documento físico ou bloqueio da CNH digital).'},
   {t:'Não dirija durante a suspensão',d:'Dirigir com o direito suspenso leva à CASSAÇÃO da CNH e também é crime (Art. 307 do CTB).'},
   {t:'Faça o curso de reciclagem',d:'O curso é obrigatório. Ele pode ser feito durante o prazo de suspensão, em instituição credenciada pelo Detran.'},
   {t:'Faça a prova da reciclagem',d:'Ao final do curso há uma avaliação teórica. Use o treino abaixo para se preparar.'},
   {t:'Peça a devolução da CNH',d:'Com o prazo cumprido e o curso aprovado, solicite ao Detran a liberação da CNH. Verifique também se há multas pendentes.'}
  ]},
 cassada:{icon:'⛔',title:'Minha CNH foi cassada',
  intro:'Na cassação, o direito de dirigir é <strong>extinto</strong>. Depois de <strong>2 anos</strong>, você pode pedir a reabilitação, mas precisa <strong>refazer todo o processo</strong>, como na primeira habilitação.',
  why:['Dirigiu com o direito de dirigir suspenso','Reincidência, em 12 meses, em infrações como álcool ao volante, racha, manobras perigosas ou dirigir veículo de categoria diferente','Condenação judicial por crime de trânsito'],
  steps:[
   {t:'Confira o processo e os prazos de recurso',d:'A cassação também passa por processo administrativo, com direito a defesa e recurso (JARI e CETRAN).'},
   {t:'Cumpra os 2 anos sem dirigir',d:'O prazo mínimo é de 2 anos. Dirigir nesse período piora muito a situação (infração e crime).'},
   {t:'Faça o curso de reciclagem, se exigido',d:'Muitos Detrans exigem o curso de reciclagem no processo de reabilitação. Confirme no seu estado.'},
   {t:'Abra o processo de reabilitação',d:'Depois dos 2 anos, solicite a reabilitação no Detran (ou pelo app CNH do Brasil, se disponível no seu estado).'},
   {t:'Refaça os exames',d:'Exame médico, avaliação psicológica, prova teórica e prova prática de direção, como na primeira CNH.'},
   {t:'Estude como se fosse a primeira vez',d:'Use as fases de estudo, as placas, a Biblioteca de Leis e os simulados deste app.'}
  ]},
 ppd:{icon:'🔰',title:'Estou com a Permissão (PPD) e levei multa',
  intro:'Durante a Permissão para Dirigir (1 ano), uma única infração <strong>grave ou gravíssima</strong>, ou ser <strong>reincidente em infração média</strong>, impede receber a CNH definitiva (Art. 148).',
  why:['Uma infração grave ou gravíssima durante a PPD','Duas ou mais infrações médias durante a PPD'],
  steps:[
   {t:'Confira a natureza da infração',d:'Infração leve, ou uma única média, não impede a CNH definitiva. Grave, gravíssima ou média reincidente impedem.'},
   {t:'Avalie apresentar defesa e recurso',d:'Se você acha que a multa está errada, recorra dentro do prazo. Se o recurso for aceito, a infração deixa de contar.'},
   {t:'Se não for possível reverter',d:'Será necessário reiniciar o processo de habilitação, incluindo os exames exigidos pelo Detran.'},
   {t:'Volte a estudar',d:'Use os simulados do app para se preparar para a nova prova teórica.'}
  ]},
 multa:{icon:'📄',title:'Recebi uma multa e quero recorrer',
  intro:'Toda multa passa por um processo em que você tem <strong>direito de defesa</strong>. Recorrer é um direito, e não custa nada.',
  why:['Erro nos dados do auto (placa, local, modelo do veículo)','Notificação enviada fora do prazo de 30 dias (Art. 281)','Situação de emergência ou outra justificativa com provas'],
  steps:[
   {t:'Leia a notificação da autuação',d:'Ela traz a infração, o local, a data e o prazo para a defesa prévia (e para indicar o condutor, se não era você).'},
   {t:'Indique o condutor, se for o caso',d:'Se outra pessoa dirigia, indique o condutor no prazo. Assim, os pontos vão para a CNH de quem dirigia.'},
   {t:'Apresente a defesa prévia',d:'Explique por que a autuação deve ser cancelada e junte provas (fotos, documentos).'},
   {t:'Recorra à JARI',d:'Se a defesa for negada e você receber a notificação da penalidade, recorra à JARI no prazo indicado (nunca menor que 30 dias).'},
   {t:'Recorra ao CETRAN',d:'Se a JARI negar, ainda cabe recurso em segunda instância ao CETRAN (ou CONTRANDIFE, no DF).'}
  ]}
};

function st(){if(!state.recover)state.recover={sit:null,checks:{}};return state.recover;}

window.openRecover=function(){navigate('screen-recover');renderRecover();};
window.setRecoverSit=function(k){st().sit=k;saveState();renderRecover();setTimeout(()=>{const el=document.getElementById('recSteps');if(el)el.scrollIntoView({behavior:'smooth',block:'start'});},50);};
window.toggleRecStep=function(k,i){const c=st().checks;const key=k+':'+i;c[key]=!c[key];saveState();renderRecover();};

window.renderRecover=function(){
  const s=st();const sit=s.sit&&SITUATIONS[s.sit];
  let h=`
  <div class="card" style="border-color:var(--blue)">
    <h3 style="margin-bottom:6px">🔄 Você não está sozinho</h3>
    <p>Perder o direito de dirigir é difícil, mas há um caminho. Aqui você entende sua situação, acompanha o passo a passo e se prepara para as provas.</p>
  </div>
  <div class="section-title">Qual é a sua situação?</div>
  <div class="rec-grid">${Object.entries(SITUATIONS).map(([k,v])=>`<div class="rec-opt${s.sit===k?' selected':''}" onclick="setRecoverSit('${k}')"><div style="font-size:24px">${v.icon}</div><div>${v.title}</div></div>`).join('')}</div>`;

  if(sit){
    const done=sit.steps.filter((_,i)=>s.checks[s.sit+':'+i]).length;
    h+=`<div id="recSteps" class="card" style="margin-top:12px">
      <h3>${sit.icon} ${sit.title}</h3>
      <p style="margin:8px 0;color:#cbd5e1;font-size:14px;line-height:1.5">${sit.intro}</p>
      <div class="label-sm" style="margin-top:10px">MOTIVOS MAIS COMUNS</div>
      <ul class="rec-list">${sit.why.map(w=>`<li>${w}</li>`).join('')}</ul>
      <div class="label-sm" style="margin-top:12px">PASSO A PASSO · ${done}/${sit.steps.length} concluídos</div>
      <div class="progress-bar"><div class="progress-fill green" style="width:${Math.round(done/sit.steps.length*100)}%"></div></div>
      ${sit.steps.map((p,i)=>{const ok=s.checks[s.sit+':'+i];return `<div class="rec-step${ok?' done':''}" onclick="toggleRecStep('${s.sit}',${i})"><div class="rec-check">${ok?'✓':i+1}</div><div><strong>${p.t}</strong><p>${p.d}</p></div></div>`;}).join('')}
    </div>`;
  }

  h+=`
  <div class="section-title">🧮 Calculadora de pontos</div>
  <div class="card">
    <p style="margin-bottom:10px">Quantas infrações você cometeu nos <strong>últimos 12 meses</strong>?</p>
    ${[['leve','Leves (3 pts)'],['media','Médias (4 pts)'],['grave','Graves (5 pts)'],['gravissima','Gravíssimas (7 pts)']].map(([k,l])=>`<div class="stat-row"><span class="stat-label">${l}</span><span><button class="cnt-btn" onclick="cntPts('${k}',-1)">−</button><span class="cnt-val" id="cnt-${k}">0</span><button class="cnt-btn" onclick="cntPts('${k}',1)">+</button></span></div>`).join('')}
    <label class="stat-row" style="cursor:pointer"><span class="stat-label">Exerço atividade remunerada ao volante (EAR)</span><input type="checkbox" id="cntEar" onchange="calcPts()" style="width:20px;height:20px"></label>
    <div id="ptsResult" style="margin-top:12px"></div>
  </div>

  <div class="section-title">📅 Quando termina a suspensão?</div>
  <div class="card">
    <div class="stat-row"><span class="stat-label">Início da suspensão</span><input type="date" id="susStart" class="date-in" onchange="calcSus()"></div>
    <div class="stat-row"><span class="stat-label">Duração (meses)</span><input type="number" id="susMonths" class="date-in" min="1" max="24" value="12" onchange="calcSus()" style="width:80px"></div>
    <div id="susResult" style="margin-top:10px;font-size:14px"></div>
  </div>

  <div class="section-title">📝 Treino para a prova da reciclagem</div>
  <div class="card">
    <p>20 questões de legislação, direção defensiva e primeiros socorros, incluindo regras de suspensão, cassação e recursos.</p>
    <button class="btn btn-primary" style="margin-top:10px" onclick="startRecicQuiz()">Começar treino</button>
  </div>

  <div class="section-title">⚠️ Fique atento</div>
  <div class="card">
    <ul class="rec-list">
      <li><strong>Nunca dirija com a CNH suspensa:</strong> isso leva à cassação e é crime.</li>
      <li><strong>O curso de reciclagem está mudando:</strong> normas recentes ampliam a carga horária e exigem aulas presenciais ou ao vivo. A mudança está sendo aplicada aos poucos em cada estado.</li>
      <li><strong>Prazos são tudo:</strong> defesa e recursos fora do prazo não são analisados.</li>
      <li><strong>Consulte seus pontos e processos</strong> no app Carteira Digital de Trânsito ou no site do Detran do seu estado.</li>
      <li>Para casos complexos, procure um advogado especialista em trânsito ou a <strong>Defensoria Pública</strong>.</li>
    </ul>
    <button class="btn btn-outline" style="margin-top:10px" onclick="openLaws('pen')">📖 Ver as leis sobre penalidades</button>
  </div>
  <p style="font-size:11px;color:var(--gray);margin:12px 0;line-height:1.4">Orientação geral para estudo, baseada no CTB. Não é orientação jurídica. Os procedimentos variam conforme o estado: confirme sempre no Detran.</p>`;
  document.getElementById('recoverBody').innerHTML=h;
  calcPts();
};

// ---------- calculadora de pontos ----------
const cnt={leve:0,media:0,grave:0,gravissima:0};
window.cntPts=function(k,d){cnt[k]=Math.max(0,cnt[k]+d);document.getElementById('cnt-'+k).textContent=cnt[k];calcPts();};
window.calcPts=function(){
  const el=document.getElementById('ptsResult');if(!el)return;
  Object.keys(cnt).forEach(k=>{const e=document.getElementById('cnt-'+k);if(e)e.textContent=cnt[k];});
  const total=cnt.leve*3+cnt.media*4+cnt.grave*5+cnt.gravissima*7;
  const ear=document.getElementById('cntEar')&&document.getElementById('cntEar').checked;
  const lim=ear?40:cnt.gravissima>=2?20:cnt.gravissima===1?30:40;
  const why=ear?'motorista com atividade remunerada (EAR)':cnt.gravissima>=2?'2 ou mais gravíssimas':cnt.gravissima===1?'1 gravíssima':'nenhuma gravíssima';
  const pct=Math.min(100,Math.round(total/lim*100));
  const color=total>=lim?'var(--red)':pct>=75?'var(--orange)':'var(--green)';
  el.innerHTML=`<div style="font-size:28px;font-weight:700;color:${color}">${total} pontos</div>
    <div style="font-size:13px;color:var(--gray)">Seu limite: <strong>${lim} pontos</strong> (${why})</div>
    <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${color}"></div></div>
    <div style="font-size:13px;margin-top:4px">${total>=lim?'⛔ Pela soma, a CNH pode ser suspensa. Acompanhe o processo no Detran.':total===0?'Use os botões + e − para simular.':`✅ Faltam ${lim-total} pontos para o limite.`}</div>
    <div style="font-size:11px;color:var(--gray);margin-top:6px">Algumas infrações suspendem a CNH diretamente, independentemente dos pontos (ex.: álcool ao volante).</div>`;
};

// ---------- calculadora de prazo ----------
window.calcSus=function(){
  const a=document.getElementById('susStart').value,m=parseInt(document.getElementById('susMonths').value,10);
  const el=document.getElementById('susResult');
  if(!a||!m){el.textContent='';return;}
  const d=new Date(a+'T12:00:00');d.setMonth(d.getMonth()+m);
  const hoje=new Date();const dias=Math.ceil((d-hoje)/86400000);
  el.innerHTML=`Fim previsto: <strong>${d.toLocaleDateString('pt-BR')}</strong><br>${dias>0?`Faltam cerca de <strong>${dias} dias</strong>.`:'O prazo já terminou: lembre-se do curso de reciclagem e de pedir a liberação da CNH.'}<div style="font-size:11px;color:var(--gray);margin-top:6px">Estimativa. A data oficial é a informada pelo Detran.</div>`;
};

// ---------- questões da reciclagem ----------
const RECIC=[
 {text:'O condutor que cumpriu o prazo de suspensão, mas NÃO fez o curso de reciclagem:',options:['Recebe a CNH de volta automaticamente','Não pode ter a CNH devolvida até concluir o curso','Tem a CNH cassada imediatamente','Precisa pagar uma multa extra'],correct:1,explanation:'O curso de reciclagem é obrigatório para quem teve o direito de dirigir suspenso (Art. 268). Sem ele, a CNH não é devolvida.',legal:'CTB Art. 268'},
 {text:'Dirigir com o direito de dirigir suspenso leva a:',options:['Advertência por escrito','Apenas multa leve','Cassação da CNH, além de ser crime','Aumento do prazo em 1 mês'],correct:2,explanation:'Dirigir suspenso é causa de cassação (Art. 263) e também crime de violação da suspensão (Art. 307).',legal:'CTB Art. 263 e Art. 307'},
 {text:'Após a cassação da CNH, o condutor pode pedir a reabilitação depois de:',options:['6 meses','1 ano','2 anos','5 anos'],correct:2,explanation:'Decorridos 2 anos da cassação, o infrator pode requerer a reabilitação, refazendo os exames necessários à habilitação (Art. 263).',legal:'CTB Art. 263'},
 {text:'Um condutor com 1 infração gravíssima nos últimos 12 meses tem a CNH suspensa ao atingir:',options:['20 pontos','30 pontos','40 pontos','50 pontos'],correct:1,explanation:'Pela Lei 14.071/2020: 20 pontos com 2 ou mais gravíssimas, 30 pontos com 1 gravíssima e 40 pontos sem gravíssima.',legal:'CTB Art. 261'},
 {text:'Recusar o teste do bafômetro:',options:['Não gera penalidade','É infração leve','Tem as mesmas penalidades de dirigir sob efeito de álcool','Só gera advertência'],correct:2,explanation:'O Art. 165-A prevê infração gravíssima, multa ×10 e suspensão do direito de dirigir por 12 meses, as mesmas penalidades do Art. 165.',legal:'CTB Art. 165-A'},
 {text:'Se a JARI negar o recurso contra uma multa, o condutor ainda pode recorrer ao:',options:['CETRAN (ou CONTRANDIFE, no DF)','DENATRAN','Ministério Público','Não cabe mais recurso'],correct:0,explanation:'Da decisão da JARI cabe recurso em segunda instância ao CETRAN, nos estados, ou ao CONTRANDIFE, no Distrito Federal.',legal:'CTB Art. 288 e Art. 289'},
 {text:'Quem está com a Permissão para Dirigir (PPD) e comete uma infração GRAVE:',options:['Recebe a CNH definitiva normalmente','Perde só 5 pontos','Não recebe a CNH definitiva e precisa reiniciar o processo','Ganha mais 1 ano de PPD'],correct:2,explanation:'A CNH definitiva só é entregue se o condutor não cometer infração grave ou gravíssima nem for reincidente em média durante a PPD (Art. 148).',legal:'CTB Art. 148'},
 {text:'Se a notificação da autuação não for expedida em até 30 dias:',options:['O prazo é prorrogado','O auto de infração é arquivado','A multa dobra','O condutor perde o direito de recorrer'],correct:1,explanation:'O Art. 281 determina o arquivamento do auto se a notificação da autuação não for expedida no prazo de 30 dias.',legal:'CTB Art. 281'}
];
if(typeof QUESTIONS!=='undefined'){
  RECIC.forEach((q,i)=>QUESTIONS.push(Object.assign({id:2000+i,theme:'Legislação',category:'all',recic:true},q)));
}
window.startRecicQuiz=function(){
  const recic=QUESTIONS.filter(q=>q.recic);
  const base=shuffleArray(QUESTIONS.filter(q=>!q.recic&&!q.sign&&['Legislação','Direção Defensiva','Primeiros Socorros'].includes(q.theme)));
  const qs=shuffleArray(recic.concat(base.slice(0,20-recic.length)));
  startQuizWithQuestions(qs,qs.length,qs.length*120);
};
})();
