<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="light" class="border-bottom">
        <router-link to="/">
          <b-navbar-brand>
            <img src="./assets/logo_transparent.png" alt height="40" />
            <span>Directory</span>
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

:root{
  --hightlight-one: #00b906;
  --highlight-two: #506C64;
  --highlight-two-darker: #2d3d38;
  --highlight-three:#CDD3D5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  background-color: #fff;
}

.nav-link {
  /* font-weight: bold; */
  color: #00b906 !important;
}

.btn {
  background-color: var(--highlight-two) !important;
}
.btn:hover, .btn:focus{
  background-color: var(--highlight-two-darker) !important;
}

.page-link{
  color: var(--highlight-two) !important;
}

.page-link:hover{
  background-color: var(--highlight-two) !important;
  color: white !important;
}

.page-item.active .page-link{
  background-color: var(--highlight-two) !important;
  color: white !important;
  border-color: var(--highlight-two) !important;
}

</style>
