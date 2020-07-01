<template>
    <v-container>
        <v-row class="pagenotfound" justify="center">
            <v-img
            :src="require('../assets/pagenotfound.png')"
            aspect-ratio="1"
            class="my-3"
            contain
            height="300"
            >
            </v-img>
        </v-row>
    </v-container>
</template>

<script>
/* eslint-disable */
export default {
  name: "PageNotFound"
};
</script>

<style>
  .pagenotfound {
    padding-top:100px;
  }
</style>