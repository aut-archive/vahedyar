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
      <img src="~assets/fandogh.png" class="footer-logo"/>
      <a href="https://fandogh.org" target="_blank"> گروه نرم افزاری فندق </a>

      <img src="~assets/ceit2.png" class="footer-logo"/>
      شورای صنفی دانشکده مهندسی کامپیوتر و فناوری اطلاعات امیرکبیر
    </footer>

  </div>
</template>

<style>
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

.app-footer {
  height: 50px;
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  border-top: 1px solid rgba(0,0,0,.1);
}

.app-footer a {
  color: grey;
}

.footer-logo {
  width: 1.5em;
  margin: 0 .5em;
}
</style>
