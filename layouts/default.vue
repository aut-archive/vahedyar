<template>
  <div dir="rtl" class="app">
    <b-navbar toggleable type="inverse" variant="primary">
      <b-link class="navbar-brand" to="/">
        <span>واحدیار</span>
      </b-link>
    </b-navbar>

    <div class="container mt-4">
      <nuxt/>
    </div>

    <footer class="app-footer">
      شورای صنفی دانشکده مهندسی کامپیوتر و فناوری اطلاعات امیرکبیر
      |
     <a href="https://fandogh.org" target="_blank"> گروه نرم افزاری فندق </a>
    </footer>

  </div>
</template>

<style scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app > .navbar {
  min-height: 54px;
}

.app > .container {
  flex: 1
}

footer {
  height: 50px;
  color:white;
  background: grey;
  display: flex;
  align-items: center;
  padding: 0 30px;
}

footer a {
  color: white;
}
</style>
