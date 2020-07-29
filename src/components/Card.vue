<template>
  <div class="card-component">
    <div class="container">
      <div class="row">
        <div class="col d-flex justify-content-center" id="filter-div">
          <b-dropdown id="dropdown-1" :text="categoryName" class="m-md-2">
            <b-dropdown-item @click="removeFilter">All Categories</b-dropdown-item>
            <b-dropdown-item
              v-for="category in categories"
              :key="category"
              :data-category="category"
              @click="filteredContacts"
            >{{category}}</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="row">
        <div
          class="col-12 col-md-4 d-flex justify-content-center"
          v-for="(contact) in slicedContactArray"
          :key="contact.name"
        >
          <!-- TODO: Add to Notes -->
          <!-- https://stackoverflow.com/questions/45341169/bootstrap-vue-card-component-image-doesnt-render -->
          <b-card
            :title="contact.name"
            :img-src="contact.logoUrl || getImage(contact.category)"
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
              </p>-->
            </b-card-text>
            <template v-slot:footer>
              <img
                src="../assets/icons/link.svg"
                alt
                height="26"
                v-b-popover.hover.html="generatePopover(contact.website)"
              />
              <img
                src="../assets/icons/phone-call.svg"
                alt
                height="26"
                v-b-popover.hover="contact.phone || 'No number available'"
              />
              <img
                src="../assets/icons/email.svg"
                alt
                height="26"
                v-b-popover.hover="contact.email || 'No email available'"
              />
              <img
                src="../assets/icons/facebook.svg"
                alt
                height="26"
                v-b-popover.hover.html="generatePopover(contact.facebook)"
              />
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
      categoryName: "All Categories",
      iconScale: "1.5",
      categoryImages: {
        Organisation: "https://i.imgur.com/CmUEPeSh.jpg",
        Business: "https://i.imgur.com/MJt6VD3h.jpg",
        Freighting: "https://i.imgur.com/yEXo2B8h.jpg",
        Farmer: "https://i.imgur.com/4dBKaIah.jpg",
        AgriculturalSupplies: "https://i.imgur.com/LEwmNIFh.jpg",
        SoilAndAmmendments: "https://i.imgur.com/Q8uxEwLh.jpg",
        Restaurant: "https://i.imgur.com/0v0L5rNh.png",
        Expertise: "https://i.imgur.com/h2mEK2uh.jpg",
      },
    };
  },
  methods: {
    filteredContacts() {
      // TODO: Add to Notes
      // Use event.currentTarget because of this: https://stackoverflow.com/a/50049249
      let category = event.currentTarget.getAttribute("data-category");
      this.filteredContactsArr = this.contacts.filter(
        (contact) => contact.category === category
      );
      this.categoryName = category;
      // Return user to Page 1 (home page) when switching category. This is because, if user is on page 2, then switches to a category which does not
      // have enough contacts to 'have' a Page 2, no cards will be displayed
      if (this.$route.query.page) {
        this.$router.push("/");
      }
    },
    removeFilter() {
      (this.categoryName = "All Categories"),
        (this.filteredContactsArr = this.contacts);
    },
    // Generate popover for contact info. (tel., email etc)
    generatePopover(data) {
      if (!data) {
        return "Not available";
      }
      return `<a href=${data} target=_blank>${data}</a>`;
    },
    getImage(category) {
      let formattedCategory = category.split(" ").join("");
      return this.categoryImages[formattedCategory];
    },
  },
  computed: {
    slicedContactArray() {
      // Set homepage (default page) to 1 [pageNumber === 1] when this.$route.query.page === undefined
      let pageNumber = this.$route.query.page || 1;
      // Allows for scrolling to filter Div element on moving to a new page (via pagination)
      // const filterDiv = document.querySelector("#filter-div");
      // filterDiv.scrollIntoView(true);

      return this.filteredContactsArr.slice(
        Number((pageNumber - 1) * this.contactsPerPage),
        Number((pageNumber - 1) * this.contactsPerPage) + this.contactsPerPage
      );
    },
  },
  mounted() {
    // Get list of unique contact categories: https://stackoverflow.com/a/33512273
    // TODO: Add to notes
    this.categories = [...new Set(this.contacts.map((obj) => obj.category))];
  },
  // TODO: Add to notes: https://vuejs.org/v2/api/#watch
  watch: {
    // TODO: Add to notes https://medium.com/@hvekriya/pass-data-from-child-to-parent-in-vue-js-b1ff917f70cc
    filteredContactsArr(val) {
      this.$emit("contacts-count", val.length);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin-bottom: 20px;
  width: 100%;
}

.card-img-top{

}

.card-footer {
  display: flex;
  align-content: center;
  justify-content: space-around;
  background-color: #FFF0F5;
}

#filter-div {
  margin-bottom: 1.5rem;
}
</style>