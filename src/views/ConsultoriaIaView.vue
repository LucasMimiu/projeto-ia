<script setup>
import { ref } from 'vue'

// Histórico do Chat
const mensagens = ref([
  { 
    remetente: 'ia', 
    texto: 'Olá! Sou o seu assistente de IA para negócios. Analisei seu estoque atual. Deseja saber quais produtos estão parados ou quer dicas de estratégias de vendas para este mês?' 
  }
])

const novaMensagem = ref('')
const carregando = ref(false)

function enviarMensagem() {
  if (!novaMensagem.value.trim()) return

  // Adiciona a pergunta do usuário na tela
  mensagens.value.push({
    remetente: 'usuario',
    texto: novaMensagem.value
  })

  const pergunta = novaMensagem.value
  novaMensagem.value = ''
  carregando.value = true

  // Simulando a resposta da API de IA (Gemini / OpenAI) após 1.5 segundos
  setTimeout(() => {
    let respostaIa = 'Interessante pergunta. Analisando seu banco de dados, sugiro focar na queima de estoque de vestuário, pois o giro está baixo.'
    
    if (pergunta.toLowerCase().includes('promocao') || pergunta.toLowerCase().includes('promoção')) {
      respostaIa = '✨ **Sugestão de Combo:** Crie um combo do "Tênis de Corrida Ultra" + "Camiseta Algodão" com 10% de desconto. Isso vai acelerar a saída do tênis que está parado no estoque há semanas.'
    } else if (pergunta.toLowerCase().includes('comprar') || pergunta.toLowerCase().includes('estoque')) {
      respostaIa = '⚠️ **Atenção:** Seu estoque de "Teclado Mecânico RGB" está crítico (apenas 2 unidades). Recomendo comprar mais 10 unidades baseado na sua média de vendas mensal.'
    }

    mensagens.value.push({
      remetente: 'ia',
      texto: respostaIa
    })
    carregando.value = false
  }, 1500)
}
</script>

<template>
  <main class="chat-container">
    <header class="chat-header">
      <h2>✨ Consultor de Negócios IA</h2>
      <p>Tome decisões estratégicas baseadas nos dados reais do seu estoque</p>
    </header>

    <div class="chat-box">
      <div 
        v-for="(msg, index) in mensagens" 
        :key="index" 
        :class="['balao-wrapper', msg.remetente]"
      >
        <div class="avatar">{{ msg.remetente === 'ia' ? '🤖' : '👤' }}</div>
        <div class="balao">
          <p>{{ msg.texto }}</p>
        </div>
      </div>

      <div v-if="carregando" class="balao-wrapper ia">
        <div class="avatar">🤖</div>
        <div class="balao pensando">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>

    <div class="chat-input-area">
      <input 
        v-model="novaMensagem" 
        placeholder="Pergunte algo (Ex: 'Me dê ideias de promoções para os produtos parados')" 
        @keyup.enter="enviarMensagem"
      />
      <button @click="enviarMensagem" :disabled="carregando">Perguntar</button>
    </div>
  </main>
</template>

<style scoped>
.chat-container {
  background: #0f172a;
  color: white;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', sans-serif;
}

.chat-header {
  text-align: center;
  margin-bottom: 24px;
}

.chat-header p {
  color: #94a3b8;
}

.chat-box {
  width: 100%;
  max-width: 700px;
  background: #1e293b;
  height: 500px;
  border-radius: 16px;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #334155;
}

.balao-wrapper {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  max-width: 80%;
}

.balao-wrapper.usuario {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.avatar {
  background: #334155;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.balao {
  background: #273549;
  padding: 12px 16px;
  border-radius: 16px 16px 16px 4px;
  text-align: left;
}

.usuario .balao {
  background: #6366f1;
  border-radius: 16px 16px 4px 16px;
}

.balao p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
}

/* Input do Chat */
.chat-input-area {
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 700px;
  margin-top: 16px;
}

input {
  flex: 1;
  background: #1e293b;
  border: 1px solid #334155;
  padding: 14px;
  border-radius: 12px;
  color: white;
}

input:focus {
  outline: none;
  border-color: #6366f1;
}

button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  background: #475569;
  cursor: not-allowed;
}

/* Animação de Carregamento da IA */
.pensando span {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #94a3b8;
  border-radius: 50%;
  margin-right: 4px;
  animation: piscar 1s infinite alternate;
}
.pensando span:nth-child(2) { animation-delay: 0.2s; }
.pensando span:nth-child(3) { animation-delay: 0.4s; }

@keyframes piscar {
  from { opacity: 0.2; }
  to { opacity: 1; }
}
</style>