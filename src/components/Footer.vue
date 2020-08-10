<template>
  <div class="contact mt-5">
    <!-- Footer -->
    <footer class="page-footer">
      <!-- Footer Links -->
      <div class="container">
        <!-- Grid row-->
        <div class="row text-center d-flex justify-content-center pt-5">
          <!-- Grid column -->
          <div class="col-md-2 mb-3">
            <a @click="scrollToTop" id="scroll-to-top">
              <v-icon name="arrow-up" scale="1.5"></v-icon>
            </a>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-2 mb-3">
            <h6 class="text-uppercase">
              <a href="https://www.deplantuhman.com/">Blog</a>
            </h6>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-2 mb-3">
            <h6 class="text-uppercase">
              <a href="/about">About</a>
            </h6>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-2 mb-3">
            <h6 class="text-uppercase">
              <a href="https://anchor.fm/thegreenroombarbados">Podcast</a>
            </h6>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-2 mb-3">
            <h6 class="text-uppercase">
              <a href="https://forms.gle/DEgFuKVMR9kTDJmo9">Get Listed</a>
            </h6>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row-->
        <hr class="rgba-white-light" style="margin: 0 15%;" />

        <!-- <hr class="clearfix d-md-none rgba-white-light" style="margin: 10% 15% 5%;" /> -->

        <!-- Grid row-->
        <div class="row pb-3 mt-3">
          <!-- Grid column -->
          <div class="col-md-12">
            <div class="mb-1 d-flex justify-content-center">
              <!-- Facebook -->
              <a href="https://www.facebook.com/De-Plantuh-Man-103612707835899">
                <v-icon name="brands/facebook" scale="1.5" class="m-2"></v-icon>
              </a>
              <!-- Twitter -->
              <a href="https://twitter.com/deplantuhman">
                <v-icon name="brands/twitter" scale="1.5" class="m-2"></v-icon>
              </a>
              <!--Instagram-->
              <a href="http://instagram.com/deplantuhman246">
                <v-icon name="brands/instagram" scale="1.5" class="m-2"></v-icon>
              </a>
            </div>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row-->
      </div>
      <!-- Footer Links -->

      <!-- Attribution -->
      <div class="footer-attribution text-center py-3">
        Made by
        <a href="https://akonobrathwaite.com/">Akono</a>
      </div>
      <!-- Attribution -->
    </footer>
    <!-- Footer -->
    <!-- <div class="container">

    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Footer",
  components: {},
  data() {
    return {
      data: {},
    };
  },
  created() {},
  methods: {
    // Scroll to category Div when user clicks arrow in footer
    scrollToTop() {
      const categoryDiv = document.querySelector("#dropdown-1");
      categoryDiv.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
a {
  color: white;
}

a:hover {
  color: var(--highlight-two-darker);
}

#scroll-to-top {
  color: white;
  cursor: pointer;
}

#scroll-to-top:hover {
  color: var(--highlight-two-darker);
}

footer {
  background-color: var(--highlight-two);
}

.footer-attribution {
  background-color: var(--highlight-two-darker);
  color: white;
}

.footer-attribution a:hover {
  color: var(--highlight-two);
}
</style>

