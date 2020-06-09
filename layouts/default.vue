<template>
  <v-app>
    <v-content>
      <toolbar />
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import toolbar from "@/components/toolbar";
export default {
  components: {
    toolbar
  }
};
</script>
<style scoped>
#app{
  font-family: "Helvetica", sans-serif;
  /* font-family: 'Open Sans', arial; */
}
</style>
