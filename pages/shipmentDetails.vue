<template>
  <div>
    <v-card class="mx-auto" max-width="1030" elevation="0">
      <v-row>
        <v-breadcrumbs disabled :items="items"></v-breadcrumbs>
      </v-row>

      <v-row>
        <v-col cols="12" lg="8">
          <v-card elevation="0" width="100%" class="mx-auto">
            <v-card-title>
              Shipment Details
            </v-card-title>
            <ValidationObserver ref="form">
              <form>
                <v-row justify="center" align="center">
                  <v-col cols="6" lg="5">
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
                  <v-col cols="6" lg="7">
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
                        v-model="address"
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
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Note"
                      rules=""
                    >
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

        <v-col cols="12" lg="4">
          <v-card-title>Checkout</v-card-title>
          <v-card-text class="text--primary"> </v-card-text>
          <v-card-text class="text--primary">
            <v-row justify="center" align="center">
              <v-col cols="4">
                <div>Subtotal:</div>
              </v-col>
              <v-col cols="8">
                <div class="ml-7" style="font-size: 1.5rem">
                  {{ getTotalSave | moneyFilter }}
                </div>
              </v-col>
            </v-row>

            <v-row justify="center" align="center">
              <v-col cols="12">
                <v-btn @click="onCheckout" x-large color="teal">Checkout</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
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
      address: "",
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
    ...mapGetters([
      "getCart",
      "getTotal",
      "getTotalSave",
      "getSale",
      "getCartLength"
    ])
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
      ((await this.$refs.form.validate()) && this.onPostData()) ||
        this.$vs.notify({
          title: "Vui Lòng nhập thông tin",
          color: "danger",
          time: 5000
        });
    },
    async onPostData() {
      try {
        if (this.getTotalSave === 0) {
          this.$router.push("/");
        } else {
          let cart = [];
          this.getCart.map(x => {
            delete x["category"];
            delete x["description"];
            delete x["stockQuantity"];
            delete x["photo"];
            delete x["__v"];
          });

          let stockQ = this.$axios.$put(
            "/api/productsStockQuantity",
            this.getCart
          );
          let prodSold = this.$axios.$put("/api/productsSold", this.getCart);
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

          let order = this.$axios.$post("/api/orders", data);

          let [response] = await Promise.all([stockQ, prodSold,order]);
          console.log(response)
          if (response.success) {
            this.$vs.notify({
              title: "Đặt hàng thành công",
              text: "Chúng tôi sẽ liên hệ bạn",
              color: "teal",
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
  },
  updated() {
    if (this.getCartLength <= 0) this.$router.push("/");
  }
};
</script>

<style scoped></style>
