<template>
  <div>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="6">
        <v-breadcrumbs :items="items"></v-breadcrumbs>

        <v-card
          elevation="0"
          max-width="1450"
          class="mx-auto"
          style="border-radius: 50px"
        >
          <v-card-title>
            Shipment Details
          </v-card-title>
          <ValidationObserver ref="form">
            <form>
              <v-row justify="center" align="center">
                <v-col cols="5">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Name"
                    rules="required"
                  >
                    <v-text-field
                      label="Name"
                      v-model="name"
                      outlined
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="7">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Phone"
                    rules="required|numeric|min:8"
                  >
                    <v-text-field
                      label="Phone Number"
                      v-model="phoneNumber"
                      outlined
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                <v-col cols="12">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Adress"
                    rules="required"
                  >
                    <v-text-field
                      label="Adress"
                      v-model="adress"
                      outlined
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="City"
                    rules="required"
                  >
                    <v-select
                      :items="cities"
                      item-text="name"
                      v-model="city"
                      label="City"
                      outlined
                      :error-messages="errors"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="District"
                    rules="required"
                  >
                    <v-select
                      label="District"
                      :items="districts"
                      outlined
                      :error-messages="errors"
                      v-model="district"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" name="Note" rules="">
                    <v-textarea
                      v-model="note"
                      outlined
                      auto-grow
                      label="Note"
                      rows="4"
                      row-height="30"
                      shaped
                      :error-messages="errors"
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
              </v-row></form
          ></ValidationObserver>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card
          elevation="0"
          max-width="1450"
          class="mx-auto text-left"
          style="border-radius: 50px; position: fixed"
        >
          <v-card-title>Checkout</v-card-title>
          <v-card-text class="text--primary"> </v-card-text>
          <v-divider inset style="width: 270px"></v-divider>
          <v-card-text class="text--primary">
            <v-row justify="center" align="center">
              <v-col cols="5">
                <div>Subtotal:</div>
              </v-col>
              <v-col cols="7">
                <div class="ml-7" style="font-size: 1.5rem">
                  {{ getTotalSave | moneyFilter }}
                </div>
              </v-col>
            </v-row>

            <v-row justify="center" align="center">
              <v-col cols="12">
                <v-btn @click="onCheckout" x-large color="success" dark
                  >Checkout</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, min, numeric } from "vee-validate/dist/rules";
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
  message: "{_field_} must be at least 8 characters"
});
extend("numeric", {
  ...numeric,
  message: "{_field_} may only contain numeric characters"
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/address");
      return {
        cities: response.address
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      name: "",
      phoneNumber: "",
      adress: "",
      city: null,
      districts: [],
      district: "",
      note: "",
      items: [
        {
          text: "Cart",
          disabled: false,
          to: "cart"
        },
        {
          text: "Checkout",
          disabled: false,
          to: "shipmentDetails"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getCart", "getTotal", "getTotalSave", "getSale"])
  },
  watch: {
    async city() {
      let response = await this.$axios.$get(`/api/address/${this.city}`);
      this.districts = response.district;
    }
  },
  filters: {
    moneyFilter: function(money = 0) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(money);
    }
  },
  methods: {
    async onCheckout() {
      (await this.$refs.form.validate()) && this.onPostData();
    },
    async onPostData() {
      try {
        if (this.getTotalSave === 0) {
          this.$router.push("/");
        } else {
          let cart = [];
          this.getCart.map(x => {
            delete x["rate"];
            delete x["owner"];
            delete x["category"];
            delete x["description"];
            delete x["stockQuantity"];
            delete x["photo"];
            delete x["__v"];
          });

          await this.$axios.$put("/api/productsStockQuantity", this.getCart);
          let data = {
            name: this.name,
            phoneNumber: this.phoneNumber,
            address: this.address,
            city: this.city,
            district: this.district,
            note: this.note,
            cart: this.getCart,
            sale: this.getSale,
            price: this.getTotalSave
          };
          let response = await this.$axios.$post("/api/orders", data);
          if (response.success) {
            this.$vs.notify({
              title: "Đặt hàng thành công",
              text: "Chúng tôi sẽ liên hệ bạn",
              color: "success",
              time: 5000
            });
            this.$store.commit("resetState");
            this.$router.push("/");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped></style>
