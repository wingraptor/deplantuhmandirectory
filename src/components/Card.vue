<template>
  <div class="card-component">
    <div class="container">
      <div class="row">
        <div class="col">
          <b-dropdown id="dropdown-1" :text="categoryName" class="m-md-2">
            <b-dropdown-item @click="removeFilter">All Categories</b-dropdown-item>
            <b-dropdown-item
              v-for="category in categories"
              :key="category"
              @click="filteredContacts"
            >{{category}}</b-dropdown-item>
          </b-dropdown>
          <!-- <button
            v-for="category in categories"
            :key="category"
            class="btn btn-primary"
            @click="filteredContacts"
          >{{category}}</button>-->
          <!-- <b-button @click="removeFilter">Remove Filter</b-button> -->
        </div>
      </div>
      <div class="row">
        <div
          class="col-12 col-md-4 d-flex justify-content-center"
          v-for="(contact) in slicedContactArray"
          :key="contact.name"
        >
          <b-card
            :title="contact.name"
            :img-src="'https://via.placeholder.com/400x300'"
            border-variant="secondary"
          >
            <b-card-text align="left">
              <p v-if="contact.description">{{contact.description}}</p>
              <!-- <p v-if="contact.phone">
                <b-icon icon="phone"></b-icon>
                <a :href="'tel:'+contact.phone">{{contact.phone}}</a>
              </p>
              <p v-if="contact.email">
                <b-icon icon="envelope"></b-icon>
                <a :href="'mailto:'+contact.email">{{contact.email}}</a>
              </p>
              <p v-if="contact.website">
                <v-icon name="link"></v-icon>
                <a :href="contact.website" target="_blank">Website</a>
              </p>
              <p v-else>
                <v-icon name="facebook"></v-icon>
                <a :href="contact.facebook" target="_blank">Facebook</a>
              </p> -->
            </b-card-text>
            <template class="test" v-slot:footer>
              <!-- <span class="font-weight-bold">Category:</span>
              <em>{{contact.category}}</em>-->
              <!-- <a :href="contact.website" target="_blank"> -->
                <v-icon name="link" v-b-popover.hover.html="generatePopover(contact.website)"></v-icon>
              <!-- </a> -->
              <v-icon v-b-popover.hover="contact.phone || 'No number available'" name="phone"></v-icon>
              <v-icon v-b-popover.hover="contact.email || 'No email available'" name="envelope"></v-icon>
              <v-icon v-b-popover.hover.html="generatePopover(contact.facebook)" name="brands/facebook"></v-icon>
            </template>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["contacts", "error", "contactsPerPage"],
  data() {
    return {
      categories: [],
      filteredContactsArr: this.contacts,
      filtered: false,
      categoryName: "All Categories"
    };
  },
  methods: {
    filteredContacts() {
      let category = event.target.innerText;
      // if (this.filtered) {
      this.filteredContactsArr = this.contacts.filter(
        contact => contact.category === category
      );
      this.categoryName = category;
      // console.log(this.contacts);
      // } else {
      //   return this.contacts;
      // }
      // return console.log(event.target.innerText);
    },
    removeFilter() {
      (this.categoryName = "All Categories"),
        (this.filteredContactsArr = this.contacts);
    },
    generatePopover(data){
      if(!data){
        return "Not available"
      }
      return `<a href=${data} target=_blank>${data}</a>`
    }
  },
  computed: {
    slicedContactArray() {
      // Set homepage (default page) to 1 [pageNumber === 1] when this.$route.query.page === undefined
      let pageNumber = this.$route.query.page || 1;
      return this.filteredContactsArr.slice(
        Number((pageNumber - 1) * this.contactsPerPage),
        Number((pageNumber - 1) * this.contactsPerPage) + this.contactsPerPage
      );
    }
  },
  mounted() {
    // Get list of unique contact categories: https://stackoverflow.com/a/33512273
    // TODO: Add to notes
    this.categories = [...new Set(this.contacts.map(obj => obj.category))];
  },
  // TODO: Add to notes: https://vuejs.org/v2/api/#watch
  watch: {
    // TODO: Add to notes https://medium.com/@hvekriya/pass-data-from-child-to-parent-in-vue-js-b1ff917f70cc
    filteredContactsArr(val) {
      this.$emit("contacts-count", val.length);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin-bottom: 20px;
}

.card-footer{
  display:flex;
  align-content: center;
  justify-content: space-around;
}
</style>