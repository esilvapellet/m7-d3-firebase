<template>
  <header>
    <nav class="navbar navbar-dark bg-dark navbar-light navbar-expand-lg p-4">
      <div class="container-fluid">
        <a class="navbar-brand">Desafío <span class="fw-bold">CRUD Usuarios</span></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mx-3">
            <li class="nav-item">
              <router-link to="/" class="nav-link active">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/usuarios" class="nav-link">Usuarios</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    // font-weight: bold;
    // color: #2c3e50 !important;

    &.router-link-exact-active {
      color: #42b983 !important;
    }
  }
}
</style>
