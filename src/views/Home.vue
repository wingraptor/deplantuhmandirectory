<template>
  <div class="home">
    <Jumbotron />
    <!-- Only load card component when contact is received from API ->  https://stackoverflow.com/a/45060619 -->
    <template v-if="contactDataReceived">
      <Card v-bind="groupedProps" @contacts-count="setContactsCount" />
    </template>
    <div class="container">
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="Math.ceil(
          contactCount / groupedProps.contactsPerPage
        )"
        :limit="10"
        align="center"
        use-router
        v-on:change="scrollToTop"
      ></b-pagination-nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import Jumbotron from "@/components/Jumbotron.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Card,
    Jumbotron,
  },
  data() {
    return {
      groupedProps: {
        contacts: [],
        contactsPerPage: 6,
        errorMessage: null,
      },
      contactCount: 0,
      contactDataReceived: false,
    };
  },
  created() {
    this.getContactData();
    // console.log("Parent element create method called")
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    async getContactData() {
      try {
        const response = await axios.get(
          "https://sheet.best/api/sheets/a65159dd-5155-4cf9-8bcf-2fd4168b32fc"
        );
        this.groupedProps.contacts = response.data;
        this.contactCount = response.data.length;
        this.contactDataReceived = true;
      } catch (error) {
        this.groupedProps.errorMessage = error;
      }
    },
    // Set contactsCount so that the correct number of pages are displayed on the pagination tab. Page count corresponds with the number of contacts current in view
    setContactsCount(count) {
      this.contactCount = count;
    },
    // Scroll to category Div when user paginates to a new page
    scrollToTop() {
      const categoryDiv = document.querySelector("#dropdown-1");
      categoryDiv.scrollIntoView({behavior: 'smooth'});
    },
  },
};
</script>