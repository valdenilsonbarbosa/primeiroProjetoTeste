# Guia do Professor: Erros Intencionais Implementados

Este projeto possui erros intencionais para que os alunos pratiquem o Processo Fundamental de Teste.

## Erros para alunos iniciantes

### 1. Botão Editar aluno não funciona

**Onde testar:** Lista de alunos > botão Editar.

**Comportamento esperado:** Ao clicar em Editar, o formulário de cadastro deveria ser preenchido com os dados do aluno.

**Comportamento obtido:** O botão não executa nenhuma ação.

**Nível:** Iniciante.

**Local técnico:** `public/js/script.js`.

O botão é renderizado com a classe `btn-editar-aluno`, mas não existe evento associado a ele.

---

### 2. Botão Cancelar edição de notas não funciona

**Onde testar:** Formulário de notas > botão Cancelar edição.

**Comportamento esperado:** O formulário de notas deveria ser limpo.

**Comportamento obtido:** O botão não faz nada.

**Nível:** Iniciante.

**Local técnico:** `public/js/script.js`.

Existe a função `limparFormularioNota()`, mas o botão `btnCancelarNota` não recebeu `addEventListener`.

---

### 3. Filtro por série não atualiza a lista

**Onde testar:** Lista de alunos > Filtrar por série.

**Comportamento esperado:** Ao selecionar uma série, a lista deveria mostrar apenas alunos da série escolhida.

**Comportamento obtido:** A troca do filtro não atualiza a lista.

**Nível:** Iniciante/intermediário.

**Local técnico:** `public/js/script.js`.

O servidor possui a rota com filtro, mas o select `filtroSerie` não possui evento `change` chamando `carregarDados()`.

---

## Erros para alunos intermediários

### 4. Cálculo da média está incorreto

**Onde testar:** Cadastro de notas e boletim.

**Teste sugerido:** Cadastre as notas 10, 10, 10 e 10.

**Resultado esperado:** Média 10.

**Resultado obtido:** Média 8.

**Nível:** Intermediário.

**Local técnico:** `server.js`, função `calcularMedia()`.

O sistema soma as quatro notas, mas divide por 5.

---

### 5. Status usa regra incorreta

**Onde testar:** Cadastro de notas e boletim.

**Regra correta da atividade:**

- Média maior ou igual a 7: Na média;
- Média menor que 7: Abaixo da média.

**Erro implementado:** O sistema considera média maior ou igual a 6 como Na média.

**Teste sugerido:** Cadastre notas que gerem média 6.

**Resultado esperado:** Abaixo da média.

**Resultado obtido:** Na média.

**Nível:** Intermediário.

**Local técnico:** `server.js`, função `calcularStatus()`.

---

## Erro para aluno avançado

### 6. Exclusão de aluno não remove as notas relacionadas

**Onde testar:** Excluir um aluno que possui notas cadastradas.

**Comportamento esperado:** Ao excluir o aluno, as notas relacionadas deveriam ser excluídas também ou bloqueadas corretamente.

**Comportamento obtido:** As notas continuam na API e aparecem na tabela de notas como `Aluno removido`.

**Nível:** Avançado.

**Por que é mais difícil:**

O aluno precisa perceber um problema de consistência dos dados. A tela parece excluir o aluno normalmente, mas os registros relacionados continuam existindo.

**Local técnico:** `server.js`, rota `DELETE /api/alunos/:id`.

---

# Sugestão de aplicação

1. Não revele os erros antes da atividade.
2. Peça aos alunos para testarem usando o roteiro.
3. Solicite que registrem evidências: descrição, print ou passo a passo.
4. Ao final, revele os erros e relacione cada um com a etapa do processo de teste.

# Sugestão de fechamento

Pergunte à turma:

- Qual erro foi mais fácil de encontrar?
- Qual erro exigiu mais atenção?
- Qual erro só apareceu quando testamos os dados com mais cuidado?
- Por que testar cálculo e regra de negócio é tão importante quanto testar botões?
