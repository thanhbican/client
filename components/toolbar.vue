<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar color="white " flat :fixed="!smAndDown" :app="!smAndDown"  :height="smAndDown?250:0" >
          <v-row  justify="center" align="center">
          <v-col cols="12" sm="" md="" lg="3.5"  class="text-right">
            <v-btn
              style="font-size: 2rem; letter-spacing: 0.5px;"
              text
              @click="() => this.$router.push(`/`)"
            >
              The Face Shop
            </v-btn>
            <v-divider class="mx-7" inset vertical></v-divider>
          </v-col>
          <v-col cols="12" sm="" md="" lg="5">
            <v-autocomplete
              v-model="model"
              class="mt-5 autocomplete"
              :items="items"
              :search-input.sync="search"
              :loading="isLoading"
              item-text="title"
              item-value="slug"
              placeholder="Tìm kiếm"
              append-icon="mdi-database-search"
            >
              <template v-slot:selection="data">
                <v-chip v-bind="data.attrs" close @click:close="remove()">
                  <v-avatar left>
                    <v-img :src="data.item.photo[0]"></v-img>
                  </v-avatar>
                  {{ smAndDown?data.item.title.slice(0, 30):data.item.title.slice(0, 70) }}:...
                </v-chip>
              </template>
              <template v-slot:item="data">
                <div
                  class="d-flex justify-center align-center"
                  @click="checkRoute(data.item.slug)"
                  style="width: 100%; padding:0 16px"
                >
                  <v-list-item-avatar>
                    <img :src="data.item.photo[0]" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.title"
                    ></v-list-item-title>
                  </v-list-item-content>
                </div>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" class="text-center" sm="" md="" lg="3.5">
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
          <v-img
            src="https://res.cloudinary.com/thefaceshop/image/upload/v1593068478/logo/logo_ije97s.jpg"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Danh Mục</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in categories" :key="item.type" link>
          <v-list-item-content @click="link(item.slug)">
            <v-list-item-title class="ml-5">{{ item.type }}</v-list-item-title>
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
      smAndDown:this.$vuetify.breakpoint.smAndDown,
      isLoading: false,
      items: [],
      search: null,
      model: null,
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
    link(slug) {
      this.$router.push(`/categories/${slug}`);
    },
    checkRoute(slug) {
      this.$router.push(`/product/${slug}`);
    },
    remove() {
      this.model = "";
    }
  },
  computed: {
    ...mapGetters(["getCartLength"])
  },
  watch: {
    async search(val) {
      if (this.items.length > 0) return;
      if (this.isLoading) return;
      this.isLoading = true;

      let response = await this.$axios.$get(`/api/products/`);
      if (response.success) this.isLoading = false;
      this.items = response.products;
    }
  },
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
.v-list >>> .v-list-item {
  padding: 0 !important;
}
</style>
