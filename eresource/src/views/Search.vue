<template>
  <div class="search">
    <SearchComponent />
    <StarRating />
  </div>
</template>

<script>
/* eslint-disable */
import SearchComponent from "@/components/SearchComponent.vue";

export default {
  name: "Search",
  components: {
    SearchComponent
  }
};  
</script>
