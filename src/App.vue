<template>
  <div id="app">
    <NavBar/>
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
    NavBar
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a:hover{
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
