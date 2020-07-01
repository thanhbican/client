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
        Sign In
      </v-card-text>
      <ValidationObserver ref="form">
        <form>
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
              :error-messages="errors"
              outlined
              autofocus
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
              :error-messages="errors"
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
              outlined
              hint="Password must be 6 characters including number and character"
              persistent-hint
            ></v-text-field>
          </ValidationProvider>
          <!-- recaptcha -->
          <recaptcha
            class="mx-4 mb-2"
            @error="onError"
            @success="onSuccess"
            @expired="onExpired"
          />
          <!-- button -->
          <v-btn
            class="custom-transform-class text-none green accent-1"
            :disabled="disabled"
            @click="onLogin"
          >
            Continue
          </v-btn>
          <v-divider class="my-6"></v-divider>
          <v-card-subtitle class="subtitle-2 text-left black--text">
            Don't have an account?

            <nuxt-link to="/signup">Signup</nuxt-link>
          </v-card-subtitle>
        </form>
      </ValidationObserver>
      <!-- overlay -->
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <!-- snackbar -->
      <v-snackbar :color="color" v-model="snackbar" :timeout="timeout" top>
        {{ text }}
        <v-btn v-if="color == 'error'" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
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
      name: "",
      value: true,
      // overlay
      overlay: false,
      // snackBar
      snackbar: false,
      color: "",
      text: "My timeout is set to 2000.",
      timeout: 5000,
      //button disabled
      disabled: true
    };
  },
  methods: {
    async onLogin() {
      (await this.$refs.form.validate()) && this.onSignin();
    },
    async onSignin() {
      try {
        const tokenRe = await this.$recaptcha.getResponse();
        this.overlay = true;
        await this.$recaptcha.reset();
        let data = {
          email: this.email,
          password: this.password,
          tokenRe: tokenRe
        };
        let response = await this.$axios.$post("/api/auth/login", data);
        if (response.success) {
          this.overlay = false;
          this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          });
          this.$router.push("/");
        } else {
          this.overlay = false;
          this.snackbar = true;
          this.color = "error";
          this.text = response.message;
        }
      } catch (err) {
        console.log(err);
      }
    },
    onError(error) {
      this.disabled = true
    },
    onSuccess(token) {
      this.disabled = false
    },
    onExpired() {
      this.disabled = true
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
