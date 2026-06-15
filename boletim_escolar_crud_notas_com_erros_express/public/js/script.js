const formAluno = document.getElementById('formAluno');
const alunoId = document.getElementById('alunoId');
const nome = document.getElementById('nome');
const escola = document.getElementById('escola');
const serie = document.getElementById('serie');
const btnCancelarAluno = document.getElementById('btnCancelarAluno');
const corpoTabelaAlunos = document.getElementById('corpoTabelaAlunos');
const filtroSerie = document.getElementById('filtroSerie');

const formNota = document.getElementById('formNota');
const notaId = document.getElementById('notaId');
const notaAluno = document.getElementById('notaAluno');
const materia = document.getElementById('materia');
const nota1 = document.getElementById('nota1');
const nota2 = document.getElementById('nota2');
const nota3 = document.getElementById('nota3');
const nota4 = document.getElementById('nota4');
const btnCancelarNota = document.getElementById('btnCancelarNota');
const filtroMateria = document.getElementById('filtroMateria');
const corpoTabelaNotas = document.getElementById('corpoTabelaNotas');
const boletimAluno = document.getElementById('boletimAluno');
const areaBoletim = document.getElementById('areaBoletim');
const mensagem = document.getElementById('mensagem');

let alunos = [];
let materias = [];
let notas = [];

function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.className = erro ? 'mensagem mostrar erro' : 'mensagem mostrar';

  setTimeout(() => {
    mensagem.className = 'mensagem';
  }, 3000);
}

async function requisicao(url, opcoes = {}) {
  const resposta = await fetch(url, opcoes);
  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro ao processar a solicitação.');
  }

  return dados;
}

