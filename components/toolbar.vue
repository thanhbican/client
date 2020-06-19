<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar color="white" fixed app flat style="height:80px">
        <v-row class="" justify="center" align="center">
          <v-col cols="3.5" class="text-right">
            <v-btn
              style="font-size: 2rem; letter-spacing: 0.5px;"
              text
              @click="() => this.$router.push(`/`)"
            >
              The Face Shop
            </v-btn>
            <v-divider class="mx-7" inset vertical></v-divider>
          </v-col>
          <v-col cols="5">
            <v-text-field
              class="inputSearch"
              outlined
              placeholder="Search for items, categories"
              append-icon="mdi-magnify"
              style="height: 45px; "
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="3.5" class="text-center">
            <v-btn color="orange" class="white--text" to="/cart">
              {{ getCartLength }}
              <v-icon>mdi-cart</v-icon>
            </v-btn>

            <v-btn text color="" @click="drawer = !drawer">
              <v-icon large>mdi-widgets</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>
    </v-card>

    <!-- navigation -->
    <v-navigation-drawer v-model="drawer" temporary app right>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTemrUGDUV8rIC3SJuxQJfpJ9QJi9zzaxm80UX3yd1G4m6YrXGB&usqp=CAU"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Danh Mục</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in categories" :key="item.type" link>
          <v-list-item-content @click="link(item.slug)">
            <v-list-item-title>{{item.type}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  async mounted() {
    let response = await this.$axios.$get("/api/categories");
    this.categories = response.categories;
  },
  data() {
    return {
      drawer: null,
      categories: []
    };
  },
  methods: {
    goProfile() {
      this.$router.push("/profile");
    },
    async onLogout() {
      await this.$auth.logout();
    },
    link(slug){
      this.$router.push(`/categories/${slug}`)
    }
  },
  computed: {
    ...mapGetters(["getCartLength"])
  }
};
</script>

<style scoped>
.btn--icon .avatar img {
  height: 36px;
  width: 36px;
}
.logo {
  font-family: "Helvetica Rounded Bold";
  font-size: 2.5rem;
  letter-spacing: 0px;
}
.inputSearch >>> .v-input__slot {
  color: #f8f8f8;
  background-color: #f8f8f8;
  border-radius: 15px;
}
</style>
