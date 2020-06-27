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

    <v-footer
      max-width="1050"
      :width="this.$vuetify.breakpoint.lgAndUp ? 1050 : ''"
      class="mx-auto"
      padless
    >
      <v-card class="flex" tile>
        <v-card-title>
          <v-row>
            <v-col cols="12" lg="8">
              <strong class="subheading text-break"
                >Kết nối với chúng tôi trên mạng xã hội</strong
              >
            </v-col>
            <v-col cols="12" lg="4"> 
              <v-btn
                :href="icon.link"
                color="teal"
                v-for="icon in icons"
                :key="icon.icon"
                class="mx-4"
                icon
              >
                <v-icon size="24px">{{ icon.icon }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text class="py-2 text-center">
          {{ new Date().getFullYear() }} — <strong>TheFaceShop </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import toolbar from "@/components/toolbar";

export default {
  data() {
    return {
      smAndDown: this.$vuetify.breakpoint.smAndDown,
      fab: false,
      icons: [
        {
          icon: "mdi-facebook",
          link: "https://www.facebook.com/thegioikorean/"
        },
        {
          icon: "mdi-twitter",
          link: "https://www.facebook.com/thegioikorean/"
        },
        {
          icon: "mdi-linkedin",
          link: "https://www.facebook.com/thegioikorean/"
        },
        {
          icon: "mdi-instagram",
          link: "https://www.facebook.com/thegioikorean/"
        }
      ]
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
