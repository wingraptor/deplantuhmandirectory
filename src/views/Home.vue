<template>
  <div class="home">
    <Jumbotron />
    <!-- Only load card component when contact is received from API ->  https://stackoverflow.com/a/45060619 -->
    <template v-if="contactDataReceived">
      <div class="container">
        <!-- Search Input Row -->
        <div class="row">
          <div class="col d-flex justify-content-center m-4">
            <SearchBar :contacts="contacts" />
          </div>
        </div>
        <!-- Contacts Filter Row -->
        <div class="row">
          <div class="col d-flex justify-content-center" id="filter-div">
            <ContactsFilter v-bind:categories="categories" />
          </div>
        </div>
        <!-- Contacts Cards Row -->
        <div class="row">
          <div
            class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center"
            v-for="(contact) in slicedContactArray"
            :key="contact.name"
          >
            <Card :contact="contact" contacts-count="setContactsCount" />
          </div>
        </div>
      </div>
    </template>
    <div class="container">
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="Math.ceil(
          contactCount / contactsPerPage
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
import ContactsFilter from "@/components/ContactsFilter.vue";
import axios from "axios";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "Home",
  components: {
    Card,
    Jumbotron,
    ContactsFilter,
    SearchBar,
  },
  data() {
    return {
      contacts: [],
      filteredContactsArr: this.contacts,
      contactsPerPage: 6,
      errorMessage: null,
      categories: [],
      contactCount: 0,
      contactDataReceived: false,
    };
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
        this.contacts = response.data;
        this.contactCount = response.data.length;
        this.contactDataReceived = true;
        // Filter contacts according category given in route
        this.filterContacts(this.$route.params.category);
      } catch (error) {
        this.errorMessage = error;
      }
    },
    // Set contactsCount so that the correct number of pages are displayed on the pagination tab. Page count corresponds with the number of contacts current in view
    setContactsCount(count) {
      this.contactCount = count;
    },
    // Scroll to category Div when user paginates to a new page
    scrollToTop() {
      const categoryDiv = document.querySelector("#dropdown-1");
      categoryDiv.scrollIntoView({ behavior: "smooth" });
    },
    getCategories() {
      // Create an array of all the available categories for contacts from the data returned from API call
      this.categories = [
        ...new Set(this.contacts.map((obj) => obj.category)),
      ].sort();
    },
    // Filter contacts according to specific category
    filterContacts(category) {
      if (category) {
        this.filteredContactsArr = this.contacts.filter(
          (contact) => contact.category === category
        );
        // console.log( this.contacts)
        // Return user to Page 1 (home page) when switching category. This is because, if user is on page 2, then switches to a category which does not
        // have enough contacts to 'have' a Page 2, no cards will be displayed
        if (this.$route.query.page) {
          this.$router.push(`/category/${category}`);
        }
      }
      // Handle if no category param is sent, that is, no filter for contact category is present
      else {
        this.filteredContactsArr = this.contacts;
      }
    },
  },
  mounted() {
    this.getContactData();
    // console.log("Parent element create method called")
  },
  watch: {
    // Update categories array when data is received
    contactDataReceived() {
      this.getCategories();
    },
    // Watch for change in category parameter in order to trigger : https://forum.vuejs.org/t/when-is-watch-route-called/60696
    "$route.params.category": function (category) {
      this.filterContacts(category);
    },
    // Watch for updates to filtered Contacts so as to update the number of pages shown in the pagination div
    filteredContactsArr(val) {
      this.setContactsCount(val.length);
    },
  },
  computed: {
    slicedContactArray() {
      // Set homepage (default page) to 1, that is, pageNumber === 1] when this.$route.query.page === undefined
      let pageNumber = this.$route.query.page || 1;
      // Allows for scrolling to filter Div element on moving to a new page (via pagination)
      // const filterDiv = document.querySelector("#filter-div");
      // filterDiv.scrollIntoView(true);
      // console.log(this.filteredContactsArr);
      return this.filteredContactsArr.slice(
        Number((pageNumber - 1) * this.contactsPerPage),
        Number((pageNumber - 1) * this.contactsPerPage) + this.contactsPerPage
      );
    },
  },
};
</script>

<style scoped>
#filter-div {
  margin-bottom: 1.5rem;
}
</style>