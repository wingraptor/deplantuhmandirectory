<template>
  <div class="home">
    <Card v-bind="groupedProps" />
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
      }
    };
  },
  created() {
    this.getContactData();
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?page=1" : `?page=${pageNum}`;
    },
    async getContactData() {
      try {
        const response = await axios.get("http://localhost:3000/contacts");
        this.groupedProps.contacts = response.data;
      } catch (error) {
        this.groupedProps.errorMessage = error;
      }
    }
  }
};
</script>
