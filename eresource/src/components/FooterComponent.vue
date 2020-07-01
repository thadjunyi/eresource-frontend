<template>
  <v-bottom-navigation
    dark
    fixed
    height="50px"
  >
      <router-link to="/search">
        <v-btn> 
          <span>Search</span>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </router-link>
      
      <!--<router-link to="/document">
        <v-btn>
          <span>Document</span>
          <v-icon>mdi-file-document</v-icon>
        </v-btn>
      </router-link>-->

      <router-link to="/audio">
        <v-btn>
          <span>Audio</span>
          <v-icon>mdi-music-note</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/video">
        <v-btn>
            <span>Video</span>
            <v-icon>mdi-television-play</v-icon>
        </v-btn>
      </router-link>

  </v-bottom-navigation>
</template>
