// ============================================
// BIBLIOTECA DE LEIS — CTB (Lei 9.503/1997) e normas recentes
// Resumos em linguagem simples. NÃO substituem o texto oficial.
// ============================================
(function(){
const CTB_URL='https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm';

const CHAPTERS={
 geral:'Disposições gerais',
 circ:'Normas de circulação',
 ped:'Pedestres, ciclistas e motos',
 seg:'Segurança e equipamentos',
 hab:'Habilitação',
 inf:'Infrações',
 pen:'Penalidades e pontos',
 proc:'Multas e recursos',
 crime:'Crimes de trânsito',
 novas:'Normas recentes'
};

// art: número do artigo (texto). Use '' para normas fora do CTB.
const LAWS=[
// ----- DISPOSIÇÕES GERAIS -----
{art:'1',ch:'geral',title:'Trânsito seguro é um direito de todos',simple:'O trânsito em condições seguras é um direito de todos e um dever dos órgãos de trânsito. Esses órgãos devem dar prioridade à defesa da vida, à saúde e ao meio ambiente.',ex:'Por isso as campanhas e as regras do CTB sempre colocam a vida em primeiro lugar.'},
{art:'26',ch:'geral',title:'Comportamento de quem usa a via',simple:'Todos (motoristas, pedestres e ciclistas) devem evitar atitudes que coloquem pessoas em perigo, atrapalhem o trânsito ou danifiquem coisas públicas ou particulares. Também é proibido jogar ou deixar objetos na via.',ex:'Jogar lixo pela janela do carro desrespeita esta regra.'},
{art:'27',ch:'geral',title:'Conferir o veículo antes de sair',simple:'Antes de sair com o veículo, o condutor deve verificar se ele está em boas condições e se há combustível suficiente para chegar ao destino.',ex:'Ficar sem combustível na pista é infração (Art. 180).'},
{art:'28',ch:'geral',title:'Domínio do veículo',simple:'O condutor deve ter, o tempo todo, domínio do veículo, dirigindo com atenção e os cuidados necessários para a segurança.',ex:'Dirigir distraído, comendo ou mexendo no celular vai contra este artigo.'},

// ----- NORMAS DE CIRCULAÇÃO -----
{art:'29',ch:'circ',title:'Regras gerais de circulação e preferência',simple:'Circule pelo lado direito da via e mantenha distância segura do veículo da frente. Em cruzamento SEM sinalização, a preferência é: 1) de quem está na rodovia; 2) de quem já está circulando na rotatória; 3) nos demais casos, de quem vem pela DIREITA. A ultrapassagem deve ser feita pela ESQUERDA. Veículos de emergência (bombeiros, ambulância, polícia) com sirene e luz ligadas têm prioridade.',ex:'Numa rotatória sem placa, quem já está girando nela passa primeiro.'},
{art:'32',ch:'circ',title:'Onde não ultrapassar (curvas e aclives)',simple:'É proibido ultrapassar em curvas e aclives (subidas) sem visibilidade suficiente, nas passagens de nível, pontes e viadutos e nas travessias de pedestres, salvo onde houver sinalização permitindo.',ex:'Ultrapassar em curva sem visibilidade é muito perigoso e é infração.'},
{art:'38',ch:'circ',title:'Como fazer conversões',simple:'Para virar à direita, aproxime-se o máximo possível do lado direito da via. Para virar à esquerda, aproxime-se do eixo (centro) da via, em vias de mão dupla, ou do lado esquerdo, em vias de mão única. Sempre sinalize antes.',ex:'Ligue a seta com antecedência e faça a conversão no menor espaço possível.'},
{art:'40',ch:'circ',title:'Uso das luzes (faróis)',simple:'Use farol baixo à noite e, durante o dia, em túneis e sob chuva forte, neblina ou cerração. Durante o dia, o farol baixo também é obrigatório em rodovias de pista simples fora das cidades, para veículos sem luz de rodagem diurna (DRL). O farol alto só pode ser usado em vias sem iluminação e nunca quando houver veículo à frente ou vindo no sentido contrário.',ex:'Na neblina, use farol baixo (e de neblina, se houver). O farol alto reflete na neblina e piora a visão.'},
{art:'44',ch:'circ',title:'Aproximação de cruzamentos',simple:'Ao se aproximar de um cruzamento, o condutor deve ter cuidado especial e estar em velocidade moderada, pronto para parar e dar preferência a quem tem direito.',ex:'Reduza antes do cruzamento, mesmo com sinal verde.'},
{art:'45',ch:'circ',title:'Não bloquear o cruzamento',simple:'Mesmo com o sinal verde, não entre no cruzamento se houver risco de ficar parado no meio dele, atrapalhando o trânsito transversal.',ex:'Se o trânsito do outro lado está parado, espere antes da faixa.'},
{art:'89',ch:'circ',title:'Qual sinal vale mais',simple:'Quando as sinalizações "brigam", vale esta ordem: 1) as ordens do agente de trânsito; 2) o semáforo; 3) as placas e demais sinais; 4) as regras gerais de circulação.',ex:'Semáforo verde, mas o agente mandou parar? Pare.'},
{art:'61',ch:'circ',title:'Velocidade máxima',simple:'Onde não houver placa, valem estes limites. Vias URBANAS: trânsito rápido 80 km/h, arterial 60 km/h, coletora 40 km/h, local 30 km/h. RODOVIAS de pista dupla: 110 km/h (carros, camionetas e motos) e 90 km/h (demais). RODOVIAS de pista simples: 100 km/h (carros, camionetas e motos) e 90 km/h (demais). ESTRADAS (não pavimentadas): 60 km/h.',ex:'Viu placa? Vale a placa. Não viu? Vale a tabela do Art. 61.'},
{art:'62',ch:'circ',title:'Velocidade mínima',simple:'A velocidade mínima não pode ser inferior à metade da velocidade máxima da via, respeitadas as condições do trânsito e do tempo.',ex:'Numa via de 80 km/h, andar abaixo de 40 km/h sem motivo é infração.'},

// ----- PEDESTRES, CICLISTAS E MOTOS -----
{art:'54',ch:'ped',title:'Condutor de moto',simple:'O condutor de moto, motoneta ou ciclomotor só pode circular usando capacete com viseira ou óculos de proteção e vestuário de acordo com as normas do CONTRAN, segurando o guidom com as duas mãos.',ex:'Pilotar sem capacete é infração gravíssima (Art. 244).'},
{art:'55',ch:'ped',title:'Passageiro de moto',simple:'O passageiro da moto deve usar capacete e ir sentado no assento, atrás do condutor, com os pés nos apoios.',ex:'Levar passageiro sem capacete também é infração gravíssima.'},
{art:'58',ch:'ped',title:'Bicicletas na via',simple:'Onde não houver ciclovia, ciclofaixa ou acostamento, as bicicletas circulam nos bordos (cantos) da pista, no mesmo sentido dos carros, e têm preferência sobre os veículos motorizados.',ex:'Ao passar por um ciclista, mantenha distância lateral segura.'},
{art:'68',ch:'ped',title:'Direitos do pedestre',simple:'O pedestre tem direito de usar as calçadas e passeios. Onde não houver calçada, deve andar pelo acostamento ou, se não houver, pela lateral da pista, em fila única e no sentido contrário ao dos veículos (salvo perigo).',ex:'Na estrada sem calçada, ande de frente para os carros, assim você os vê chegando.'},
{art:'70',ch:'ped',title:'Preferência do pedestre na faixa',simple:'O pedestre que estiver atravessando na faixa de pedestres tem prioridade de passagem, exceto onde houver semáforo: aí vale o sinal.',ex:'Deixar de dar preferência ao pedestre na faixa é infração gravíssima (Art. 214).'},

// ----- SEGURANÇA E EQUIPAMENTOS -----
{art:'105',ch:'seg',title:'Equipamentos obrigatórios',simple:'Lista os equipamentos obrigatórios dos veículos, como cinto de segurança. O tacógrafo (registrador de velocidade e tempo) é obrigatório em veículos de transporte escolar, de passageiros com mais de 10 lugares e de carga com peso bruto acima de 4.536 kg.',ex:'O extintor deixou de ser obrigatório para automóveis em 2015 (Resolução 556), mas continua para caminhões e ônibus.'},
{art:'130',ch:'seg',title:'Licenciamento anual',simple:'Todo veículo automotor deve ser licenciado todos os anos no órgão de trânsito do estado onde está registrado.',ex:'Conduzir veículo não licenciado é infração gravíssima (Art. 230, V).'},
{art:'64',ch:'seg',title:'Crianças no banco traseiro',simple:'Crianças de até 10 anos que ainda não atingiram 1,45 m de altura devem ser transportadas no banco traseiro, usando o dispositivo de retenção adequado (bebê-conforto, cadeirinha ou assento de elevação), salvo exceções previstas pelo CONTRAN.',ex:'Transportar criança sem a cadeirinha adequada é infração gravíssima (Art. 168).'},
{art:'65',ch:'seg',title:'Cinto de segurança',simple:'O uso do cinto de segurança é obrigatório para o condutor e TODOS os passageiros, em todas as vias do país.',ex:'Deixar de usar o cinto é infração grave (Art. 167).'},
{art:'99',ch:'seg',title:'Peso e dimensões dos veículos',simple:'Os veículos só podem circular respeitando os limites de peso e dimensões fixados pelo CONTRAN. Quem ultrapassa esses limites precisa de Autorização Especial de Trânsito (AET).',ex:'Caminhões com excesso de peso podem ser multados e retidos.'},

// ----- HABILITAÇÃO -----
{art:'140',ch:'hab',title:'Requisitos para tirar a CNH',simple:'Para se habilitar, a pessoa deve: ser penalmente imputável (ter 18 anos ou mais), saber ler e escrever e possuir documento de identidade.',ex:'Por isso, menores de 18 anos não podem dirigir no Brasil.'},
{art:'138',ch:'hab',title:'Condutor de transporte escolar',simple:'Para dirigir veículo de transporte escolar, o condutor precisa ter mais de 21 anos, ser habilitado na categoria D, fazer curso especializado e não ter cometido infração grave ou gravíssima (nem ser reincidente em média) nos últimos 12 meses.',ex:''},
{art:'141',ch:'hab',title:'Ciclomotores e a ACC',simple:'Para conduzir ciclomotor (cicloelétrico ou motor de até 50 cilindradas) é necessária a ACC (Autorização para Conduzir Ciclomotor) ou a CNH categoria A.',ex:'Dirigir ciclomotor sem ACC ou categoria A é como dirigir sem habilitação.'},
{art:'143',ch:'hab',title:'Categorias da CNH',simple:'A: motos, motonetas e triciclos. B: carros de até 3.500 kg e até 8 lugares além do motorista. C: veículos de carga acima de 3.500 kg. D: transporte de passageiros com mais de 8 lugares além do motorista (ônibus, vans). E: combinações de veículos em que a unidade acoplada (reboque, semirreboque ou articulado) tenha 6.000 kg ou mais, ou mais de 8 lugares.',ex:'Para dirigir ônibus é preciso categoria D.'},
{art:'147',ch:'hab',title:'Exames para a habilitação',simple:'O candidato passa por exames de aptidão física e mental, avaliação psicológica, exame teórico (legislação, direção defensiva, primeiros socorros etc.) e exame prático de direção.',ex:'Em 2026, o exame teórico tem 30 questões e aprova com 20 acertos (Resolução 1.020/2025).'},
{art:'148',ch:'hab',title:'Permissão para Dirigir (PPD)',simple:'Quem é aprovado recebe primeiro a Permissão para Dirigir, válida por 1 ano. A CNH definitiva só é entregue se, nesse período, o condutor não cometer nenhuma infração grave ou gravíssima e não for reincidente em infração média.',ex:'Uma única infração grave durante a PPD faz o condutor recomeçar o processo de habilitação.'},
{art:'148-A',ch:'hab',title:'Exame toxicológico (C, D e E)',simple:'Condutores das categorias C, D e E devem fazer exame toxicológico para habilitar ou renovar e também periodicamente (a cada 2 anos e 6 meses, para quem tem menos de 70 anos).',ex:'Deixar de fazer o exame periódico no prazo é infração (Art. 165-B).'},

// ----- INFRAÇÕES -----
{art:'161',ch:'inf',title:'O que é infração de trânsito',simple:'Infração é desobedecer qualquer regra do CTB, da legislação complementar ou das resoluções do CONTRAN. O infrator fica sujeito às penalidades e medidas administrativas previstas.',ex:'Cada infração tem uma natureza: leve, média, grave ou gravíssima.'},
{art:'162',ch:'inf',title:'Dirigir sem habilitação',simple:'Dirigir sem possuir CNH ou PPD é infração gravíssima, com multa multiplicada por 3 e retenção do veículo até que apareça um condutor habilitado. Dirigir com CNH de categoria diferente da do veículo também é gravíssima.',ex:'Ter CNH B e dirigir moto (categoria A) é infração.'},
{art:'165',ch:'inf',title:'Dirigir sob efeito de álcool',simple:'Dirigir sob a influência de álcool ou outra substância psicoativa é infração gravíssima: multa multiplicada por 10, suspensão do direito de dirigir por 12 meses, recolhimento da CNH e retenção do veículo. Em caso de reincidência em 12 meses, a multa é dobrada.',ex:'A lei tem tolerância zero: não existe "um copinho só".'},
{art:'165-A',ch:'inf',title:'Recusar o teste do bafômetro',simple:'Recusar-se a fazer o teste do bafômetro, exame clínico ou outro procedimento que verifique a influência de álcool tem as MESMAS penalidades do Art. 165: gravíssima, multa ×10 e suspensão por 12 meses.',ex:'Recusar o bafômetro não livra o condutor da punição.'},
{art:'167',ch:'inf',title:'Não usar o cinto de segurança',simple:'Deixar o condutor ou o passageiro de usar o cinto de segurança é infração grave, com retenção do veículo até que a situação seja corrigida.',ex:'Vale também para quem está no banco de trás.'},
{art:'168',ch:'inf',title:'Transportar criança sem segurança',simple:'Transportar crianças sem observar as normas de segurança (como a cadeirinha adequada) é infração gravíssima, com retenção do veículo até a regularização.',ex:'Veja também o Art. 64.'},
{art:'169',ch:'inf',title:'Dirigir sem atenção',simple:'Dirigir sem atenção ou sem os cuidados indispensáveis à segurança é infração leve.',ex:'É a "infração genérica" para quem se distrai ao volante.'},
{art:'172',ch:'inf',title:'Jogar objetos na via',simple:'Atirar do veículo ou abandonar na via objetos ou substâncias é infração média.',ex:'Inclui jogar lixo, bitucas de cigarro e garrafas pela janela.'},
{art:'173',ch:'inf',title:'Racha (disputar corrida)',simple:'Disputar corrida na via é infração gravíssima, com multa multiplicada por 10, suspensão do direito de dirigir e remoção do veículo. Também é crime (Art. 308).',ex:'Na reincidência em 12 meses, a multa dobra e pode levar à cassação.'},
{art:'176',ch:'inf',title:'Envolvido em acidente com vítima',simple:'O condutor ENVOLVIDO em acidente com vítima deve: prestar ou providenciar socorro, sinalizar o local, preservar o local para a perícia, não mexer nos veículos (salvo para socorro ou segurança) e identificar-se à polícia. Descumprir é infração gravíssima, com multa ×5 e suspensão do direito de dirigir.',ex:'Primeiro sinalize, depois chame socorro (192 SAMU / 193 Bombeiros).'},
{art:'177',ch:'inf',title:'Deixar de socorrer (não envolvido)',simple:'Deixar de prestar socorro à vítima de acidente, quando solicitado pela autoridade, mesmo não estando envolvido no acidente, é infração grave.',ex:'Chamar o socorro já é uma forma de ajudar.'},
{art:'181',ch:'inf',title:'Infrações de estacionamento',simple:'Lista os lugares onde é proibido estacionar. Exemplos: a menos de 5 m da esquina; afastado da guia (meio-fio) mais de 50 cm; em frente a hidrantes; na guia rebaixada de entrada e saída de veículos (garagem); na calçada, na faixa de pedestres ou na ciclovia; em vagas reservadas sem credencial. Cada caso tem sua natureza (leve a gravíssima).',ex:'Estacionar em vaga de idoso ou de pessoa com deficiência sem credencial é gravíssima.'},
{art:'193',ch:'inf',title:'Andar por calçada ou acostamento',simple:'Transitar com o veículo em calçadas, passeios, ciclovias, ciclofaixas, ilhas, canteiros ou acostamentos é infração gravíssima, com multa multiplicada por 3.',ex:'O acostamento é só para emergências e paradas, não para "furar fila".'},
{art:'196',ch:'inf',title:'Não sinalizar a manobra',simple:'Deixar de indicar com antecedência, pela seta ou por gesto, o início de uma manobra (mudar de faixa, virar, sair da vaga) é infração grave.',ex:'Ligue a seta antes de começar a manobra, não durante.'},
{art:'203',ch:'inf',title:'Ultrapassagem proibida pela contramão',simple:'Ultrapassar pela contramão em curvas, aclives sem visibilidade, faixas de pedestres, pontes, viadutos, túneis, ou onde houver linha amarela contínua (simples ou dupla) é infração gravíssima, com multa multiplicada por 5.',ex:'Na reincidência em 12 meses, a multa é dobrada.'},
{art:'208',ch:'inf',title:'Avançar o sinal vermelho',simple:'Avançar o sinal vermelho do semáforo ou o de parada obrigatória (PARE) é infração gravíssima.',ex:'Sinal amarelo significa "pare, se for seguro", e não "acelere".'},
{art:'214',ch:'inf',title:'Não dar preferência ao pedestre',simple:'Deixar de dar preferência ao pedestre que está atravessando na faixa (ou que já iniciou a travessia quando o sinal abriu para o veículo) é infração gravíssima. Em outras situações previstas no artigo, pode ser grave.',ex:'Pedestre na faixa: pare e espere.'},
{art:'218',ch:'inf',title:'Excesso de velocidade',simple:'Ultrapassar a velocidade máxima em até 20% é infração média. Entre 20% e 50%, é grave. Acima de 50%, é gravíssima, com multa multiplicada por 3 e suspensão do direito de dirigir.',ex:'Numa via de 60 km/h, passar a 95 km/h (mais de 50% acima) é gravíssima.'},
{art:'220',ch:'inf',title:'Não reduzir a velocidade quando necessário',simple:'É infração deixar de reduzir a velocidade de forma compatível com a segurança em várias situações, como perto de escolas, hospitais e locais com muitos pedestres, sob chuva ou neblina, em curvas e cruzamentos. A natureza varia conforme o caso (pode ser gravíssima).',ex:'Perto de escola, reduza a velocidade mesmo sem placa.'},
{art:'227',ch:'inf',title:'Uso indevido da buzina',simple:'É infração leve usar a buzina de forma indevida: em toque prolongado, entre 22h e 6h, em locais proibidos pela sinalização ou sem ser para um toque breve de advertência.',ex:''},
{art:'230',ch:'inf',title:'Irregularidades no veículo',simple:'Lista irregularidades do próprio veículo: placa adulterada, falta de licenciamento, equipamento obrigatório com defeito, escapamento livre ou silenciador defeituoso (barulho excessivo), entre outras. A natureza varia de grave a gravíssima.',ex:'Escapamento barulhento adulterado é infração grave.'},
{art:'231',ch:'inf',title:'Irregularidades ao transitar',simple:'Lista várias formas irregulares de transitar, como com o veículo desligado ou desengrenado em declive ("banguela"), que é infração média, ou com excesso de peso.',ex:'A banguela tira o freio motor e é perigosa nas descidas.'},
{art:'244',ch:'inf',title:'Infrações com motocicleta',simple:'É infração gravíssima pilotar moto sem capacete (condutor ou passageiro), transportar criança abaixo da idade mínima prevista em lei ou sem condições de cuidar da própria segurança, ou fazer malabarismo e andar em uma roda só, entre outras situações.',ex:'Inclui suspensão do direito de dirigir em vários incisos.'},
{art:'252',ch:'inf',title:'Celular e outras distrações',simple:'Dirigir usando fones de ouvido ou telefone celular é infração média. Se o condutor estiver SEGURANDO ou MANUSEANDO o celular, a infração é gravíssima. O artigo também proíbe dirigir com o braço para fora, com apenas uma das mãos (salvo para sinalizar ou trocar marcha) e com calçado que não se firme nos pés.',ex:'Mexer no celular, mesmo parado no semáforo, é gravíssima.'},

// ----- PENALIDADES E PONTOS -----
{art:'256',ch:'pen',title:'Tipos de penalidades',simple:'As penalidades possíveis são: advertência por escrito, multa, suspensão do direito de dirigir, cassação da CNH, cassação da Permissão para Dirigir e frequência obrigatória em curso de reciclagem.',ex:'"Medida administrativa" (como retenção do veículo) é diferente de penalidade.'},
{art:'258',ch:'pen',title:'Valores das multas',simple:'Leve: R$ 88,38. Média: R$ 130,16. Grave: R$ 195,23. Gravíssima: R$ 293,47. Algumas infrações gravíssimas têm fator multiplicador (×3, ×5 ou ×10).',ex:'Álcool ao volante: ×10 = R$ 2.934,70.'},
{art:'259',ch:'pen',title:'Pontos na CNH',simple:'Cada infração soma pontos no prontuário do condutor: leve 3, média 4, grave 5 e gravíssima 7.',ex:'Os pontos ficam registrados por 12 meses para fins de suspensão.'},
{art:'261',ch:'pen',title:'Suspensão do direito de dirigir',simple:'A suspensão por pontos ocorre ao atingir, em 12 meses: 20 pontos, se houver 2 ou mais infrações gravíssimas; 30 pontos, se houver 1 gravíssima; ou 40 pontos, se não houver nenhuma gravíssima. Motoristas que exercem atividade remunerada (EAR) seguem o limite de 40 pontos. O prazo de suspensão vai de 6 meses a 1 ano (de 8 a 24 meses em caso de reincidência). Para recuperar a CNH, é preciso cumprir o prazo e fazer o curso de reciclagem.',ex:'Algumas infrações graves suspendem a CNH diretamente, sem depender de pontos (ex.: álcool, Art. 165).'},
{art:'263',ch:'pen',title:'Cassação da CNH',simple:'A CNH é cassada quando o condutor: dirige com o direito de dirigir suspenso; é reincidente, em 12 meses, em certas infrações (como álcool ao volante, racha, manobras perigosas e dirigir veículo de categoria diferente); ou é condenado judicialmente por crime de trânsito. Após 2 anos, pode voltar a se habilitar, refazendo todo o processo.',ex:'Cassação é mais grave que suspensão: a pessoa precisa começar do zero.'},
{art:'268',ch:'pen',title:'Curso de reciclagem',simple:'O curso de reciclagem é obrigatório para quem teve o direito de dirigir suspenso, para quem se envolveu em acidente grave ao qual deu causa, para quem foi condenado por crime de trânsito, entre outros casos.',ex:'Sem o curso, a CNH suspensa não é devolvida, mesmo depois de cumprido o prazo.'},

// ----- MULTAS E RECURSOS -----
{art:'280',ch:'proc',title:'Auto de infração',simple:'Quando o agente constata uma infração, ele lavra o auto de infração, com dados como local, data, hora, infração, placa do veículo e identificação do agente ou do equipamento (radar).',ex:'O auto é o "registro oficial" da infração.'},
{art:'281',ch:'proc',title:'Notificação da autuação',simple:'O órgão de trânsito deve enviar a notificação da autuação ao proprietário do veículo. Se ela não for expedida em até 30 dias, o auto é arquivado e a multa não vale.',ex:'Guarde as correspondências e confira os prazos.'},
{art:'282',ch:'proc',title:'Notificação da penalidade e prazos',simple:'Depois, o órgão envia a notificação da penalidade (a multa em si). O prazo para pagar ou recorrer é informado nela e não pode ser inferior a 30 dias.',ex:'Pagar até o vencimento dá desconto; em alguns casos, de até 40% pelo sistema SNE.'},
{art:'285',ch:'proc',title:'Recurso à JARI',simple:'O condutor pode recorrer da penalidade à JARI (Junta Administrativa de Recursos de Infrações). Se perder, ainda pode recorrer em segunda instância ao CETRAN (estados) ou CONTRANDIFE (Distrito Federal).',ex:'Ordem: defesa prévia → JARI → CETRAN/CONTRANDIFE.'},

// ----- CRIMES DE TRÂNSITO -----
{art:'288',ch:'proc',title:'Recurso em segunda instância',simple:'Das decisões da JARI cabe recurso em segunda instância, julgado pelo CETRAN (estados) ou pelo CONTRANDIFE (Distrito Federal), conforme o órgão que aplicou a multa (Art. 289).',ex:'O prazo é informado na notificação da decisão.'},
{art:'302',ch:'crime',title:'Homicídio culposo na direção',simple:'Matar alguém sem intenção (por imprudência, negligência ou imperícia) ao dirigir: detenção de 2 a 4 anos e suspensão ou proibição de dirigir. Se o condutor estiver sob efeito de álcool ou drogas, a pena é reclusão de 5 a 8 anos.',ex:'"Culposo" = sem intenção de matar.'},
{art:'303',ch:'crime',title:'Lesão corporal culposa na direção',simple:'Machucar alguém sem intenção ao dirigir: detenção de 6 meses a 2 anos. Se houver lesão grave e o condutor estiver sob efeito de álcool ou drogas, a pena é reclusão de 2 a 5 anos.',ex:''},
{art:'304',ch:'crime',title:'Omissão de socorro',simple:'Deixar o condutor envolvido em acidente de prestar socorro imediato à vítima (ou de pedir ajuda, quando não puder socorrer): detenção de 6 meses a 1 ano, ou multa.',ex:'Mesmo que outra pessoa já tenha socorrido, o condutor não pode simplesmente ir embora.'},
{art:'305',ch:'crime',title:'Fugir do local do acidente',simple:'Afastar-se do local do acidente para fugir da responsabilidade: detenção de 6 meses a 1 ano, ou multa.',ex:''},
{art:'306',ch:'crime',title:'Embriaguez ao volante (crime)',simple:'Dirigir com capacidade alterada por álcool ou droga é crime: detenção de 6 meses a 3 anos, multa e suspensão ou proibição de dirigir. É comprovado, por exemplo, com 0,3 mg de álcool por litro de ar no bafômetro (ou mais), exame de sangue, vídeo ou testemunhas.',ex:'Abaixo de 0,3 mg/L ainda é infração gravíssima (Art. 165).'},
{art:'307',ch:'crime',title:'Dirigir com a CNH suspensa',simple:'Violar a suspensão ou a proibição de dirigir é crime: detenção de 6 meses a 1 ano e multa, com nova imposição da penalidade.',ex:'Também leva à cassação da CNH (Art. 263).'},
{art:'308',ch:'crime',title:'Racha (crime)',simple:'Participar de corrida, disputa ou competição não autorizada na via, gerando risco: detenção de 6 meses a 3 anos, multa e suspensão ou proibição de dirigir. As penas aumentam muito se houver lesão grave ou morte.',ex:''},
{art:'309',ch:'crime',title:'Dirigir sem habilitação gerando perigo',simple:'Dirigir sem CNH ou PPD (ou com o direito cassado) gerando perigo de dano: detenção de 6 meses a 1 ano, ou multa.',ex:'Sem gerar perigo, é "só" infração gravíssima (Art. 162).'},
{art:'310',ch:'crime',title:'Entregar o veículo a quem não pode dirigir',simple:'Permitir, confiar ou entregar o veículo a pessoa não habilitada, com CNH suspensa ou cassada, ou sem condições de dirigir com segurança (por exemplo, embriagada): detenção de 6 meses a 1 ano, ou multa.',ex:'Emprestar o carro para um amigo que bebeu é crime.'},
{art:'311',ch:'crime',title:'Velocidade incompatível em locais sensíveis',simple:'Trafegar em velocidade incompatível com a segurança perto de escolas, hospitais, estações de embarque e desembarque, logradouros estreitos ou onde haja grande movimentação de pessoas, gerando perigo de dano: detenção de 6 meses a 1 ano, ou multa.',ex:''},

// ----- NORMAS RECENTES -----
{art:'',code:'Res. 1.020/2025',ch:'novas',title:'Resolução CONTRAN 1.020/2025 (CNH do Brasil)',simple:'Mudou a formação de condutores a partir de 2026: o curso teórico pode ser feito de graça e online (app CNH do Brasil) ou em autoescola. A prova teórica usa o Banco Nacional de Questões da Senatran, tem 30 questões e aprova com 20 acertos. Candidatos com TDAH e/ou TEA têm direito a tempo dobrado na prova.',ex:'O exame teórico e o prático continuam obrigatórios. Regras de detalhe podem variar entre os Detrans.'},
{art:'',code:'Lei 14.071/2020',ch:'novas',title:'Lei 14.071/2020 (reforma do CTB)',simple:'Alterou vários pontos do CTB a partir de 2021: a suspensão por pontos passou a ser de 20, 30 ou 40 pontos, conforme as infrações gravíssimas; ampliou a validade da CNH conforme a idade; e mudou as regras da cadeirinha (até 10 anos ou 1,45 m), entre outras mudanças.',ex:'Muito material antigo ainda fala em "20 pontos para todos": está desatualizado.'},
];

window.LAWS=LAWS;window.LAW_CHAPTERS=CHAPTERS;
const keyOf=l=>l.art?('art'+l.art):l.code;
const label=l=>l.art?('Art. '+l.art):l.code;
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

// ---------- tela ----------
let curCh='circ';
window.openLaws=function(ch){if(ch)curCh=ch;navigate('screen-laws');renderLawList();};
window.curLawChapter=function(k){curCh=k;const i=document.getElementById('lawSearch');if(i)i.value='';renderLawList();};
window.renderLawList=function(){
  const q=(document.getElementById('lawSearch')||{}).value||'';
  document.getElementById('lawTabs').innerHTML=Object.entries(CHAPTERS).map(([k,v])=>`<button class="sign-tab${k===curCh&&!q?' active':''}" style="${k===curCh&&!q?'border-color:var(--blue);color:var(--blue)':''}" onclick="curLawChapter('${k}')">${v}</button>`).join('');
  const nq=norm(q).replace(/^art\.?\s*/,'');
  const list=LAWS.filter(l=>q?norm(label(l)+' '+l.title+' '+l.simple+' '+(l.ex||'')).includes(norm(q))||(l.art&&l.art.toLowerCase()===nq):l.ch===curCh);
  document.getElementById('lawInfo').textContent=q?`${list.length} resultado(s) para "${q}"`:CHAPTERS[curCh];
  document.getElementById('lawList').innerHTML=list.map(l=>`<div class="card law-card" onclick="openLaw('${keyOf(l)}')"><div class="law-art">${label(l)}</div><h3>${l.title}</h3><p>${l.simple.length>110?l.simple.slice(0,110)+'…':l.simple}</p></div>`).join('')||'<p style="color:var(--gray);font-size:13px">Nada encontrado. Tente outra palavra.</p>';
};
window.openLaw=function(key){
  const l=LAWS.find(x=>keyOf(x)===key);if(!l)return;
  const related=(typeof QUESTIONS!=='undefined'&&l.art)?QUESTIONS.filter(q=>q.legal&&lawArts(q.legal).includes(l.art)):[];
  document.getElementById('lawModalBody').innerHTML=`
    <span class="badge badge-blue">${CHAPTERS[l.ch]}</span>
    <h3 style="margin:8px 0 2px">${l.art?'CTB — Art. '+l.art:l.code}</h3>
    <div style="font-size:15px;font-weight:600;margin-bottom:10px">${l.title}</div>
    <div class="label-sm">EM PALAVRAS SIMPLES</div>
    <p style="font-size:14px;line-height:1.6;color:#cbd5e1;margin-bottom:10px">${l.simple}</p>
    ${l.ex?`<div class="highlight-box"><div class="label">NA PRÁTICA</div><div class="value" style="font-size:13px">${l.ex}</div></div>`:''}
    <button class="btn btn-sm btn-outline" style="margin:6px 0" onclick="speakText(this.dataset.t)" data-t="${(l.title+'. '+l.simple+' '+(l.ex||'')).replace(/"/g,'&quot;')}">🔊 Ouvir</button>
    ${related.length?`<button class="btn btn-sm btn-primary" style="margin:6px 0 6px 6px" onclick="practiceLaw('${l.art}')">📝 Praticar ${related.length} questão(ões)</button>`:''}
    ${l.art?`<p style="font-size:12px;margin-top:10px"><a href="${CTB_URL}" target="_blank" rel="noopener" style="color:var(--blue)">Ler o texto oficial do CTB no site do Planalto ↗</a></p>`:''}
    <p style="font-size:11px;color:var(--gray);margin-top:8px">Resumo para estudo. Não substitui o texto oficial da lei.</p>`;
  document.getElementById('lawModal').classList.add('show');
};
window.closeLaw=function(){document.getElementById('lawModal').classList.remove('show');if(window.stopSpeaking)stopSpeaking();};

// leitura em voz alta genérica
window.speakText=function(t){
  if(!('speechSynthesis' in window))return;
  if(speechSynthesis.speaking){speechSynthesis.cancel();return;}
  const u=new SpeechSynthesisUtterance(t);u.lang='pt-BR';u.rate=0.95;
  const v=speechSynthesis.getVoices().find(v=>v.lang&&v.lang.toLowerCase().startsWith('pt'));if(v)u.voice=v;
  speechSynthesis.speak(u);
};

// ---------- ligação questão ↔ lei ----------
// Extrai os números de artigos do CTB citados no campo "legal" de uma questão.
function lawArts(legal){
  const out=[];
  if(/148-A/.test(legal))out.push('148-A');
  if(!/CTB/.test(legal))return out;
  const re=/Art\.\s*(\d+(?:-[A-Z])?)/g;let m;
  while((m=re.exec(legal)))if(!out.includes(m[1]))out.push(m[1]);
  return out;
}
window.lawArts=lawArts;
window.lawLinks=function(legal){
  const arts=lawArts(legal||'').filter(a=>LAWS.some(l=>l.art===a));
  if(!arts.length)return '';
  return '<div style="margin-top:8px">'+arts.map(a=>`<button class="law-chip" onclick="event.stopPropagation();openLaw('art${a}')">📖 Ver Art. ${a}</button>`).join('')+'</div>';
};
window.practiceLaw=function(art){
  closeLaw();
  const qs=QUESTIONS.filter(q=>q.legal&&lawArts(q.legal).includes(art));
  if(!qs.length)return;
  startQuizWithQuestions(shuffleArray(qs),qs.length,qs.length*120);
};
})();
