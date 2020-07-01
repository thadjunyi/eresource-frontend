<template>
  <v-container >
    <v-row class="search-icon" justify="center">
      <v-img
        :src="require('../assets/search.png')"
        aspect-ratio="1"
        class="my-3"
        contain
        height="150"
      >
      </v-img>
    </v-row>
    <v-row class="search-text" align="center" justify="center">
      <v-col>
        <form>
          <v-text-field
            label="Enter your search here"
            single-line
            outlined
            rounded
            @keydown.enter="search"
            append-icon="mdi-magnify"
            v-model="searchText"
            class="shrink"
          >
          </v-text-field>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  name: "HomeComponent",
  methods: {
    search() {
      this.$router.push({ name:'Search', query: { text: this.searchText } });
    }
  },
  data: () => ({
    searchText: ''
  })
};
</script>

<style>
  .search-icon {
    padding-top:100px;
  }
  .search-text {
    padding-top:30px;
  }
</style>