let tipoAtual = 'checkin';
let fotosBase64 = new Array(10).fill(null);
let registroEmEdicao = null;
let checkinVinculado = null;

// ─── NAVEGAÇÃO ────────────────────────────────────────────────

function mostrarTela(id) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById(id).classList.add('ativa');
}

function iniciarFormulario(tipo) {
  tipoAtual = tipo;
  fotosBase64 = new Array(10).fill(null);
  registroEmEdicao = null;
  checkinVinculado = null;
  configurarFormularioPorTipo(tipo);
  preencherCidades();
  preencherEngenheiros();
  preencherConteudos();
  gerarSlotsDefoto();
  definirDataHoje();
  mostrarTela('tela-formulario');
}

function voltarInicio() {
  mostrarTela('tela-inicio');
}

function voltarFormulario() {
  mostrarTela('tela-formulario');
}

function verRegistros() {
  renderizarRegistros();
  mostrarTela('tela-registros');
}

// ─── CONFIGURAÇÃO DO FORMULÁRIO ───────────────────────────────

function configurarFormularioPorTipo(tipo) {
  const isCheckin = tipo === 'checkin';
  document.getElementById('titulo-form').textContent = isCheckin ? 'Check-in' : 'Check-out';
  const badge = document.getElementById('badge-tipo');
  badge.textContent = isCheckin ? 'CHECK-IN' : 'CHECK-OUT';
  badge.className = 'badge ' + tipo;

  document.getElementById('label-data-checkin').style.display = isCheckin ? '' : 'none';
  document.getElementById('data-checkin').required = isCheckin;
  document.getElementById('label-data-checkout').style.display = isCheckin ? 'none' : '';
  document.getElementById('data-checkout').required = !isCheckin;

  document.getElementById('label-obs-checkin').style.display = isCheckin ? '' : 'none';
  document.getElementById('label-obs-checkout').style.display = isCheckin ? 'none' : '';
  document.getElementById('busca-checkin').style.display = isCheckin ? 'none' : '';
}

function definirDataHoje() {
  const hoje = new Date().toISOString().split('T')[0];
  ['data-checkin', 'data-checkout'].forEach(id => {
    const el = document.getElementById(id);
    el.value = hoje;
    el.min = hoje;
    el.max = hoje;
  });
}

// ─── BUSCA DE CHECK-IN PARA CHECKOUT ─────────────────────────

function buscarCheckin() {
  const num = document.getElementById('busca-numero').value.trim();
  const div = document.getElementById('resultado-busca');
  if (!num) { div.innerHTML = ''; checkinVinculado = null; return; }

  const registros = JSON.parse(localStorage.getItem('registros') || '[]');
  const r = registros.find(r => String(r.numero_reserva) === num && r.tipo === 'checkin');

  if (!r) {
    div.innerHTML = `<p class="resultado-busca-erro">Nenhum check-in encontrado com o nº ${num}.</p>`;
    checkinVinculado = null;
    registroEmEdicao = null;
    return;
  }

  preencherFormularioComCheckin(r);
  div.innerHTML = `<p class="resultado-busca-ok">✓ Check-in encontrado: ${r.cenario}</p>`;
}

function preencherFormularioComCheckin(r) {
  checkinVinculado = r;
  registroEmEdicao = r.id;

  document.getElementById('numero-reserva').value = r.numero_reserva || '';
  document.getElementById('supervisor').value = r.supervisor || '';
  document.getElementById('engenheiro').value = r.email_engenheiro || '';
  document.getElementById('conteudo').value = r.conteudo || '';

  const cidadeIdx = BASE_CENARIOS.findIndex(c => c.cidade === r.cidade);
  if (cidadeIdx >= 0) {
    document.getElementById('cidade').value = cidadeIdx;
    carregarCenarios();
    const cenarios = BASE_CENARIOS[cidadeIdx].cenarios;
    const cenarioIdx = cenarios.findIndex(c => c.nome === r.cenario);
    if (cenarioIdx >= 0) {
      document.getElementById('cenario').value = cenarioIdx;
      document.getElementById('codigo-cenario').value = cenarios[cenarioIdx].codigo;
    }
  }
}

// ─── CONTEÚDOS E OBSERVAÇÕES ─────────────────────────────────

function preencherConteudos() {
  const selC = document.getElementById('conteudo');
  selC.innerHTML = '<option value="">Selecione o conteúdo</option>';
  CONTEUDOS.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    selC.appendChild(opt);
  });

  const selO = document.getElementById('observacoes-checkout');
  selO.innerHTML = '';
  OBSERVACOES_CHECKOUT.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o;
    opt.textContent = o;
    selO.appendChild(opt);
  });
}

