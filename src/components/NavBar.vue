<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="light" class="border-bottom py-3">
      <router-link to="/">
        <b-navbar-brand>
          <img src="@/assets/logo_transparent.png" alt height="40" />
          <span>Directory</span>
        </b-navbar-brand>
      </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            href="https://forms.gle/DEgFuKVMR9kTDJmo9"
            class="color-highlight-one font-weight-bold"
          >Get Listed!</b-nav-item>
          <b-nav-item href="/about" class="font-weight-bold">
            About
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <!-- <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
        </b-navbar-nav>-->
      </b-collapse>
    </b-navbar>
    <!-- <router-link to="/">Home</router-link>| -->
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav {
  background-color: #fff;
}

.nav-link {
  /* font-weight: bold; */
  color: var(--highlight-two) !important;
}
</style>