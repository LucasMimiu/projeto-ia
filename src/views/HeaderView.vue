<template>
  <header class="header">
    <h1>Smart Business</h1>

    <nav>
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/produtos">Produtos</RouterLink>
      <RouterLink to="/relatorios">Relatórios</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background: #fff23c;
  padding: 15px;
  text-align: center;
}

h1 {
  margin: 0;
}

nav {
  margin-top: 10px;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 6px;
}

nav a:hover {
  background: rgba(0, 0, 0, 0.1);
}
</style>