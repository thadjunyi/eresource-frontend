<template>
  <v-app-bar
    color="primary"
    dark
    flat
    fixed
    height="50px"
  >
    <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <router-link to="/">
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>

      <v-toolbar-title>E Resource Access System</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link to="/search">
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </router-link>

      <!--<router-link to="/document">
        <v-btn icon>
          <v-icon>mdi-file-document</v-icon>
        </v-btn>
      </router-link>-->

      <router-link to="/audio">
        <v-btn icon>
          <v-icon>mdi-music-note</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/video">
        <v-btn icon>
          <v-icon>mdi-television-play</v-icon>
        </v-btn>
      </router-link>

      <!--
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      -->
    </v-toolbar>
  </v-app-bar>
</template>

<style scoped>
  li a {
    text-decoration: none;
  }
</style>