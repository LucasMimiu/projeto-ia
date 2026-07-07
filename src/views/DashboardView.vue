<template>
  <section class="dashboard">
    <div class="card">
      <div class="card-icon">📦</div>
      <div class="card-content">
        <h3>1,248</h3>
        <p>Produtos Cadastrados</p>
      </div>
    </div>

    <div class="card">
      <div class="card-icon">🔢</div>
      <div class="card-content">
        <h3>15,420</h3>
        <p>Total em Estoque</p>
      </div>
    </div>

    <div class="card highlight">
      <div class="card-icon">💰</div>
      <div class="card-content">
        <h3>R$ 45.230,00</h3>
        <p>Valor Total em Estoque</p>
      </div>
    </div>

    <div class="card alert">
      <div class="card-icon">⚠️</div>
      <div class="card-content">
        <h3>5</h3>
        <p>Produtos com Estoque Baixo</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
:root {
  --bg-card: #ffffff;
  --text-main: #1e293b;
  --text-muted: #64748b;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin: 24px;
  font-family: 'Inter', sans-serif;
}

.card {
  background: #1e1e24; /* Um cinza escuro/azulado bem moderno */
  color: #f8fafc;
  padding: 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

.card-icon {
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content h3 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.card-content p {
  font-size: 0.875rem;
  color: #94a3b8;
  margin: 0;
  font-weight: 500;
}

/* Customizações de cores para cards específicos */
.card.highlight {
  background: linear-gradient(135deg, #4f46e5, #06b6d4);
}
.card.highlight .card-content p {
  color: #e2e8f0;
}

.card.alert {
  border: 1px solid #ef4444;
  background: #271616;
}
.card.alert h3 {
  color: #fca5a5;
}
</style>