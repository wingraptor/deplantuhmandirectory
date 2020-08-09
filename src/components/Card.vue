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
              @click="changeCategory"
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
          <!-- https://stackoverflow.com/questions/45341169/bootstrap-vue-card-component-image-doesnt-render -->
          <!-- Disable the automatic <b-card-body> section (and associated padding) by setting the prop no-body on the <b-card>. https://bootstrap-vue.org/docs/components/card#cards-->
          <b-card border-variant="secondary" no-body>
            <a :href="'/contact/'+ contact.id" class="contact-link">
              <b-card-img
                :src="contact.logoUrl || getImage(contact.category)"
                top
                class="rounded-0"
              ></b-card-img>
            </a>
            <b-card-body>
              <a :href="'/contact/'+ contact.id" class="contact-link">
                <b-card-title>{{contact.name}}</b-card-title>
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
              </a>
            </b-card-body>
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
                v-b-popover.hover="formatTelephoneNumber(contact.phone) || 'No number available'"
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
    // Changes category param such that the watcher function is able to trigger thus filter contacts according to category
    changeCategory() {
      // Use event.currentTarget if event listener is attached to parent element
      // but you want to access properties of the child: https://stackoverflow.com/a/50049249
      let category = event.target.getAttribute("data-category");
      this.$router.push(`/${category}`);
    },
    // Filter contacts according to specific category
    filterContacts(category) {
      if (category) {
        this.filteredContactsArr = this.contacts.filter(
          (contact) => contact.category === category
        );
        this.categoryName = category;
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
    // Generate popover for contact info. (tel., email etc)
    generatePopover(data) {
      if (!data) {
        return "Not available";
      }
      return `<a href=${data} target=_blank>${data}</a>`;
    },
    // Get image for card depending on category; this is default image that is used if no logo image is provided for the contact
    getImage(category) {
      // Standardise format to the form 'categoryName' instead of 'category Name'
      let formattedCategory = category.split(" ").join("");
      return this.categoryImages[formattedCategory];
    },
    getCategories() {
      // Create an array of all the available categories for contacts from the data returned from API call
      this.categories = [...new Set(this.contacts.map((obj) => obj.category))];
    },
    formatTelephoneNumber(telephoneNumber) {
      const formatter = (accumulator, currentValue, currentIndex) => {
        if (currentIndex === 1 || currentIndex === 4 || currentIndex === 7) {
          currentValue += "-";
        }
        return accumulator + currentValue;
      };
      return telephoneNumber.split("").reduce(formatter);
    },
  },
  computed: {
    slicedContactArray() {
      // Set homepage (default page) to 1, that is, pageNumber === 1] when this.$route.query.page === undefined
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
    this.getCategories();
    this.filterContacts(this.$route.params.category);
  },
  watch: {
    // Watch for changes to the filteredContactsArr and send its length to the parent element https://vuejs.org/v2/api/#watch and https://medium.com/@hvekriya/pass-data-from-child-to-parent-in-vue-js-b1ff917f70cc
    filteredContactsArr(val) {
      this.$emit("contacts-count", val.length);
    },
    // Watch for change in category parameter in order to trigger : https://forum.vuejs.org/t/when-is-watch-route-called/60696
    "$route.params.category": function (category) {
      this.filterContacts(category);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contact-link {
  color: inherit;
  text-decoration: none;
}

.contact-link:hover {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
.card {
  margin-bottom: 20px;
  width: 100%;
}

.card-footer {
  display: flex;
  align-content: center;
  justify-content: space-around;
  background-color: var(--highlight-three);
}

#filter-div {
  margin-bottom: 1.5rem;
}
</style>