// Base de dados extraída da planilha "Tabela Resumo - Laudos Estruturais 2026.1"
// Para atualizar: edite as listas abaixo conforme necessário.

const BASE_CENARIOS = [
  {
    cidade: "Aeroporto Multiuso",
    codigo_cidade: "AERO",
    cenarios: [
      { nome: "AEROPORTO MULTIUSO", numero: "—", codigo: "AERO-001" },
    ]
  },
  {
    cidade: "Avião Multiuso",
    codigo_cidade: "AVIA",
    cenarios: [
      { nome: "AVIÃO MULTIUSO", numero: "—", codigo: "AVIA-001" },
    ]
  },
  {
    cidade: "Pousada",
    codigo_cidade: "POUS",
    cenarios: [
      { nome: "POUSADA", numero: "—", codigo: "POUS-001" },
    ]
  },
  {
    cidade: "CC1 – A01 | TRÊS GRAÇAS FT2 – CC CHACRINHA",
    codigo_cidade: "A01",
    cenarios: [
      { nome: "SET 01 A/B – TABACARIA – BARBEARIA E LOJA DE CELULAR", numero: "01", codigo: "A01-001" },
      { nome: "SET 01 C/D – BAR E ADEGA",                            numero: "01", codigo: "A01-002" },
      { nome: "SET 01 – GERLUCE",                                    numero: "01", codigo: "A01-003" },
      { nome: "SET 02 – DEPÓSITO/LOJAS/LANCHONETE",                  numero: "02", codigo: "A01-004" },
      { nome: "SET 03 – FARMÁCIA",                                   numero: "03", codigo: "A01-005" },
      { nome: "SET 04 – ESTOFADOR/POSTO POLICIAL",                   numero: "04", codigo: "A01-006" },
      { nome: "SET 04 – BORRACHARIA/BAR",                            numero: "04", codigo: "A01-007" },
      { nome: "SET 05 – TEMPLO",                                     numero: "05", codigo: "A01-008" },
      { nome: "SET 06 – POSTO MÉDICO",                               numero: "06", codigo: "A01-009" },
      { nome: "SET 07 – PIZZARIA/CASA PASTOR",                       numero: "07", codigo: "A01-010" },
      { nome: "SET 08 – CASA DE VIVIANE",                            numero: "08", codigo: "A01-011" },
      { nome: "SET 09 A/B/C – CASINHAS",                             numero: "09", codigo: "A01-012" },
      { nome: "SET 10 – CASA DE JUNIOR",                             numero: "10", codigo: "A01-013" },
      { nome: "SET 11 – CASAS",                                      numero: "11", codigo: "A01-014" },
      { nome: "SET 12 – BECO",                                       numero: "12", codigo: "A01-015" },
      { nome: "SET 12 – COMERCIAL/RESIDENCIAL",                      numero: "12", codigo: "A01-016" },
      { nome: "SET 13 E 14 – BAGDÁ E LOJA",                         numero: "13", codigo: "A01-017" },
      { nome: "SET 15 – FERRO VELHO",                                numero: "15", codigo: "A01-018" },
      { nome: "SET PRÉDIO II – TIM BURTON",                          numero: "P2", codigo: "A01-019" },
      { nome: "SET PRÉDIO III – MERCADINHO",                         numero: "P3", codigo: "A01-020" },
      { nome: "SET PRÉDIO IV – SALÃO DE BELEZA/CASA",                numero: "P4", codigo: "A01-021" },
      { nome: "SET PRÉDIO V – PADARIA",                              numero: "P5", codigo: "A01-022" },
      { nome: "SET – ADEGA/MURO/PRAÇA",                              numero: "—",  codigo: "A01-023" },
      { nome: "SET – BORRACHARIA E MURO",                            numero: "—",  codigo: "A01-024" },
      { nome: "SET – CHROMA",                                        numero: "—",  codigo: "A01-025" },
      { nome: "SET – CONTAINER BAR",                                 numero: "—",  codigo: "A01-026" },
      { nome: "SET – MURO ENTRE PD 06 E PD 07",                     numero: "—",  codigo: "A01-027" },
      { nome: "SET – QUADRA",                                        numero: "—",  codigo: "A01-028" },
    ]
  },
  {
    cidade: "CC2 – A04 | GAROTA DO MOMENTO",
    codigo_cidade: "A04",
    cenarios: [
      { nome: "SET 01 – ESTÚDIO DE TV",          numero: "01", codigo: "A04-001" },
      { nome: "SET 02 – CLUBE GENTE FINA",        numero: "02", codigo: "A04-002" },
      { nome: "SET 03 – PRÉDIO 03",               numero: "03", codigo: "A04-003" },
      { nome: "SET 04 – PRÉDIO 04",               numero: "04", codigo: "A04-004" },
      { nome: "SET 05 – BOLICHE",                 numero: "05", codigo: "A04-005" },
      { nome: "SET 06 – PRÉDIO 06",               numero: "06", codigo: "A04-006" },
      { nome: "SET 07 – PRÉDIO 07",               numero: "07", codigo: "A04-007" },
      { nome: "SET 08 – PRÉDIO 08",               numero: "08", codigo: "A04-008" },
      { nome: "SET 10 – FOFOQUEIRAS",             numero: "10", codigo: "A04-009" },
      { nome: "SET 10 E 11 – PRÉDIOS 10 E 11",   numero: "10", codigo: "A04-010" },
      { nome: "SET 12 – PRÉDIO 12",               numero: "12", codigo: "A04-011" },
      { nome: "SET 13 – PRÉDIO 13",               numero: "13", codigo: "A04-012" },
      { nome: "SET 14 E 15 – PRÉDIOS 14 E 15",   numero: "14", codigo: "A04-013" },
      { nome: "SET 16 – CASA DE CHÁ",             numero: "16", codigo: "A04-014" },
      { nome: "SET 17 – FÁBRICA",                 numero: "17", codigo: "A04-015" },
      { nome: "SET 18 – PRÉDIO 18",               numero: "18", codigo: "A04-016" },
      { nome: "SET 19 – PRÉDIO 19",               numero: "19", codigo: "A04-017" },
      { nome: "SET 20 – PRÉDIO 20",               numero: "20", codigo: "A04-018" },
      { nome: "SET 21 E 22 – PRÉDIO 21 E 22",    numero: "21", codigo: "A04-019" },
      { nome: "SET 23 E 25 – PRÉDIO 23 E 25",    numero: "23", codigo: "A04-020" },
      { nome: "SET 24 – PRÉDIO 24",               numero: "24", codigo: "A04-021" },
      { nome: "SET 26 – PRÉDIO 26",               numero: "26", codigo: "A04-022" },
    ]
  },
  {
    cidade: "CC2 – A06 | IGREJA / MANSÃO / GALPÃO MULTIUSO",
    codigo_cidade: "A06",
    cenarios: [
      { nome: "CIDADE E07 (IGREJA MULTIUSO)", numero: "—", codigo: "A06-001" },
      { nome: "MANSÃO MULTIUSO",              numero: "—", codigo: "A06-002" },
    ]
  },
  {
    cidade: "CC2 – A07 | FAVELA MULTIUSO",
    codigo_cidade: "A07",
    cenarios: [
      { nome: "SET 01 – FACHADEIRO FAVELA",           numero: "01", codigo: "A07-001" },
      { nome: "SET 02 / 02A – FACHADEIRO FAVELA",     numero: "02", codigo: "A07-002" },
      { nome: "SET 03 – CASA FAVELA",                 numero: "03", codigo: "A07-003" },
      { nome: "SET 04 – BAR DO BILL",                 numero: "04", codigo: "A07-004" },
      { nome: "SET 05 – BARBEARIA FAVELA",            numero: "05", codigo: "A07-005" },
      { nome: "SET 06 – CASA FAVELA",                 numero: "06", codigo: "A07-006" },
      { nome: "SET 07 – FACHADEIRO FAVELA",           numero: "07", codigo: "A07-007" },
      { nome: "SET 08, 14 E 16",                      numero: "08", codigo: "A07-008" },
      { nome: "SET 09 – GALPÃO BAILE CHARME FAVELA",  numero: "09", codigo: "A07-009" },
      { nome: "SET 10 – PRÉDIO FAVELA",               numero: "10", codigo: "A07-010" },
      { nome: "SET 11 – PRÉDIO FAVELA",               numero: "11", codigo: "A07-011" },
      { nome: "SET 12A E 12B – CASA FAVELA",          numero: "12", codigo: "A07-012" },
      { nome: "SET 13 – CASA FAVELA",                 numero: "13", codigo: "A07-013" },
      { nome: "SET 15 – FACHADEIRO FAVELA",           numero: "15", codigo: "A07-014" },
      { nome: "DO PAINEL",                            numero: "—",  codigo: "A07-015" },
    ]
  },
  {
    cidade: "CC3 – B01 | DONA DE MIM FT1",
    codigo_cidade: "B01",
    cenarios: [
      { nome: "SET 01 – KARAOKÊ",                     numero: "01", codigo: "B01-001" },
      { nome: "SET 02 – LOJA DE NOIVA E COMÉRCIO",    numero: "02", codigo: "B01-002" },
      { nome: "SET 03 – PRÉDIO 03",                   numero: "03", codigo: "B01-003" },
      { nome: "SET 04 – PRÉDIO 04",                   numero: "04", codigo: "B01-004" },
      { nome: "SET 05 – PRÉDIO 05",                   numero: "05", codigo: "B01-005" },
      { nome: "SET 20 – PADARIA",                     numero: "20", codigo: "B01-006" },
      { nome: "SET 22 A 26 – PRÉDIO 22 A 26",        numero: "22", codigo: "B01-007" },
      { nome: "SET – PRÉDIO FÁBRICA",                 numero: "—",  codigo: "B01-008" },
      { nome: "SET – HOSPITAL MULTIUSO",              numero: "—",  codigo: "B01-009" },
    ]
  },
  {
    cidade: "CC3 – B04 | DONA DE MIM FT2",
    codigo_cidade: "B04",
    cenarios: [
      { nome: "SET 02 – SALÃO",               numero: "02", codigo: "B04-001" },
      { nome: "SET 03 – PRÉDIO 03",           numero: "03", codigo: "B04-002" },
      { nome: "SET 07 – PRÉDIO 07",           numero: "07", codigo: "B04-003" },
      { nome: "SET 09/10 – BAR",              numero: "09", codigo: "B04-004" },
      { nome: "SET 11 – PRÉDIO 11",           numero: "11", codigo: "B04-005" },
      { nome: "SET 12 – PRÉDIO 12",           numero: "12", codigo: "B04-006" },
      { nome: "SET 13 – CASA DE LEONA",       numero: "13", codigo: "B04-007" },
      { nome: "SET 14 – PRÉDIO 14",           numero: "14", codigo: "B04-008" },
      { nome: "SET 15 – CASA DE MARLON",      numero: "15", codigo: "B04-009" },
      { nome: "SET 16 – PRÉDIO 16",           numero: "16", codigo: "B04-010" },
      { nome: "SET 17 – PRÉDIO 17",           numero: "17", codigo: "B04-011" },
      { nome: "SET – BECO – ACESSO KICKBOXING",        numero: "—", codigo: "B04-012" },
      { nome: "SET – MURO",                            numero: "—", codigo: "B04-013" },
      { nome: "SET MURO NOVO – ANTIGO PRÉDIO 04",      numero: "—", codigo: "B04-014" },
      { nome: "DELEGACIA",                             numero: "—", codigo: "B04-015" },
    ]
  },
  {
    cidade: "CC3 – B05 | ETA MUNDO MELHOR FT3 – CUNEGUDES",
    codigo_cidade: "B05",
    cenarios: [
      { nome: "SET – CASA ZÉ DOS PORCOS", numero: "—", codigo: "B05-001" },
      { nome: "SET – CHIQUEIRO",          numero: "—", codigo: "B05-002" },
      { nome: "SET – SÍTIO CUNEGUDES",    numero: "—", codigo: "B05-003" },
    ]
  },
  {
    cidade: "CC3 – B06 | ETA MUNDO MELHOR FT1 – CENTRO SÃO PAULO",
    codigo_cidade: "B06",
    cenarios: [
      { nome: "SET 04 – OUTDOOR",           numero: "04", codigo: "B06-001" },
      { nome: "SET 05 – FACHADEIRO",        numero: "05", codigo: "B06-002" },
      { nome: "SET 06 – PRÉDIO",            numero: "06", codigo: "B06-003" },
      { nome: "SET 07 – MANSÃO CANDINHO",   numero: "07", codigo: "B06-004" },
      { nome: "SET 08 – FARMÁCIA",          numero: "08", codigo: "B06-005" },
      { nome: "SET 10 – CASA DE ESTELA",    numero: "10", codigo: "B06-006" },
      { nome: "SET 11 – CASA ARAÚJO",       numero: "11", codigo: "B06-007" },
      { nome: "SET 12 – HOSPITAL",          numero: "12", codigo: "B06-008" },
      { nome: "SET 14 – PENSÃO",            numero: "14", codigo: "B06-009" },
      { nome: "SET 15 – RÁDIO DANCING",     numero: "15", codigo: "B06-010" },
      { nome: "SET 16 – CONFEITARIA",       numero: "16", codigo: "B06-011" },
      { nome: "SET 18 – FACHADEIRO",        numero: "18", codigo: "B06-012" },
      { nome: "SET 19 – BOUTIQUE HAYDEE",   numero: "19", codigo: "B06-013" },
      { nome: "SET 20 – CASA DE CELSO",     numero: "20", codigo: "B06-014" },
      { nome: "SET 21 – BAR",               numero: "21", codigo: "B06-015" },
      { nome: "SET 22 – SORVETERIA",        numero: "22", codigo: "B06-016" },
      { nome: "SET 24 – ESCOLA",            numero: "24", codigo: "B06-017" },
    ]
  },
  {
    cidade: "CC3 – B07 | ETA MUNDO MELHOR FT2 – PERIFERIA SÃO PAULO",
    codigo_cidade: "B07",
    cenarios: [
      { nome: "SET 01 – RESIDENCIAL",              numero: "01", codigo: "B07-001" },
      { nome: "SET 02 – RESIDENCIAL",              numero: "02", codigo: "B07-002" },
      { nome: "SET 03 – CASARÃO DE ZUMA",          numero: "03", codigo: "B07-003" },
      { nome: "SET 04 – RUÍNA",                    numero: "04", codigo: "B07-004" },
      { nome: "SET 05 – RESIDENCIAL",              numero: "05", codigo: "B07-005" },
      { nome: "SET 06 – COMÉRCIO",                 numero: "06", codigo: "B07-006" },
      { nome: "SET 07 – FÁBRICA DE BISCOITOS",     numero: "07", codigo: "B07-007" },
      { nome: "SET 08 – PENSÃO",                   numero: "08", codigo: "B07-008" },
      { nome: "SET 09 – RESIDENCIAL",              numero: "09", codigo: "B07-009" },
      { nome: "SET 10 – RESIDENCIAL",              numero: "10", codigo: "B07-010" },
      { nome: "SET 11 – VENDA DE NOBERTO",         numero: "11", codigo: "B07-011" },
      { nome: "SET 12 – DELEGACIA",                numero: "12", codigo: "B07-012" },
      { nome: "SET 13 – LEITERIA",                 numero: "13", codigo: "B07-013" },
      { nome: "SET 14 – RESIDENCIAL",              numero: "14", codigo: "B07-014" },
      { nome: "SET 14A – RESIDENCIAL (FACHADEIRO)", numero: "14", codigo: "B07-015" },
      { nome: "SET 14B – RESIDENCIAL (FACHADEIRO)", numero: "14", codigo: "B07-016" },
      { nome: "SET 15 – VENDA DE ÁGUA",            numero: "15", codigo: "B07-017" },
      { nome: "SET 18 – IGREJA",                   numero: "18", codigo: "B07-018" },
      { nome: "SET 19 – CASINHAS (FACHADEIROS)",   numero: "19", codigo: "B07-019" },
    ]
  },
  {
    cidade: "CC3 – B12 | RESTAURANTES",
    codigo_cidade: "B12",
    cenarios: [
      { nome: "SET 07", numero: "07", codigo: "B12-001" },
      { nome: "SET 08", numero: "08", codigo: "B12-002" },
      { nome: "SET 09", numero: "09", codigo: "B12-003" },
    ]
  },
];

