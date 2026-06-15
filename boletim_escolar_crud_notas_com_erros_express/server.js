const express = require('express');
const path = require('path');
const { alunos, materias, notas } = require('./dados');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function gerarId(lista) {
  if (lista.length === 0) return 1;
  return Math.max(...lista.map(item => item.id)) + 1;
}

function calcularMedia(nota1, nota2, nota3, nota4) {
  const media = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4)) / 5;
  return Number(media.toFixed(1));
}

function calcularStatus(media) {
  return media >= 6 ? 'Na média' : 'Abaixo da média';
}

function notaValida(valor) {
  const numero = Number(valor);
  return !Number.isNaN(numero) && numero >= 0 && numero <= 10;
}

function montarNotaComAluno(nota) {
  const aluno = alunos.find(item => item.id === nota.alunoId);
  return {
    ...nota,
    aluno: aluno || null
  };
}

app.get('/api/materias', (req, res) => {
  res.json(materias);
});

app.get('/api/alunos', (req, res) => {
  const { serie } = req.query;

  if (serie) {
    const alunosFiltrados = alunos.filter(aluno => aluno.serie === serie);
    return res.json(alunosFiltrados);
  }

  res.json(alunos);
});

app.post('/api/alunos', (req, res) => {
  const { nome, escola, serie } = req.body;

  if (!nome || !escola || !serie) {
    return res.status(400).json({ mensagem: 'Preencha nome, escola e série.' });
  }

  const novoAluno = {
    id: gerarId(alunos),
    nome: nome.trim(),
    escola: escola.trim(),
    serie: serie.trim()
  };

  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

app.put('/api/alunos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nome, escola, serie } = req.body;
  const aluno = alunos.find(item => item.id === id);

  if (!aluno) {
    return res.status(404).json({ mensagem: 'Aluno não encontrado.' });
  }

  if (!nome || !escola || !serie) {
    return res.status(400).json({ mensagem: 'Preencha nome, escola e série.' });
  }

  aluno.nome = nome.trim();
  aluno.escola = escola.trim();
  aluno.serie = serie.trim();

  res.json(aluno);
});

app.delete('/api/alunos/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = alunos.findIndex(item => item.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensagem: 'Aluno não encontrado.' });
  }

  alunos.splice(indice, 1);

  res.json({ mensagem: 'Aluno excluído com sucesso.' });
});

app.get('/api/notas', (req, res) => {
  const { alunoId, materia } = req.query;
  let resultado = notas;

  if (alunoId) {
    resultado = resultado.filter(nota => nota.alunoId === Number(alunoId));
  }

  if (materia) {
    resultado = resultado.filter(nota => nota.materia === materia);
  }

  res.json(resultado.map(montarNotaComAluno));
});

app.get('/api/notas/:id', (req, res) => {
  const id = Number(req.params.id);
  const nota = notas.find(item => item.id === id);

  if (!nota) {
    return res.status(404).json({ mensagem: 'Nota não encontrada.' });
  }

  res.json(montarNotaComAluno(nota));
});

app.post('/api/notas', (req, res) => {
  const { alunoId, materia, nota1, nota2, nota3, nota4 } = req.body;
  const idAluno = Number(alunoId);

  const aluno = alunos.find(item => item.id === idAluno);
  if (!aluno) {
    return res.status(400).json({ mensagem: 'Selecione um aluno válido.' });
  }

  if (!materia || !materias.includes(materia)) {
    return res.status(400).json({ mensagem: 'Selecione uma matéria válida.' });
  }

  if (![nota1, nota2, nota3, nota4].every(notaValida)) {
    return res.status(400).json({ mensagem: 'As quatro notas devem estar entre 0 e 10.' });
  }

  const jaExisteNota = notas.some(item => item.alunoId === idAluno && item.materia === materia);
  if (jaExisteNota) {
    return res.status(400).json({ mensagem: 'Este aluno já possui notas cadastradas para essa matéria. Edite o registro existente.' });
  }

  const media = calcularMedia(nota1, nota2, nota3, nota4);

  const novaNota = {
    id: gerarId(notas),
    alunoId: idAluno,
    materia,
    nota1: Number(nota1),
    nota2: Number(nota2),
    nota3: Number(nota3),
    nota4: Number(nota4),
    media,
    status: calcularStatus(media)
  };

  notas.push(novaNota);
  res.status(201).json(montarNotaComAluno(novaNota));
});

app.put('/api/notas/:id', (req, res) => {
  const id = Number(req.params.id);
  const { alunoId, materia, nota1, nota2, nota3, nota4 } = req.body;
  const idAluno = Number(alunoId);

  const nota = notas.find(item => item.id === id);
  if (!nota) {
    return res.status(404).json({ mensagem: 'Nota não encontrada.' });
  }

  const aluno = alunos.find(item => item.id === idAluno);
  if (!aluno) {
    return res.status(400).json({ mensagem: 'Selecione um aluno válido.' });
  }

  if (!materia || !materias.includes(materia)) {
    return res.status(400).json({ mensagem: 'Selecione uma matéria válida.' });
  }

  if (![nota1, nota2, nota3, nota4].every(notaValida)) {
    return res.status(400).json({ mensagem: 'As quatro notas devem estar entre 0 e 10.' });
  }

  const notaDuplicada = notas.some(item => item.id !== id && item.alunoId === idAluno && item.materia === materia);
  if (notaDuplicada) {
    return res.status(400).json({ mensagem: 'Este aluno já possui outro registro de notas para essa matéria.' });
  }

  const media = calcularMedia(nota1, nota2, nota3, nota4);

  nota.alunoId = idAluno;
  nota.materia = materia;
  nota.nota1 = Number(nota1);
  nota.nota2 = Number(nota2);
  nota.nota3 = Number(nota3);
  nota.nota4 = Number(nota4);
  nota.media = media;
  nota.status = calcularStatus(media);

  res.json(montarNotaComAluno(nota));
});

app.delete('/api/notas/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = notas.findIndex(item => item.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensagem: 'Nota não encontrada.' });
  }

  notas.splice(indice, 1);
  res.json({ mensagem: 'Registro de nota excluído com sucesso.' });
});

app.get('/api/boletim/:alunoId', (req, res) => {
  const alunoId = Number(req.params.alunoId);
  const aluno = alunos.find(item => item.id === alunoId);

  if (!aluno) {
    return res.status(404).json({ mensagem: 'Aluno não encontrado.' });
  }

  const notasDoAluno = notas.filter(nota => nota.alunoId === alunoId);
  const mediaGeral = notasDoAluno.length > 0
    ? Number((notasDoAluno.reduce((soma, nota) => soma + nota.media, 0) / notasDoAluno.length).toFixed(1))
    : 0;

  res.json({
    aluno,
    notas: notasDoAluno,
    mediaGeral,
    statusGeral: notasDoAluno.length === 0 ? 'Sem notas cadastradas' : calcularStatus(mediaGeral)
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
