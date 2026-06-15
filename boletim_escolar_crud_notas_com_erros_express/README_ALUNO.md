# Projeto: Boletim Escolar para Teste de Software

Este projeto será usado em uma atividade prática sobre o Processo Fundamental de Teste.

O sistema permite:

- cadastrar alunos;
- listar alunos;
- filtrar alunos por série;
- lançar notas por aluno;
- escolher a matéria;
- cadastrar 4 notas;
- editar e excluir notas;
- gerar boletim com média e status.

## Como executar

1. Extraia o arquivo ZIP.
2. Abra a pasta do projeto no VS Code.
3. Abra o terminal dentro da pasta do projeto.
4. Inicializar o node
```bash
npm init -y
```


5. Instale as dependências:

```bash
npm install express
```

5. Execute o servidor:

```bash
node server.js
```

6. Abra o navegador e acesse:

```text
http://localhost:5000
```

## Atenção

Não abra o arquivo `index.html` com dois cliques.

O sistema precisa ser executado pelo Node.js, pois o front-end usa rotas da API criada no Express.

## Arquivos principais

```text
server.js              Servidor Node.js com Express
 dados.js              Dados iniciais do sistema
 public/index.html     Página principal
 public/css/style.css  Estilo da página
 public/js/script.js   Funções JavaScript do front-end
 ROTEIRO_DE_TESTES.md  Atividade prática para preencher
```