const CONTEUDOS = [
  "18H - NOVA NOVELA 2026/2027",
  "18H - NOVA NOVELA 2027",
  "18H - A NOBREZA DO AMOR",
  "19H – CORAÇÃO ACELERADO",
  "19H - NOVA NOVELA 2026/2027",
  "21H - QUEM AMA CUIDA",
  "A VIAGEM - FILME",
  "CALDEIRÃO 2026",
  "DOMINGÃO 2026",
  'FILME "ME ERRA"',
  "FILME PEDRO E NINA",
  "MICRODRAMA",
  "PABLO E LUISÃO 2ª TEMPORADA",
];

const OBSERVACOES_CHECKOUT = [
  "ADERENTE - LIMPEZA",
  "ADERENTE - DRESSINGS",
  "ADERENTE - CARACTERISTICAS ORIGINAIS",
  "ADERENTE - CADEADOS/CHAVES",
  "NAO ADERENTE - LIMPEZA",
  "NAO ADERENTE - DRESSINGS",
  "NAO ADERENTE - CARACTERISTICAS ORIGINAIS",
  "NAO ADERENTE - CADEADOS/CHAVES",
];

const ENGENHEIROS = [
  { nome: "Jorge Henrique Silva", email: "jorge.henrique.silva@g.globo" },
  { nome: "Jairo Pama",           email: "jairo.pama@g.globo" },
  { nome: "Igor Foliveira",       email: "igor.foliveira@g.globo" },
  { nome: "Raphael Lima",         email: "raphael.lima@g.globo" },
  { nome: "Vanessa Silva",        email: "vanessa.ssilva@g.globo" },
  { nome: "Francisco Tairone",    email: "francisco.tairone@g.globo" },
  { nome: "Ana Damasceno",        email: "ana.damasceno@g.globo" },
  { nome: "Gabriela Brasil",      email: "gabriela.brasil@g.globo" },
];
