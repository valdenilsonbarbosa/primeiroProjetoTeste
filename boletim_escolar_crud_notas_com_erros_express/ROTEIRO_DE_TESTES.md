# Atividade Prática: Testando o CRUD de Notas do Boletim Escolar

## Objetivo

Testar um sistema simples de boletim escolar, identificando se as funcionalidades funcionam corretamente.

O grupo deverá seguir as etapas do Processo Fundamental de Teste:

1. Planejamento;
2. Desenho dos testes;
3. Execução dos testes;
4. Monitoramento e controle;
5. Avaliação dos resultados.

---

# Situação-problema

Uma escola solicitou um sistema simples para controlar alunos e notas.

O sistema deve permitir:

- cadastrar aluno com nome, escola e série;
- listar alunos cadastrados;
- filtrar alunos por série;
- lançar notas por aluno;
- escolher a matéria da nota;
- cadastrar 4 notas por matéria;
- editar alunos;
- excluir alunos;
- editar notas;
- excluir notas;
- exibir o boletim do aluno com notas, média e status;
- considerar que o aluno está **Na média** quando a média for **maior ou igual a 7**.

---

# Etapa 01: Planejamento

Preencha antes de testar.

| Item | Resposta do grupo |
|---|---|
| Nome dos integrantes | |
| Sistema testado | Boletim Escolar |
| Funcionalidades que serão testadas | |
| Objetivo do teste | |
| Navegador utilizado | |
| Data da realização | |

## O que será testado?

Marque as funcionalidades escolhidas pelo grupo.

| Funcionalidade | Vamos testar? |
|---|---|
| Cadastro de aluno | |
| Listagem de alunos | |
| Filtro por série | |
| Edição de aluno | |
| Exclusão de aluno | |
| Cadastro de notas | |
| Escolha da matéria | |
| Edição de notas | |
| Exclusão de notas | |
| Cálculo da média | |
| Status do aluno | |
| Boletim do aluno | |

---

# Etapa 02: Desenho dos Testes

Nesta etapa, o grupo deve criar os casos de teste.

Lembre-se:

**Desenho dos testes não é desenhar a tela. É criar o roteiro do que será testado.**

Preencha a tabela abaixo antes de executar.

| Caso | Funcionalidade | Dados usados | Resultado esperado |
|---|---|---|---|
| CT01 | Cadastrar aluno com dados válidos | Nome, escola e série preenchidos | O aluno deve ser cadastrado e aparecer na lista |
| CT02 | Cadastrar aluno com campo vazio | Deixar nome, escola ou série vazio | O sistema deve mostrar mensagem de erro |
| CT03 | Filtrar aluno por série | Escolher uma série no filtro | A lista deve exibir apenas alunos daquela série |
| CT04 | Editar aluno | Alterar nome, escola ou série | O sistema deve atualizar os dados do aluno |
| CT05 | Excluir aluno | Clicar em excluir | O aluno deve sair da lista |
| CT06 | Lançar notas | Escolher aluno, matéria e 4 notas | O sistema deve cadastrar as notas |
| CT07 | Escolher matéria diferente | Cadastrar notas em duas matérias diferentes | O aluno deve ter boletim por matéria |
| CT08 | Cadastrar nota inválida | Usar nota menor que 0 ou maior que 10 | O sistema deve impedir o cadastro |
| CT09 | Editar notas | Alterar uma ou mais notas já cadastradas | O sistema deve atualizar as notas e a média |
| CT10 | Excluir notas | Excluir registro de nota | As notas devem sair da tabela |
| CT11 | Verificar média | Usar notas conhecidas, como 10, 10, 10, 10 | A média deve ser calculada corretamente |
| CT12 | Verificar status | Média 7 ou maior | Status deve ser Na média |
| CT13 | Verificar status abaixo da média | Média menor que 7 | Status deve ser Abaixo da média |
| CT14 | Gerar boletim | Selecionar um aluno no boletim | Deve exibir matérias, notas, média e status |

---

# Etapa 03: Execução dos Testes

Execute os casos de teste e registre o que aconteceu.

Use o status:

- **Passou**: funcionou como esperado;
- **Falhou**: não funcionou;
- **Parcial**: funcionou parcialmente, mas apresentou algum problema.

| Caso | Resultado esperado | Resultado obtido | Status |
|---|---|---|---|
| CT01 | O aluno deve ser cadastrado e aparecer na lista | | |
| CT02 | O sistema deve mostrar mensagem de erro | | |
| CT03 | A lista deve exibir apenas alunos da série escolhida | | |
| CT04 | O sistema deve atualizar os dados do aluno | | |
| CT05 | O aluno deve sair da lista | | |
| CT06 | O sistema deve cadastrar as notas | | |
| CT07 | O aluno deve ter notas por matérias diferentes | | |
| CT08 | O sistema deve impedir nota inválida | | |
| CT09 | O sistema deve atualizar as notas e a média | | |
| CT10 | As notas devem sair da tabela | | |
| CT11 | A média deve ser calculada corretamente | | |
| CT12 | Média 7 ou maior deve mostrar Na média | | |
| CT13 | Média menor que 7 deve mostrar Abaixo da média | | |
| CT14 | O boletim deve exibir notas, média e status | | |

---

# Etapa 04: Monitoramento e Controle

Agora o grupo deve organizar os resultados.

| Indicador | Quantidade |
|---|---:|
| Total de casos de teste criados | |
| Total de testes executados | |
| Testes que passaram | |
| Testes que falharam | |
| Testes parciais | |
| Funcionalidades que precisam de correção | |

## Problemas encontrados

| Nº | Problema encontrado | Onde ocorreu? | Gravidade | Evidência |
|---|---|---|---|---|
| 1 | | | Baixa / Média / Alta | |
| 2 | | | Baixa / Média / Alta | |
| 3 | | | Baixa / Média / Alta | |
| 4 | | | Baixa / Média / Alta | |
| 5 | | | Baixa / Média / Alta | |

---

# Etapa 05: Avaliação dos Resultados

Responda após concluir os testes.

| Pergunta | Resposta do grupo |
|---|---|
| O sistema funcionou corretamente? | |
| Quais funcionalidades passaram nos testes? | |
| Quais funcionalidades falharam? | |
| Qual foi o erro mais fácil de encontrar? | |
| Qual foi o erro mais difícil de encontrar? | |
| O sistema pode ser entregue ao cliente? | |
| O que precisa ser corrigido antes da entrega? | |

## Conclusão final do grupo

Escreva um pequeno texto com a conclusão dos testes:

```text
Após testar o sistema, o grupo concluiu que...
```
