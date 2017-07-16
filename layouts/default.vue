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

    <footer class="app-footer mt-5">
        <img src="~assets/fandogh.png" class="footer-logo"/>
        <small><a href="https://fandogh.org" target="_blank"> گروه نرم افزاری فندق </a></small>

        <img src="~assets/ceit2.png" class="footer-logo"/>
        <small><a href="">شورای صنفی دانشکده مهندسی کامپیوتر و فناوری اطلاعات امیرکبیر</a></small>
    </footer>

  </div>
</template>

<style>
.app {
  min-height: 100%;
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
  height: 50px !important;
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
}

.app-footer a {
  color: grey;
  text-decoration: none;
}

.footer-logo {
  width: 1.5em;
  margin: 0 .5em;
}
</style>
