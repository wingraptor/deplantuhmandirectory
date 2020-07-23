<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="light">
        <router-link to="/">
          <b-navbar-brand>
            <img src="./assets/logo_transparent.png" alt height="40" />
            De Plantuh Man Directory
          </b-navbar-brand>
        </router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>

            <b-nav-item href="https://forms.gle/DEgFuKVMR9kTDJmo9" class="color-highlight-one">Get Listed!</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <!-- <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
          </b-navbar-nav> -->
        </b-collapse>
      </b-navbar>
      <!-- <router-link to="/">Home</router-link>| -->
    </div>
    <router-view />
  </div>
</template>

<style>


.nav-link {
  font-weight: bold;
  color: #00b906 !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  background-color: #fff;
}
</style>
