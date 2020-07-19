<template>
  <div class="home">
    <!-- TODO: Add to notes -->
    <!-- Only load card component when contact is received from API ->  https://stackoverflow.com/a/45060619 -->
    <template v-if="contactDataReceived">
      <Card v-bind="groupedProps" />
    </template>
    <div class="container">
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="Math.ceil(groupedProps.contacts.length / groupedProps.contactsPerPage)"
        :limit="10"
        align="center"
        use-router
      ></b-pagination-nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Card
  },
  data() {
    return {
      groupedProps: {
        contacts: [],
        contactsPerPage: 6,
        errorMessage: null
      },
      contactDataReceived: false
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
        const response = await axios.get("http://localhost:3000/contacts");
        this.groupedProps.contacts = response.data;
        this.contactDataReceived = true;
      } catch (error) {
        this.groupedProps.errorMessage = error;
      }
    }
  }
};
</script>
