<template>
  <div class="about">
    <div class="container my-5">
      <h1 class="text-center">About</h1>
      <div class="about-text pt-5">
        <p>
          De Plantuh Man Directory started life as a simple spreadsheet of contacts in the agricultural and adjacent industries in Barbados which was set up for our personal use.
          We quickly realised that a lot of useful businesses, organisations and individuals who provide products and services already existed in Barbados, but a large number of people just simply didn't know that they existed.
          We suspected that this was due to these services not existing in one easily accessed location and thus, the idea of making our original spreadsheet available to all was born.
        </p>
        <p>
          Our goal with this directory is to link interested persons with appropriate businesses, organisations and individuals that are related to agriculture in some way. The idea is to keep
          everything as simple and user friendly as possible. Users can click contact cards to be directed to that contact's specific page where they can find more information about that contact.
        </p>
        <p>
          Business and organisation owners can quickly and easily have their business/organisation listed by simply filling out the
          <a
            href="https://forms.gle/DEgFuKVMR9kTDJmo9"
          >"Get Listed" Form.</a>
          This service is free to use and offers the advantage of being able to reach customers who already have an interest in agricultural products and services and are therefore more likely to use your service.
        </p>
        <p>The list of contact categories that we have are listed here:</p>
        <div class="row">
          <div
            class="col-md-3 d-flex justify-content-center my-2"
            v-for=" category in categories"
            :key="category"
          >
            <a :href="'/category/'+ category">
              <span class="badge badge-secondary p-2">{{category}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async getContactData() {
      const api =
        "https://sheet.best/api/sheets/a65159dd-5155-4cf9-8bcf-2fd4168b32fc";
      try {
        const response = await axios.get(api);
        console.log(response);
        this.getCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    getCategories(data) {
      // Create an array of all the available categories for contacts from the data returned from API call
      this.categories = [...new Set(data.map((obj) => obj.category))];
    },
  },
  mounted() {
    this.getContactData();
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
