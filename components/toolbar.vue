<template>
  <div>
    <v-app-bar color="white" flat fixed app>
      <v-row class="" justify="center" align="center">
        <v-col cols="4" class="text-right">
          <v-btn to="/a" text color="#140f12" class="display-2">
            thefaceshop</v-btn
          >

          <v-divider class="mx-7" inset vertical></v-divider>

        </v-col>
        <v-col cols="4"></v-col>
        <v-col cols="4" class="text-left">
          <v-btn text class="text-capitalize">
            <v-icon>mdi-magnify</v-icon>
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
  </div>
</template>

<script>
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
      console.log("123");
      this.$router.push("/profile");
    },
    async onLogout() {
      await this.$auth.logout();
    }
  }
};
</script>

<style scoped>
.btn--icon .avatar img {
  height: 36px;
  width: 36px;
}
</style>
