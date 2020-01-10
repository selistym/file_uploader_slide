<template>
  <v-app>
    <v-content>
      <ImageCliper />
    </v-content>
  </v-app>
</template>

<script>
import ImageCliper from "./components/ImageCliper";

export default {
  name: "App",

  components: {
    ImageCliper
  },

  data: () => ({
    //
  })
};
</script>