// ─── ENGENHEIROS ─────────────────────────────────────────────

function preencherEngenheiros() {
  const sel = document.getElementById('engenheiro');
  sel.innerHTML = '<option value="">Selecione o engenheiro</option>';
  ENGENHEIROS.forEach(e => {
    const opt = document.createElement('option');
    opt.value = e.email;
    opt.textContent = e.nome;
    sel.appendChild(opt);
  });
}

// ─── CIDADES E CENÁRIOS ───────────────────────────────────────

function preencherCidades() {
  const sel = document.getElementById('cidade');
  sel.innerHTML = '<option value="">Selecione a cidade</option>';
  BASE_CENARIOS.forEach((c, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = c.cidade;
    sel.appendChild(opt);
  });
  document.getElementById('cenario').innerHTML = '<option value="">Selecione o cenário</option>';
  document.getElementById('codigo-cenario').value = '';
}

function carregarCenarios() {
  const cidadeIdx = document.getElementById('cidade').value;
  const selCenario = document.getElementById('cenario');
  selCenario.innerHTML = '<option value="">Selecione o cenário</option>';
  document.getElementById('codigo-cenario').value = '';

  if (cidadeIdx === '') return;

  const cenarios = BASE_CENARIOS[cidadeIdx].cenarios;
  cenarios.forEach((c, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = c.nome;
    selCenario.appendChild(opt);
  });

  selCenario.onchange = () => {
    const idx = selCenario.value;
    if (idx === '') { document.getElementById('codigo-cenario').value = ''; return; }
    document.getElementById('codigo-cenario').value = cenarios[idx].codigo;
  };
}

// ─── SLOTS DE FOTO ────────────────────────────────────────────

function gerarSlotsDePhoto() { gerarSlotsDefoto(); }

function gerarSlotsDefoto() {
  const grid = document.getElementById('grid-fotos');
  grid.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot-foto';
    slot.id = `slot-${i}`;
    slot.innerHTML = `
      <input type="file" accept="image/*" capture="environment"
             id="input-foto-${i}" style="display:none"
             onchange="carregarFoto(event, ${i})" />
      <label for="input-foto-${i}" class="label-foto">
        <span class="num-foto">${i + 1}</span>
        <span class="icone-add">📷</span>
      </label>
    `;
    grid.appendChild(slot);
  }
  atualizarContador();
}

function carregarFoto(event, idx) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    fotosBase64[idx] = e.target.result;
    renderizarSlot(idx);
    atualizarContador();
  };
  reader.readAsDataURL(file);
}

function renderizarSlot(idx) {
  const slot = document.getElementById(`slot-${idx}`);
  if (fotosBase64[idx]) {
    slot.innerHTML = `
      <img src="${fotosBase64[idx]}" alt="Foto ${idx + 1}" onclick="removerFoto(${idx})" />
      <button class="btn-remover-foto" onclick="removerFoto(${idx})" title="Remover foto">✕</button>
      <span class="num-foto-sobre">${idx + 1}</span>
    `;
  } else {
    slot.innerHTML = `
      <input type="file" accept="image/*" capture="environment"
             id="input-foto-${idx}" style="display:none"
             onchange="carregarFoto(event, ${idx})" />
      <label for="input-foto-${idx}" class="label-foto">
        <span class="num-foto">${idx + 1}</span>
        <span class="icone-add">📷</span>
      </label>
    `;
  }
}

function removerFoto(idx) {
  fotosBase64[idx] = null;
  renderizarSlot(idx);
  atualizarContador();
}

function atualizarContador() {
  const total = fotosBase64.filter(f => f !== null).length;
  document.getElementById('contador').textContent = `${total}/10`;
}

// ─── VALIDAÇÃO ────────────────────────────────────────────────

function validarFormulario() {
  const campos = ['cidade', 'cenario', 'supervisor', 'engenheiro', 'numero-reserva', 'conteudo'];
  for (const id of campos) {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.focus();
      alert(`Campo obrigatório: ${el.closest('label').childNodes[0].textContent.trim().replace(' *','')}`);
      return false;
    }
  }
  if (tipoAtual === 'checkin' && !document.getElementById('data-checkin').value) {
    alert('Informe a data do check-in.');
    return false;
  }
  if (tipoAtual === 'checkout' && !document.getElementById('data-checkout').value) {
    alert('Informe a data do check-out.');
    return false;
  }
  return true;
}

// ─── COLETA DE DADOS ──────────────────────────────────────────