async function carregarDados() {
  try {
    const serieSelecionada = filtroSerie.value;
    const materiaSelecionada = filtroMateria.value;

    alunos = await requisicao(`/api/alunos${serieSelecionada ? `?serie=${encodeURIComponent(serieSelecionada)}` : ''}`);
    materias = await requisicao('/api/materias');
    notas = await requisicao(`/api/notas${materiaSelecionada ? `?materia=${encodeURIComponent(materiaSelecionada)}` : ''}`);

    renderizarAlunos();
    renderizarMaterias();
    renderizarSelectsAlunos();
    renderizarNotas();
    gerarBoletim();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

function renderizarMaterias() {
  const materiaAtual = materia.value;
  const filtroMateriaAtual = filtroMateria.value;

  materia.innerHTML = '<option value="">Selecione a matéria</option>';
  filtroMateria.innerHTML = '<option value="">Todas</option>';

  materias.forEach(item => {
    materia.innerHTML += `<option value="${item}">${item}</option>`;
    filtroMateria.innerHTML += `<option value="${item}">${item}</option>`;
  });

  materia.value = materiaAtual;
  filtroMateria.value = filtroMateriaAtual;
}

function renderizarSelectsAlunos() {
  const alunoSelecionadoNota = notaAluno.value;
  const alunoSelecionadoBoletim = boletimAluno.value;

  notaAluno.innerHTML = '<option value="">Selecione o aluno</option>';
  boletimAluno.innerHTML = '<option value="">Selecione o aluno</option>';

  alunos.forEach(aluno => {
    const texto = `${aluno.nome} - ${aluno.serie}`;
    notaAluno.innerHTML += `<option value="${aluno.id}">${texto}</option>`;
    boletimAluno.innerHTML += `<option value="${aluno.id}">${texto}</option>`;
  });

  notaAluno.value = alunoSelecionadoNota;
  boletimAluno.value = alunoSelecionadoBoletim;
}

function renderizarAlunos() {
  if (alunos.length === 0) {
    corpoTabelaAlunos.innerHTML = '<tr><td colspan="4">Nenhum aluno cadastrado.</td></tr>';
    return;
  }

  corpoTabelaAlunos.innerHTML = alunos.map(aluno => `
    <tr>
      <td>${aluno.nome}</td>
      <td>${aluno.escola}</td>
      <td>${aluno.serie}</td>
      <td>
        <div class="grupo-botoes">
          <button class="btn neutro btn-editar-aluno" data-id="${aluno.id}">Editar</button>
          <button class="btn sucesso" onclick="prepararNotaParaAluno(${aluno.id})">Inserir notas</button>
          <button class="btn perigo" onclick="excluirAluno(${aluno.id})">Excluir</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderizarNotas() {
  if (notas.length === 0) {
    corpoTabelaNotas.innerHTML = '<tr><td colspan="7">Nenhuma nota cadastrada.</td></tr>';
    return;
  }

  corpoTabelaNotas.innerHTML = notas.map(nota => {
    const nomeAluno = nota.aluno ? nota.aluno.nome : 'Aluno removido';
    const serieAluno = nota.aluno ? nota.aluno.serie : '-';
    const classeStatus = nota.status === 'Na média' ? 'ok' : 'ruim';

    return `
      <tr>
        <td>${nomeAluno}</td>
        <td>${serieAluno}</td>
        <td>${nota.materia}</td>
        <td>${nota.nota1}, ${nota.nota2}, ${nota.nota3}, ${nota.nota4}</td>
        <td>${nota.media}</td>
        <td><span class="status ${classeStatus}">${nota.status}</span></td>
        <td>
          <div class="grupo-botoes">
            <button class="btn neutro" onclick="editarNota(${nota.id})">Editar</button>
            <button class="btn perigo" onclick="excluirNota(${nota.id})">Excluir</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function limparFormularioAluno() {
  alunoId.value = '';
  nome.value = '';
  escola.value = '';
  serie.value = '';
}

function limparFormularioNota() {
  notaId.value = '';
  notaAluno.value = '';
  materia.value = '';
  nota1.value = '';
  nota2.value = '';
  nota3.value = '';
  nota4.value = '';
}

function prepararNotaParaAluno(id) {
  notaAluno.value = id;
  formNota.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

async function excluirAluno(id) {
  const confirmou = confirm('Deseja excluir este aluno?');
  if (!confirmou) return;

  try {
    await requisicao(`/api/alunos/${id}`, { method: 'DELETE' });
    mostrarMensagem('Aluno excluído.');
    await carregarDados();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

async function editarNota(id) {
  try {
    const nota = await requisicao(`/api/notas/${id}`);

    notaId.value = nota.id;
    notaAluno.value = nota.alunoId;
    materia.value = nota.materia;
    nota1.value = nota.nota1;
    nota2.value = nota.nota2;
    nota3.value = nota.nota3;
    nota4.value = nota.nota4;

    formNota.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

async function excluirNota(id) {
  const confirmou = confirm('Deseja excluir este registro de notas?');
  if (!confirmou) return;

  try {
    await requisicao(`/api/notas/${id}`, { method: 'DELETE' });
    mostrarMensagem('Notas excluídas.');
    await carregarDados();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

async function gerarBoletim() {
  const id = boletimAluno.value;

  if (!id) {
    areaBoletim.className = 'area-boletim vazio';
    areaBoletim.innerHTML = 'Selecione um aluno para gerar o boletim.';
    return;
  }

  try {
    const boletim = await requisicao(`/api/boletim/${id}`);
    areaBoletim.className = 'area-boletim';

    const linhas = boletim.notas.length === 0
      ? '<tr><td colspan="7">Este aluno ainda não possui notas cadastradas.</td></tr>'
      : boletim.notas.map(nota => `
        <tr>
          <td>${nota.materia}</td>
          <td>${nota.nota1}</td>
          <td>${nota.nota2}</td>
          <td>${nota.nota3}</td>
          <td>${nota.nota4}</td>
          <td>${nota.media}</td>
          <td><span class="status ${nota.status === 'Na média' ? 'ok' : 'ruim'}">${nota.status}</span></td>
        </tr>
      `).join('');

    areaBoletim.innerHTML = `
      <div class="resumo-boletim">
        <div class="resumo-item"><strong>Aluno</strong>${boletim.aluno.nome}</div>
        <div class="resumo-item"><strong>Série</strong>${boletim.aluno.serie}</div>
        <div class="resumo-item"><strong>Média geral</strong>${boletim.mediaGeral} - ${boletim.statusGeral}</div>
      </div>

      <div class="tabela-responsiva">
        <table>
          <thead>
            <tr>
              <th>Matéria</th>
              <th>Nota 1</th>
              <th>Nota 2</th>
              <th>Nota 3</th>
              <th>Nota 4</th>
              <th>Média</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${linhas}</tbody>
        </table>
      </div>
    `;
  } catch (erro) {
    areaBoletim.className = 'area-boletim vazio';
    areaBoletim.innerHTML = erro.message;
  }
}

formAluno.addEventListener('submit', async event => {
  event.preventDefault();

  const dadosAluno = {
    nome: nome.value,
    escola: escola.value,
    serie: serie.value
  };

  const editando = alunoId.value !== '';
  const url = editando ? `/api/alunos/${alunoId.value}` : '/api/alunos';
  const metodo = editando ? 'PUT' : 'POST';

  try {
    await requisicao(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosAluno)
    });

    mostrarMensagem(editando ? 'Aluno atualizado.' : 'Aluno cadastrado.');
    limparFormularioAluno();
    await carregarDados();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
});

formNota.addEventListener('submit', async event => {
  event.preventDefault();

  const dadosNota = {
    alunoId: notaAluno.value,
    materia: materia.value,
    nota1: nota1.value,
    nota2: nota2.value,
    nota3: nota3.value,
    nota4: nota4.value
  };

  const editando = notaId.value !== '';
  const url = editando ? `/api/notas/${notaId.value}` : '/api/notas';
  const metodo = editando ? 'PUT' : 'POST';

  try {
    await requisicao(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosNota)
    });

    mostrarMensagem(editando ? 'Notas atualizadas.' : 'Notas cadastradas.');
    limparFormularioNota();
    await carregarDados();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
});

btnCancelarAluno.addEventListener('click', limparFormularioAluno);
filtroMateria.addEventListener('change', carregarDados);
boletimAluno.addEventListener('change', gerarBoletim);

carregarDados();
