<template>
  <b-dropdown id="dropdown-1" :text="categoryName" class="m-md-2">
    <b-dropdown-item @click="removeFilter">All Categories</b-dropdown-item>
    <b-dropdown-item
      v-for="category in categories"
      :key="category"
      :data-category="category"
      @click="changeCategory"
    >{{category}}</b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: "ContactsFilter",
  props: ["categories"],
  data() {
    return {
      categoryName: "All Categories",
    };
  },
  methods: {
    // Changes category param such that the watcher function is able to trigger thus filter contacts according to category
    changeCategory() {
      // Use event.currentTarget if event listener is attached to parent element
      // but you want to access properties of the child: https://stackoverflow.com/a/50049249
      let category = event.target.getAttribute("data-category");
      this.$router.push(`/category/${category}`);
    },
    // Filter contacts according to specific category
    filterContacts(category) {
      if (category) {
        this.filteredContactsArr = this.contacts.filter(
          (contact) => contact.category === category
        );
        // console.log(categoryName)
        this.categoryName = category;
        console.log(this.categoryName);

        // Return user to Page 1 (home page) when switching category. This is because, if user is on page 2, then switches to a category which does not
        // have enough contacts to 'have' a Page 2, no cards will be displayed
        if (this.$route.query.page) {
          this.$router.push("/");
        }
      }
      // Handle if no category param is sent, that is, no filter for contact category is present
      else {
        (this.categoryName = "All Categories"),
          (this.filteredContactsArr = this.contacts);
      }
    },
    removeFilter() {
      this.$router.push("/");
    },
  },
  // TODO: Refactor both the watcher and mounted functions to be cleaner
  watch: {
    // Watch for change in category parameter in order to trigger : https://forum.vuejs.org/t/when-is-watch-route-called/60696
    "$route.params.category": function (category) {
      // this.categoryName = category;
      category
        ? (this.categoryName = category)
        : (this.categoryName = "All Categories");
    },
  },
  mounted() {
    // Set Category Name in Filter Div to category given in route, if given.
    this.$route.params.category
      ? (this.categoryName = this.$route.params.category)
      : (this.categoryName = "All Categories");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>