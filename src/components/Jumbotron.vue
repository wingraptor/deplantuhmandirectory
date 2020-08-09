<template>
  <div class="jumbotron-component w-100 d-flex justify-content-center align-items-center">
    <!-- <div class="test">
      <b-img src="https://i.imgur.com/6fp8Iks.jpg" fluid-grow alt="Responsive image"></b-img>
      <h4 class="w-50 position-absolute text-danger mt-4 mr-5 pr-5">This is also<br>available on your mobile.</h4>
    </div>-->
    <div class="text-white text-center">
      <h1>De Plantuh Man Directory</h1>
      <p id="page-description" class="my-5 text-center">Scroll to see a selection of agricultural products, services and contacts available in Barbados.</p>
      <a href="#dropdown-1" id="scroll-to-content">
        <v-icon name="arrow-down" scale="2"></v-icon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Jumbotron",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jumbotron-component {
  margin-bottom: 1.5rem;
  /* Darken background image: https://stackoverflow.com/a/26621579 */
  background: linear-gradient(rgba(0, 0, 0, 0.164), rgba(0, 0, 0, 0.5)), url("https://i.imgur.com/yS0q2tz.jpg");
  background-position: center;
  background-size: cover;
  height: 500px;
  font-family: 'Roboto Slab', serif;
  position:relative;
}

#scroll-to-content{
  position:absolute;
  bottom:50px;
}

#page-description{
  font-size: 1.5rem;
}

a{
  color: white
}

</style>