function coletarDados() {
  if (checkinVinculado) {
    return {
      ...checkinVinculado,
      tipo: 'completo',
      fotos_checkout: [...fotosBase64],
      data_checkout: document.getElementById('data-checkout').value,
      observacoes_checkout: Array.from(document.getElementById('observacoes-checkout').selectedOptions).map(o => o.value).join(' | '),
    };
  }

  const cidadeIdx = document.getElementById('cidade').value;
  const cenarioIdx = document.getElementById('cenario').value;
  const cidadeObj = cidadeIdx !== '' ? BASE_CENARIOS[cidadeIdx] : null;
  const cenarioObj = (cidadeObj && cenarioIdx !== '') ? cidadeObj.cenarios[cenarioIdx] : null;

  return {
    id: registroEmEdicao || Date.now(),
    tipo: tipoAtual,
    cidade: cidadeObj ? cidadeObj.cidade : '',
    codigo_cidade: cidadeObj ? cidadeObj.codigo_cidade : '',
    cenario: cenarioObj ? cenarioObj.nome : '',
    numero_cenario: cenarioObj ? cenarioObj.numero : '',
    codigo_cenario: cenarioObj ? cenarioObj.codigo : document.getElementById('codigo-cenario').value,
    numero_reserva: document.getElementById('numero-reserva').value,
    conteudo: document.getElementById('conteudo').value,
    supervisor: document.getElementById('supervisor').value.trim(),
    engenheiro: (() => { const e = ENGENHEIROS.find(x => x.email === document.getElementById('engenheiro').value); return e ? e.nome : ''; })(),
    email_engenheiro: document.getElementById('engenheiro').value,
    data_checkin: document.getElementById('data-checkin').value,
    data_checkout: document.getElementById('data-checkout').value,
    observacoes: tipoAtual === 'checkout'
      ? Array.from(document.getElementById('observacoes-checkout').selectedOptions).map(o => o.value).join(' | ')
      : document.getElementById('observacoes').value.trim(),
    fotos: [...fotosBase64],
    criado_em: new Date().toISOString()
  };
}

// ─── SALVAR / RASCUNHO ────────────────────────────────────────

function salvarRascunho() {
  if (!document.getElementById('cidade').value) {
    alert('Selecione ao menos a cidade para salvar o rascunho.');
    return;
  }
  const dados = coletarDados();
  dados.rascunho = true;
  salvarNoStorage(dados);
  alert('Rascunho salvo!');
}

function salvarNoStorage(dados) {
  const registros = JSON.parse(localStorage.getItem('registros') || '[]');
  const idx = registros.findIndex(r => r.id === dados.id);
  if (idx >= 0) registros[idx] = dados;
  else registros.push(dados);
  localStorage.setItem('registros', JSON.stringify(registros));
}

// ─── RELATÓRIO ────────────────────────────────────────────────

function salvarEGerarRelatorio() {
  if (!validarFormulario()) return;
  const dados = coletarDados();
  dados.rascunho = false;
  // Tenta salvar, mas gera o relatório mesmo se o storage estiver cheio (fotos grandes)
  try {
    salvarNoStorage(dados);
  } catch (e) {
    // Salva sem as fotos para não perder os dados do formulário
    try {
      const semFotos = { ...dados, fotos: new Array(10).fill(null) };
      salvarNoStorage(semFotos);
    } catch (_) {}
  }
  renderizarRelatorio(dados);
  mostrarTela('tela-relatorio');
}

