let tipoAtual = 'checkin';
let fotosBase64 = new Array(10).fill(null);
let registroEmEdicao = null;

// ─── NAVEGAÇÃO ────────────────────────────────────────────────

function mostrarTela(id) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById(id).classList.add('ativa');
}

function iniciarFormulario(tipo) {
  tipoAtual = tipo;
  fotosBase64 = new Array(10).fill(null);
  registroEmEdicao = null;
  configurarFormularioPorTipo(tipo);
  preencherCidades();
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
}

function definirDataHoje() {
  const hoje = new Date().toISOString().split('T')[0];
  document.getElementById('data-checkin').value = hoje;
  document.getElementById('data-checkout').value = hoje;
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
  const campos = ['cidade', 'cenario', 'supervisor', 'engenheiro'];
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
    supervisor: document.getElementById('supervisor').value.trim(),
    engenheiro: document.getElementById('engenheiro').value.trim(),
    data_checkin: document.getElementById('data-checkin').value,
    data_checkout: document.getElementById('data-checkout').value,
    observacoes: document.getElementById('observacoes').value.trim(),
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
  salvarNoStorage(dados);
  renderizarRelatorio(dados);
  mostrarTela('tela-relatorio');
}

function renderizarRelatorio(dados) {
  const tipo = dados.tipo === 'checkin' ? 'CHECK-IN' : 'CHECK-OUT';
  const dataFormatada = (iso) => {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };
  const dataRelatorio = dados.tipo === 'checkin' ? dataFormatada(dados.data_checkin) : dataFormatada(dados.data_checkout);
  const fotos = dados.fotos.filter(f => f !== null);

  let fotosHTML = '';
  if (fotos.length > 0) {
    fotosHTML = `<div class="fotos-relatorio">` +
      fotos.map((f, i) => `
        <div class="foto-item">
          <img src="${f}" alt="Foto ${i + 1}" />
          <span>Foto ${i + 1}</span>
        </div>
      `).join('') +
      `</div>`;
  } else {
    fotosHTML = `<p class="sem-fotos">Nenhuma foto registrada.</p>`;
  }

  document.getElementById('conteudo-relatorio').innerHTML = `
    <div class="relatorio">
      <div class="rel-cabecalho">
        <div class="rel-logo">🎬</div>
        <div>
          <h1>Relatório de ${tipo}</h1>
          <p class="rel-data-emissao">Emitido em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'})}</p>
        </div>
        <span class="badge ${dados.tipo} grande">${tipo}</span>
      </div>

      <table class="tabela-info">
        <tr>
          <th colspan="2">Informações do Cenário</th>
        </tr>
        <tr>
          <td><strong>Cidade Cenográfica</strong></td>
          <td>${dados.cidade} <small>(${dados.codigo_cidade})</small></td>
        </tr>
        <tr>
          <td><strong>Cenário</strong></td>
          <td>${dados.cenario}</td>
        </tr>
        <tr>
          <td><strong>Código</strong></td>
          <td>${dados.codigo_cenario}</td>
        </tr>
        <tr>
          <th colspan="2">Equipe</th>
        </tr>
        <tr>
          <td><strong>Supervisor de Montagem</strong></td>
          <td>${dados.supervisor}</td>
        </tr>
        <tr>
          <td><strong>Engenheiro de Manutenção</strong></td>
          <td>${dados.engenheiro}</td>
        </tr>
        <tr>
          <th colspan="2">Datas</th>
        </tr>
        ${dados.data_checkin ? `<tr><td><strong>Data do Check-in</strong></td><td>${dataFormatada(dados.data_checkin)}</td></tr>` : ''}
        ${dados.data_checkout ? `<tr><td><strong>Data do Check-out</strong></td><td>${dataFormatada(dados.data_checkout)}</td></tr>` : ''}
        ${dados.observacoes ? `
        <tr>
          <th colspan="2">Observações</th>
        </tr>
        <tr>
          <td colspan="2">${dados.observacoes}</td>
        </tr>` : ''}
      </table>

      <h3 class="titulo-fotos">Registro Fotográfico (${fotos.length} foto${fotos.length !== 1 ? 's' : ''})</h3>
      ${fotosHTML}

      <div class="rodape-relatorio">
        <p>Documento gerado pelo sistema de Manutenção de Cenários</p>
      </div>
    </div>
  `;
}

// ─── REGISTROS SALVOS ─────────────────────────────────────────

function renderizarRegistros() {
  const registros = JSON.parse(localStorage.getItem('registros') || '[]');
  const container = document.getElementById('lista-registros');

  if (registros.length === 0) {
    container.innerHTML = '<p class="vazio">Nenhum registro salvo ainda.</p>';
    return;
  }

  const ordenados = [...registros].sort((a, b) => b.id - a.id);

  container.innerHTML = ordenados.map(r => {
    const tipo = r.tipo === 'checkin' ? 'CHECK-IN' : 'CHECK-OUT';
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
