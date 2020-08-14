<template>
  <div class="contact">
    <div class="container my-5">
      <div class="row py-3 pt-4 border-bottom d-flex align-items-center">
        <div class="col-lg-auto">
          <!-- <img :src="data.logoUrl" alt="" width=""> -->
          <div class="logo pr-3">
            <b-img :src="data.logoUrl" rounded height="150"></b-img>
          </div>
          <!-- <div class="contact-name">
            <h2>{{data.name}}</h2>
            <a :href="'/category/'+ data.category">
              <span class="badge badge-secondary">{{data.category}}</span>
            </a>
          </div> -->
        </div>
        <div class="col mt-3">
          <h2>{{data.name}}</h2>
          <a :href="'/category/'+ data.category">
            <span class="badge badge-secondary">{{data.category}}</span>
          </a>
        </div>
      </div>
      <div class="row py-4 border-bottom">
        <div class="col">
          <h3>Description</h3>
          <p>{{data.descriptionLong}}</p>
        </div>
      </div>
      <div class="row py-4">
        <div class="col">
          <h3>Contact Information</h3>
          <p v-if="data.address" class="py-1 my-1">
            <strong>Address:</strong>
            {{data.address}}
          </p>
          <p v-if="data.website" class="py-1 my-1">
            <strong>Website:</strong>
            <a :href="data.website" target="_blank">{{data.website}}</a>
          </p>
          <p v-if="data.email" class="py-1 my-1">
            <strong>Email:</strong>
            <a :href="'mailto:'+ data.email">{{data.email}}</a>
          </p>
          <p v-if="data.phone" class="py-1 my-1">
            <strong>Tel:</strong>
            <a :href="'tel:+'+ data.phone">{{formatTelephoneNumber(data.phone)}}</a>
          </p>
          <p>
            <span>
              <strong>Social Profiles:</strong>
            </span>
            <span class="social-media-icons">
              <a v-if="data.facebook" :href="data.facebook" class="text-secondary">
                <v-icon name="brands/facebook" class="mx-1" scale="1.25"></v-icon>
              </a>
              <a v-if="data.instagram" :href="data.instagram" class="text-secondary">
                <v-icon name="brands/instagram" class="mx-1" scale="1.25"></v-icon>
              </a>
              <a v-if="data.twitter" :href="data.twitter" class="text-secondary">
                <v-icon name="brands/twitter" class="mx-1" scale="1.25"></v-icon>
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="container">

    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "ContactPage",
  components: {},
  data() {
    return {
      data: {},
    };
  },
  created() {
    this.getContactData();
  },
  methods: {
    async getContactData() {
      const apiURL =
        "https://sheet.best/api/sheets/a65159dd-5155-4cf9-8bcf-2fd4168b32fc";
      const field = "id";
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`${apiURL}/${field}/${id}`);
        this.data = response.data[0];
      } catch (error) {
        console.log(error);
      }
    },
    formatTelephoneNumber(telephoneNumber) {
      const formatter = (accumulator, currentValue, currentIndex) => {
        if (currentIndex === 1 || currentIndex === 4 || currentIndex === 7) {
          currentValue += "-";
        }
        return accumulator + currentValue;
      };
      return telephoneNumber.split("").reduce(formatter);
    },
  },
};
</script>

<style scoped>
a {
  color: var(--highlight-two);
}

a:hover {
  color: var(--highlight-two-darker);
}
</style>