function renderizarRelatorio(dados) {
  const fmt = (iso) => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };

  const fotos = (dados.fotos || []).map((f, i) => ({ src: f, idx: i })).filter(f => f.src !== null);
  const fotosCheckoutArr = (dados.fotos_checkout || []).map((f, i) => ({ src: f, idx: i })).filter(f => f.src !== null);
  const fotosCheckin  = dados.tipo === 'completo' ? fotos : (dados.tipo === 'checkin'  ? fotos : []);
  const fotosCheckout = dados.tipo === 'completo' ? fotosCheckoutArr : (dados.tipo === 'checkout' ? fotos : []);

  const colFotos = (lista) => {
    if (lista.length === 0) return '<td class="col-fotos vazia"></td>';
    return `<td class="col-fotos">${lista.map(f => `<img src="${f.src}" alt="Foto ${f.idx + 1}" />`).join('')}</td>`;
  };

  document.getElementById('conteudo-relatorio').innerHTML = `
    <div class="relatorio-pdf">

      <div class="pdf-header">
        <div class="pdf-header-logo-esq">
          <span class="icone-manutencao">🔧</span>
        </div>
        <div class="pdf-header-titulo">
          Manutenção de Cenários - Sets Multiuso
        </div>
        <div class="pdf-header-logo-dir">
          <img src="logo_globo corporativa_restrita_branco.png" alt="Globo" />
        </div>
      </div>

      <table class="pdf-info">
        <tr>
          <td class="pdf-label">Cidade Cenográfica:</td>
          <td class="pdf-valor">${dados.cidade || ''}</td>
          <td class="pdf-label">Nº RESERVA</td>
          <td class="pdf-valor">${dados.numero_reserva || ''}</td>
        </tr>
        <tr>
          <td class="pdf-label">Cenário:</td>
          <td class="pdf-valor">${dados.cenario || ''}</td>
          <td class="pdf-label">Data Check-in</td>
          <td class="pdf-valor">${fmt(dados.data_checkin)}</td>
        </tr>
        <tr>
          <td class="pdf-label">Supervisor/Produtor:</td>
          <td class="pdf-valor">${dados.supervisor || ''}</td>
          <td class="pdf-label">Data Check-out</td>
          <td class="pdf-valor">${fmt(dados.data_checkout)}</td>
        </tr>
        ${dados.engenheiro ? `<tr>
          <td class="pdf-label">Engenheiro de Manutenção:</td>
          <td class="pdf-valor" colspan="3">${dados.engenheiro}</td>
        </tr>` : ''}
        ${dados.observacoes ? `<tr>
          <td class="pdf-label">Observações:</td>
          <td class="pdf-valor" colspan="3">${dados.observacoes}</td>
        </tr>` : ''}
        ${dados.observacoes_checkout ? `<tr>
          <td class="pdf-label">Obs. Check-out:</td>
          <td class="pdf-valor" colspan="3">${dados.observacoes_checkout}</td>
        </tr>` : ''}
      </table>

      <table class="pdf-fotos">
        <thead>
          <tr>
            <th>Check-in</th>
            <th>Check-out</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            ${colFotos(fotosCheckin)}
            ${colFotos(fotosCheckout)}
          </tr>
        </tbody>
      </table>

      <div class="pdf-rodape">
        Emitido em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'})}
      </div>
    </div>
  `;
}

// ─── REGISTROS SALVOS ─────────────────────────────────────────

function renderizarRegistros() {
  const registros = JSON.parse(localStorage.getItem('registros') || '[]');
  const container = document.getElementById('lista-registros');
  const busca = (document.getElementById('busca-registros')?.value || '').trim();

  const filtrados = busca
    ? registros.filter(r => String(r.numero_reserva || '').includes(busca))
    : registros;

  if (filtrados.length === 0) {
    container.innerHTML = `<p class="vazio">${busca ? 'Nenhum registro com este número.' : 'Nenhum registro salvo ainda.'}</p>`;
    return;
  }

  const ordenados = [...filtrados].sort((a, b) => b.id - a.id);

  container.innerHTML = ordenados.map(r => {
    const tipo = r.tipo === 'checkin' ? 'CHECK-IN' : r.tipo === 'checkout' ? 'CHECK-OUT' : 'COMPLETO';
    const data = r.tipo === 'checkin' ? r.data_checkin : r.data_checkout;
    const dataFmt = data ? data.split('-').reverse().join('/') : '—';
    const fotos = (r.fotos || []).filter(f => f).length;
    return `
      <div class="card-registro">
        <div class="card-topo">
          <span class="badge ${r.tipo} pequeno">${tipo}</span>
          ${r.rascunho ? '<span class="badge rascunho pequeno">RASCUNHO</span>' : ''}
          <span class="card-data">${dataFmt}</span>
        </div>
        <strong>${r.cenario || '—'}</strong>
        <p>${r.cidade || '—'} · ${r.codigo_cenario || '—'}</p>
        ${r.numero_reserva ? `<p>Reserva nº ${r.numero_reserva}</p>` : ''}
        <p>Supervisor: ${r.supervisor || '—'}</p>
        <p>${fotos} foto${fotos !== 1 ? 's' : ''}</p>
        <div class="card-acoes">
          <button onclick="abrirRegistro(${r.id})">📄 Ver relatório</button>
          <button onclick="excluirRegistro(${r.id})" class="btn-excluir">🗑 Excluir</button>
        </div>
      </div>
    `;
  }).join('');
}

function abrirRegistro(id) {
  const registros = JSON.parse(localStorage.getItem('registros') || '[]');
  const r = registros.find(r => r.id === id);
  if (!r) return;
  renderizarRelatorio(r);
  mostrarTela('tela-relatorio');
}

function excluirRegistro(id) {
  if (!confirm('Excluir este registro?')) return;
  const registros = JSON.parse(localStorage.getItem('registros') || '[]');
  const novos = registros.filter(r => r.id !== id);
  localStorage.setItem('registros', JSON.stringify(novos));
  renderizarRegistros();
}
