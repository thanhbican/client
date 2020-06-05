<template>
  <v-container class="mx-auto text-center">
    <v-btn to="/" icon text class="red--text text-capitalize my-7">
      <v-avatar to="/">
        <img
          src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.0-9/65797096_2783829511632301_4001421631531515904_n.png?_nc_cat=110&_nc_sid=85a577&_nc_ohc=ZsgLQsSEHr0AX8zEzse&_nc_ht=scontent.fsgn5-3.fna&oh=4fee49bc856217b98ecf125ef87c14fc&oe=5EFA235F"
          alt="avatar"
        />
      </v-avatar>
      TheFaceShop</v-btn
    >
    <v-card class="mx-auto" max-width="366" outlined>
      <v-card-text class="title text-left">
        Create account
      </v-card-text>
      <ValidationObserver ref="form">
        <form>
          <!-- Your Name -->
          <ValidationProvider v-slot="{ errors }" name="name" rules="">
            <v-text-field
              class="mx-4"
              v-model="name"
              label="Your name"
              clearable
              :error-messages="errors"
              outlined
            ></v-text-field>
          </ValidationProvider>
          <!-- Email -->
          <ValidationProvider
            v-slot="{ errors }"
            name="email"
            rules="required||email"
          >
            <v-text-field
              class="mx-4"
              v-model="email"
              label="Email"
              clearable
              :error-messages="errors"
              outlined
            ></v-text-field>
          </ValidationProvider>
          <!-- Password -->
          <ValidationProvider
            v-slot="{ errors }"
            name="Password"
            :rules="{
              required: true,
              min: 6,
              regex: /^(?=.*[a-z])(?=.*[0-9])/
            }"
          >
            <v-text-field
              class="mx-4 mb-2"
              v-model="password"
              label="Password"
              clearable
              :error-messages="errors"
              outlined
              hint="Password must be 6 characters including number and character"
              persistent-hint
            ></v-text-field>
          </ValidationProvider>
          <v-btn
            class="custom-transform-class text-none green accent-1"
            @click="onSignup"
          >
            Create your TheFaceShop account
          </v-btn>
          <v-divider class="my-6"></v-divider>
          <v-card-subtitle class="subtitle-2 text-left black--text">
            Already have an account?

            <nuxt-link to="/login">Sign in</nuxt-link>
          </v-card-subtitle>
        </form>
      </ValidationObserver>
    </v-card>
  </v-container>
</template>

<script>
import { required, min, email, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
extend("min", {
  ...min,
  message:
    "{_field_} password must be 6 characters including number and character"
});
extend("email", {
  ...email,
  message: "{_field_} must be a valid email"
});
extend("regex", {
  ...regex,
  message:
    "{_field_} password must be 6 characters including number and character"
});
export default {
  middleware: "auth",
  auth: "guest",
  layout: "none",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      password: "",
      email: "",
      name: ""
    };
  },
  methods: {
    async onSignup() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        let response = await this.$axios.$post("/api/auth/signup", data);
        if (response.success) {
          this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          });
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
