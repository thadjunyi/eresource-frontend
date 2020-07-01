<template>
  <div id="app">
    <NavBarComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
/* eslint-disable */
import NavBarComponent from "@/components/NavBarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

console.log("You are connected.")

export default {
  name: "App",
  components: {
    NavBarComponent,
    FooterComponent
  },
  // devServer: {
  //   host: '172.18.3.73',
  //   port: 8080
  // }
};
</script>
