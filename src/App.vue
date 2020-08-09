<template>
  <div id="app">
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    Footer,
    NavBar,
  },
};
</script>

<style>
:root {
  --highlight-one: #00b906;
  --highlight-two: #506c64;
  --highlight-two-darker: #2d3d38;
  --highlight-three: #cdd3d5;
}

html,
body {
  width: 100%;
  height: 100%;
}

/* Keeping Footer at bottom of Page: https://dev.to/niorad/keeping-the-footer-at-the-bottom-with-css-grid-15mf */
#app {
  font-family: "IBM Plex Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.1em;
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
}

a:hover {
  text-decoration: none !important;
}

.btn {
  background-color: var(--highlight-two) !important;
}
.btn:hover,
.btn:focus {
  background-color: var(--highlight-two-darker) !important;
}

.page-link {
  color: var(--highlight-two) !important;
}

.page-link:hover {
  background-color: var(--highlight-two) !important;
  color: white !important;
}

.page-item.active .page-link {
  background-color: var(--highlight-two) !important;
  color: white !important;
  border-color: var(--highlight-two) !important;
}
</style>
