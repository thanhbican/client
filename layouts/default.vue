<template>
  <v-app>
    <v-main>
      <toolbar />
      <nuxt />
    </v-main>
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="black"
      @click="toTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import toolbar from "@/components/toolbar";
export default {
  data() {
    return {
      fab: false
    };
  },
  components: {
    toolbar
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>
<style scoped>
#app {
  /* font-family: "Helvetica", sans-serif; */
  /* font-family: 'Open Sans', arial; */
}
</style>
