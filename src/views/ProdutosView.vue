<script setup>
import { ref } from 'vue'

const produtos = ref([])

const nome = ref('')
const quantidade = ref('')
const preco = ref('')

function adicionarProduto() {
  if (!nome.value || !quantidade.value || !preco.value) return

  produtos.value.push({
    nome: nome.value,
    quantidade: quantidade.value,
    preco: preco.value
  })

  nome.value = ''
  quantidade.value = ''
  preco.value = ''
}

function removerProduto(index) {
  produtos.value.splice(index, 1)
}
</script>

<template>
  <main>
    <h2>Sistema Inteligente para Pequenos Negócios</h2>

    <div class="formulario">
      <input v-model="nome" placeholder="Nome do produto" />
      <input v-model="quantidade" type="number" placeholder="Quantidade" />
      <input v-model="preco" type="number" placeholder="Preço" />

      <button @click="adicionarProduto">
        Adicionar Produto
      </button>
    </div>

    <div class="lista">
      <ul>
        <li v-for="(produto, index) in produtos" :key="index">
          {{ produto.nome }} |
          Estoque: {{ produto.quantidade }} |
          R$ {{ produto.preco }}

          <button
            class="btn-excluir"
            @click="removerProduto(index)"
          >
            Excluir
          </button>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
main {
  background: #1d1c1c;
  color: white;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  margin: 20px auto;
}

input {
  padding: 10px;
}

button {
  padding: 10px;
  cursor: pointer;
}

.btn-excluir {
  margin-left: 10px;
}
</style>