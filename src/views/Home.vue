<template>
  <div class="home">
    <Jumbotron />
    <!-- TODO: Add to notes -->
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
    Jumbotron
  },
  data() {
    return {
      groupedProps: {
        contacts: [],
        contactsPerPage: 6,
        errorMessage: null
      },
      contactCount: 0,
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
        const response = await axios.get("https://my-json-server.typicode.com/wingraptor/deplantuhmandirectory/contacts");
        this.groupedProps.contacts = response.data;
        this.contactCount = response.data.length;
        this.contactDataReceived = true;
      } catch (error) {
        this.groupedProps.errorMessage = error;
      }
    },
    setContactsCount(count) {
      this.contactCount = count;
    },
    test(){
      alert("test")
    }
  }
};
</script>
