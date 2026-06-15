const alunos = [
  { id: 1, nome: 'Ana Clara', escola: 'Escola Modelo', serie: '1º Ano' },
  { id: 2, nome: 'João Pedro', escola: 'Escola Modelo', serie: '2º Ano' },
  { id: 3, nome: 'Mariana Souza', escola: 'Escola Técnica', serie: '1º Ano' }
];

const materias = [
  'Matemática',
  'Português',
  'Física',
  'Química',
  'História',
  'Geografia',
  'Inglês',
  'Programação'
];

const notas = [
  {
    id: 1,
    alunoId: 1,
    materia: 'Matemática',
    nota1: 8,
    nota2: 7,
    nota3: 9,
    nota4: 6,
    media: 7.5,
    status: 'Na média'
  },
  {
    id: 2,
    alunoId: 2,
    materia: 'Português',
    nota1: 5,
    nota2: 6,
    nota3: 6,
    nota4: 5,
    media: 5.5,
    status: 'Abaixo da média'
  }
];

module.exports = {
  alunos,
  materias,
  notas
};
