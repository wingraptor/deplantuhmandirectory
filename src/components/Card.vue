<template>
  <!-- <div
      class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center"
      v-for="(contact) in slicedContactArray"
      :key="contact.name"
  >-->
  <!-- https://stackoverflow.com/questions/45341169/bootstrap-vue-card-component-image-doesnt-render -->
  <!-- Disable the automatic <b-card-body> section (and associated padding) by setting the prop no-body on the <b-card>. https://bootstrap-vue.org/docs/components/card#cards-->
  <b-card no-body class="shadow">
    <!-- Card Image -->
    <a :href="'/contact/'+ contact.id" class="contact-link">
      <b-card-img :src="contact.logoUrl || getImage(contact.category)" top class="rounded-0"></b-card-img>
    </a>
    <!-- Card Body -->
    <b-card-body>
      <a :href="'/contact/'+ contact.id" class="contact-link">
        <!-- Title -->
        <b-card-title>{{contact.name}}</b-card-title>
        <!-- Category Badgfe -->
        <a :href="'/category/'+ contact.category">
          <b-card-sub-title class="pb-3 pt-1">{{contact.category}}</b-card-sub-title>
        </a>
        <!-- Card Text -->
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
  <!-- </div> -->
</template>

<script>
export default {
  name: "Card",
  props: ["contact"],
  data() {
    return {
      categories: [],
      iconScale: "1.5",
      categoryImages: {
        Organisation: "https://i.imgur.com/CmUEPeSh.jpg",
        Business: "https://i.imgur.com/MJt6VD3h.jpg",
        Freighting: "https://i.imgur.com/yEXo2B8h.jpg",
        Farm: "https://i.imgur.com/4dBKaIah.jpg",
        AgriculturalSupplies: "https://i.imgur.com/LEwmNIFh.jpg",
        SoilAndAmmendments: "https://i.imgur.com/Q8uxEwLh.jpg",
        Restaurant: "https://i.imgur.com/0v0L5rNh.png",
        Expertise: "https://i.imgur.com/h2mEK2uh.jpg",
      },
    };
  },
  methods: {
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
    // Set telephone format to: "+1-xxx-yyy-zzzz"
    formatTelephoneNumber(telephoneNumber) {
      // Callback function for reduce method
      const formatter = (accumulator, currentValue, currentIndex) => {
        if (currentIndex === 1 || currentIndex === 4 || currentIndex === 7) {
          currentValue += "-";
        }
        return accumulator + currentValue;
      };

      // Check to see that telephone number is there, if not return undefined.
      if (telephoneNumber) {
        return telephoneNumber.split("").reduce(formatter);
      } else {
        return undefined;
      }
    },
  },
  mounted() {
  },
  watch: {
    // Watch for changes to the filteredContactsArr and send its length to the parent element https://vuejs.org/v2/api/#watch and https://medium.com/@hvekriya/pass-data-from-child-to-parent-in-vue-js-b1ff917f70cc
    contact(val) {
      console.log(val)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: var(--highlight-two);
}

a:hover {
  color: var(--highlight-two-darker);
}

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

.card-img-top {
  max-height: 200px;
  /* max-width: 300px; */
}

.card-footer {
  display: flex;
  align-content: center;
  justify-content: space-around;
  background-color: var(--highlight-three);
}
</style>