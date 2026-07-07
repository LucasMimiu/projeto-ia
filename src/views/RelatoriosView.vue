<script setup>
import { ref, computed } from 'vue'

// Dados mockados simulando o que viria do seu banco ou da outra tela
const produtos = ref([
  { nome: 'Camiseta Algodão Premium', categoria: 'Vestuário', quantidade: 3, preco: 89.90 },
  { nome: 'Fone de Ouvido Bluetooth', categoria: 'Eletrônicos', quantidade: 15, preco: 149.00 },
  { nome: 'Teclado Mecânico RGB', categoria: 'Eletrônicos', quantidade: 2, preco: 349.90 },
  { nome: 'Cereal Matinal Orgânico', categoria: 'Alimentos', quantidade: 45, preco: 18.50 },
  { nome: 'Tênis de Corrida Ultra', categoria: 'Vestuário', quantidade: 0, preco: 299.00 }
])

// 1. Cálculo do valor total investido no estoque
const valorTotalEstoque = computed(() => {
  return produtos.value.reduce((acc, prod) => acc + (prod.preco * prod.quantidade), 0)
})

// 2. Filtrar produtos que precisam de atenção urgente (estoque < 5)
const produtosCriticos = computed(() => {
  return produtos.value.filter(prod => prod.quantidade < 5)
})

// Função utilitária para formatar moeda
const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
} // <- O erro estava aqui, fechei com } corretamente agora.

// Função simulando a exportação de dados
function exportarPDF() {
  alert('Gerando PDF do Relatório de Estoque...')
}
</script>

<template>
  <main class="reports-container">
    <header class="reports-header">
      <div>
        <h2>📊 Relatórios & Insights</h2>
        <p class="subtitle">Análise detalhada das mercadorias e saúde do seu estoque</p>
      </div>
      <button class="btn-export" @click="exportarPDF">
        📥 Exportar Relatório (.PDF)
      </button>
    </header>

    <section class="ai-insight-card">
      <div class="ai-icon">✨</div>
      <div class="ai-text">
        <h4>Análise Inteligente (IA)</h4>
        <p>
          Seu produto <strong>"Teclado Mecânico RGB"</strong> tem alto valor de mercado e restam apenas 2 unidades. 
          Sugerimos solicitar reposição junto ao fornecedor nos próximos 3 dias para evitar perda de vendas.
        </p>
      </div>
    </section>

    <div class="reports-grid">
      <div class="report-card">
        <h3>Capital Imobilizado</h3>
        <p class="main-stat">{{ formatarMoeda(valorTotalEstoque) }}</p>
        <span class="stat-desc">Soma do valor de todos os produtos em estoque</span>
      </div>

      <div class="report-card">
        <h3>Quantidade de Alertas</h3>
        <p class="main-stat warning">{{ produtosCriticos.length }}</p>
        <span class="stat-desc">Produtos com estoque crítico (menos de 5 un.)</span>
      </div>
    </div>

    <section class="attention-section">
      <h3>⚠️ Produtos que necessitam de reposição imediata</h3>
      
      <table class="report-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Quantidade Atual</th>
            <th>Preço Unitário</th>
            <th>Total em Risco</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(produto, index) in produtosCriticos" :key="index">
            <td><span class="prod-name">{{ produto.nome }}</span></td>
            <td><span class="category-badge">{{ produto.categoria }}</span></td>
            <td>
              <span :class="['stock-badge', produto.quantidade === 0 ? 'zero' : 'low']">
                {{ produto.quantidade === 0 ? 'Zerado' : produto.quantidade + ' un' }}
              </span>
            </td>
            <td>{{ formatarMoeda(produto.preco) }}</td>
            <td>{{ formatarMoeda(produto.preco * produto.quantidade) }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<style scoped>
.reports-container {
  background: #0f172a;
  color: #f8fafc;
  min-height: 100vh;
  padding: 40px;
  font-family: 'Inter', sans-serif;
}

.reports-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.reports-header h2 {
  font-size: 1.8rem;
  margin: 0 0 6px 0;
}

.subtitle {
  color: #94a3b8;
  margin: 0;
}

.btn-export {
  background: #1e293b;
  color: white;
  border: 1px solid #334155;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-export:hover {
  background: #334155;
  border-color: #475569;
}

/* Card de IA */
.ai-insight-card {
  background: linear-gradient(135deg, #1e1b4b 0%, #311042 100%);
  border: 1px solid #4c1d95;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 32px;
  text-align: left;
}

.ai-icon {
  font-size: 1.5rem;
  background: rgba(139, 92, 246, 0.2);
  padding: 8px;
  border-radius: 8px;
  line-height: 1;
}

.ai-text h4 {
  margin: 0 0 6px 0;
  color: #ddd6fe;
  font-size: 1.05rem;
}

.ai-text p {
  margin: 0;
  color: #c4b5fd;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Grid de Estatísticas */
.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.report-card {
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  text-align: left;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.report-card h3 {
  margin: 0 0 12px 0;
  font-size: 1rem;
  color: #94a3b8;
}

.main-stat {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #38bdf8;
}

.main-stat.warning {
  color: #f87171;
}

.stat-desc {
  font-size: 0.85rem;
  color: #64748b;
}

/* Tabela de Atenção */
.attention-section {
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  text-align: left;
}

.attention-section h3 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: #fca5a5;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
}

.report-table th {
  color: #94a3b8;
  font-size: 0.85rem;
  padding: 12px;
  border-bottom: 2px solid #334155;
}

.report-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #334155;
  font-size: 0.95rem;
}

.prod-name {
  font-weight: 600;
}

.category-badge {
  background: #334155;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
}

.stock-badge {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.stock-badge.zero {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
}

.stock-badge.low {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}
</style>