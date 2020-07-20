<template>
  <div class="card-component">
    <div class="container">
      <div class="row">
        <div class="col">
          <b-dropdown id="dropdown-1" :text="categoryName" class="m-md-2">
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
          <b-button @click="removeFilter">Remove Filter</b-button>
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
            :img-src="'https://via.placeholder.com/400x300?text='+contact.name"
            border-variant="secondary"
          >
            <b-card-text align="left">
              <p v-if="contact.phone">
                <b-icon icon="phone"></b-icon>Tel:
                <a :href="'tel:'+contact.phone">{{contact.phone}}</a>
              </p>
              <p v-if="contact.email">
                <b-icon icon="envelope"></b-icon>Email:
                <a :href="'mailto:'+contact.email">{{contact.email}}</a>
              </p>
              <p v-if="contact.website">
                <b-icon icon="link"></b-icon>Website:
                <a :href="contact.website" target="_blank">{{contact.website}}</a>
              </p>
            </b-card-text>
            <template v-slot:footer align="left">
              <span class="font-weight-bold">Category:</span>
              <em>{{contact.category}}</em>
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
      categoryName: "Category"
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
      (this.categoryName = "Category"),
        (this.filteredContactsArr = this.contacts);
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
    },
  },
  mounted() {
    // Get list of unique contact categories: https://stackoverflow.com/a/33512273
    // TODO: Add to notes
    this.categories = [...new Set(this.contacts.map(obj => obj.category))];
  },
  watch:{
    filteredContactsArr(val){
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
</style>