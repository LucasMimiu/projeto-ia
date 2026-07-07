<script setup>
import { ref, computed } from 'vue'

const produtos = ref([])

const nome = ref('')
const categoria = ref('')
const quantidade = ref('')
const preco = ref('')
const descricao = ref('')

function adicionarProduto() {
  if (!nome.value || !quantidade.value || !preco.value || !categoria.value) return

  produtos.value.push({
    nome: nome.value,
    categoria: categoria.value,
    quantidade: Number(quantidade.value),
    preco: Number(preco.value),
    descricao: descricao.value
  })

  // Limpar campos
  nome.value = ''
  categoria.value = ''
  quantidade.value = ''
  preco.value = ''
  descricao.value = ''
}

function removerProduto(index) {
  produtos.value.splice(index, 1)
}

// Função utilitária para formatar moeda
const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}
</script>

<template>
  <main class="container">
    <header class="header">
      <h2>📦 Gerenciador de Produtos</h2>
      <p class="subtitle">Cadastre e gerencie o estoque do seu pequeno negócio</p>
    </header>

    <div class="grid-layout">
      <section class="card-painel">
        <h3>Novo Produto</h3>
        <div class="formulario">
          <div class="input-group">
            <label>Nome do Produto</label>
            <input v-model="nome" placeholder="Ex: Camiseta Algodão Premium" />
          </div>

          <div class="input-group">
            <label>Categoria</label>
            <select v-model="categoria">
              <option value="" disabled selected>Selecione uma categoria</option>
              <option value="Vestuário">Vestuário</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div class="row">
            <div class="input-group">
              <label>Quantidade</label>
              <input v-model="quantidade" type="number" min="0" placeholder="0" />
            </div>
            <div class="input-group">
              <label>Preço de Venda</label>
              <input v-model="preco" type="number" min="0" step="0.01" placeholder="R$ 0,00" />
            </div>
          </div>

          <div class="input-group">
            <label>Descrição <span class="tag-ia">Sugestão por IA em breve</span></label>
            <textarea v-model="descricao" placeholder="Breve descrição do produto para o cliente..."></textarea>
          </div>

          <button class="btn-primary" @click="adicionarProduto">
            Adicionar Produto
          </button>
        </div>
      </section>

      <section class="card-painel">
        <h3>Produtos Cadastrados ({{ produtos.length }})</h3>
        
        <div v-if="produtos.length === 0" class="empty-state">
          Nenhum produto cadastrado ainda.
        </div>

        <div v-else class="table-container">
          <table class="produtos-tabela">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Estoque</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(produto, index) in produtos" :key="index">
                <td>
                  <span class="nome-prod">{{ produto.nome }}</span>
                </td>
                <td><span class="badge">{{ produto.categoria }}</span></td>
                <td>
                  <span :class="['estoque-status', produto.quantidade < 5 ? 'baixo' : 'ok']">
                    {{ produto.quantidade }} un
                  </span>
                </td>
                <td>{{ formatarMoeda(produto.preco) }}</td>
                <td>
                  <button class="btn-danger" @click="removerProduto(index)">
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.container {
  background: #0f172a; /* Fundo azul escuro escandinavo bem moderno */
  color: #f8fafc;
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h2 {
  font-size: 2rem;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #94a3b8;
  margin: 0;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}

.card-painel {
  background: #1e293b;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-painel h3 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.25rem;
  border-bottom: 1px solid #334155;
  padding-bottom: 12px;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
}

.input-group label {
  font-size: 0.875rem;
  color: #cbd5e1;
  font-weight: 500;
}

input, select, textarea {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 10px 14px;
  color: white;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #6366f1;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.tag-ia {
  font-size: 0.75rem;
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 6px;
}

.btn-primary {
  background: #6366f1;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}

.btn-primary:hover {
  background: #4f46e5;
}

/* Estilos da Tabela */
.empty-state {
  color: #64748b;
  text-align: center;
  padding: 40px;
}

.table-container {
  overflow-x: auto;
}

.produtos-tabela {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.produtos-tabela th {
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 12px;
  border-bottom: 2px solid #334155;
}

.produtos-tabela td {
  padding: 16px 12px;
  border-bottom: 1px solid #334155;
  font-size: 0.95rem;
}

.nome-prod {
  font-weight: 600;
}

.badge {
  background: #334155;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
}

.estoque-status.baixo {
  color: #f87171;
  font-weight: bold;
}
.estoque-status.ok {
  color: #4ade80;
}

.btn-danger {
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-danger:hover {
  background: #ef4444;
  color: white;
}
</style>