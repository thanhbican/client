<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar color="white" fixed app flat style="height:80px">
        <v-row class="" justify="center" align="center">
          <v-col cols="3.5" class="text-right">
            <v-btn text color="#140f12" large class="logo text-none" @click="()=>this.$router.push(`/`)"
              >thefaceshop</v-btn
            >

            <v-divider class="mx-7" inset vertical></v-divider>
          </v-col>
          <v-col cols="5">
            <v-text-field
              class="inputSearch"
              outlined
              placeholder="Search for items, categories"
              append-icon="mdi-magnify"
              style="height: 40px; "
            ></v-text-field>
          </v-col>
          <v-col cols="3.5" class="text-center">
            <v-btn
              color="orange"
              class="white--text"
              to="/cart"
            >
              {{getCartLength}}
              <v-icon>mdi-cart</v-icon>
              
            </v-btn>
            
            <v-menu offset-y v-if="$auth.$state.loggedIn">
              <template v-slot:activator="{ on }">
                <v-btn text class="text-capitalize" v-on="on">
                  Hello, {{ $auth.$state.user.name }}
                  <v-icon>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list class="text-center">
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="item.to"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-btn v-else text class="text-capitalize" to="/login">
              Sign In
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      //menu-down
      items: [
        { title: "Profile", to: this.goProfile },
        { title: "Logout", to: this.onLogout }
      ]
    };
  },
  methods: {
    goProfile() {
      this.$router.push("/profile");
    },
    async onLogout() {
      await this.$auth.logout();
    }
  },
  computed: {
    ...mapGetters(["getCartLength"])
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
</style>
