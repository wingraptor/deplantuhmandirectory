<template>
  <div class="searchComponent--div">
    <autocomplete
      :search="search"
      :get-result-value="getResultValue"
      @submit="handleSubmit"
      placeholder="Search for contact "
      aria-label="Search for contact"
    >
      <template #result="{ result, props }">
        <li v-bind="props" class="autocomplete-result contact-result">
          <h4 class="contact-title text-dark mb-2">{{ result.name }}</h4>
          <h6 class="contact-category">{{result.category}}</h6>
          <p class="contact-description text-muted">{{result.description}}</p>
        </li>
      </template>
    </autocomplete>
  </div>
</template>

<script>
export default {
  name: "searchbar",
  props: ["contacts"],
  data() {
    return {};
  },
  methods: {
    search(input) {
      if (input.length < 1) {
        return [];
      }
      return this.contacts.filter((contact) => {
        // Filter contacts for contacts that have the searched name or searched category
        return (
          contact.name.toLowerCase().startsWith(input.toLowerCase()) ||
          contact.category.toLowerCase().startsWith(input.toLowerCase())
        );
      });
    },
    getResultValue(result) {
      // Show contact name and contact category when matched results are found
      return `${result.name} - ${result.category}`;
    },
    // On click of searched contact, take user to that contact's page
    handleSubmit(result) {
      this.$router.push(`/contact/${result.id}`);
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.autocomplete-result.contact-result {
  border-top: 1px solid #eee;
  padding: 16px;
  background: transparent;
  cursor: pointer;
}

.contact-category {
  color: #506c64;
  font-weight: bold;
}

</style>