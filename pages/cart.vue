<template>
  <div>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="7">
        <v-card
          elevation="0"
          max-width="1450"
          class="mx-auto"
          style="border-radius: 50px"
        >
          <v-card-title>
            Shopping Cart
          </v-card-title>
          <div v-for="product in getCart" :key="product._id">
            <v-row justify="center" align="center">
              <v-col cols="2">
                <v-img height="150" :src="product.photo"></v-img>
              </v-col>
              <v-col cols="3">{{ product.title }}</v-col>
              <v-col cols="2">{{ product.price | moneyFilter }}</v-col>
              <v-col cols="2">
                <v-text-field
                  :value="product.quantity"
                  type="number"
                  class="centered-input mt-7"
                  outlined
                  min="1"
                  :max="product.stockQuantity"
                  :hint="`stock: ${product.stockQuantity}`"
                  persistent-hint
                  @click="onclickQuantity($event, product)"
                  @change="onchangeQuantity($event, product)"
                />
              </v-col>
              <v-col cols="2">{{
                (product.price * product.quantity) | moneyFilter
              }}</v-col>

              <v-col cols="1">
                <vs-button
                  @click="openConfirm(product)"
                  color="success"
                  type="gradient"
                  >X</vs-button
                >
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
          <div>
            <v-row justify="center" align="center">
              <v-col cols="9"></v-col>
              <v-col cols="3">
                <font color="#aaaeb1" style="font-size: 1rem"
                  >Order ({{ getCartLength }} items)
                </font>
                <font style="font-size: 1.5rem">
                  {{ getTotal | moneyFilter }}
                </font>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          elevation="0"
          max-width="1450"
          class="mx-auto text-left"
          style="border-radius: 50px; position: fixed"
        >
          <v-card-title>Order Summary</v-card-title>
          <v-card-text class="text--primary">
            <div>Apply Promo Code</div>
            <v-row justify="center" align="center">
              <v-col cols="8">
                <v-text-field
                  v-model="discount"
                  placeholder="Enter your promo code here"
                  outlined
                  hint="One code per order"
                  persistent-hint
                >
                </v-text-field>
              </v-col>
              <v-col cols="4" style="height:80px">
                <v-icon v-if="sale !== 0" color="green darken-2" dark
                  >mdi-checkbox-marked-circle</v-icon
                >
                <v-icon v-else color="red darken-2" dark right
                  >mdi-cancel</v-icon
                >
              </v-col>
            </v-row>
            <v-row justify="center" align="center">
              <v-col cols="6">
                <div>Order Value:</div>
              </v-col>
              <v-col cols="6">
                <div>{{ getTotal | moneyFilter }}</div>
              </v-col>
            </v-row>
            <v-row justify="center" align="center">
              <v-col cols="6">
                <div>Saving:</div>
              </v-col>
              <v-col cols="6">
                <div>{{ (getTotal * sale) | moneyFilter }}</div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider inset style="width: 270px"></v-divider>
          <v-card-text class="text--primary">
            <v-row justify="center" align="center">
              <v-col cols="5">
                <div>Subtotal:</div>
              </v-col>
              <v-col cols="7">
                <div class="ml-7" style="font-size: 1.5rem">
                  {{ (getTotal * (1 - sale)) | moneyFilter }}
                </div>
              </v-col>
            </v-row>
            
            
            <v-row justify="center" align="center">
              <v-col cols="12">
                <v-btn x-large color="success" dark>Checkout</v-btn>
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
export default {
  async asyncData({ $axios }) {
    try {
      let responses = await $axios.$get("/api/discounts");
      return {
        discounts: responses.discounts
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      colorAlert: "success",
      activeConfirm: false,
      //discount
      discount: "",
      sale: 0
    };
  },
  computed: {
    ...mapGetters(["getCart", "getTotal", "getCartLength"])
  },
  watch: {
    discount(newValue, oldValue) {
      let check = this.discounts.find(
        dis => dis.name.toLowerCase() === this.discount.toLowerCase()
      );
      if (check === undefined) {
        this.sale = 0;
      } else {
        this.sale = check.sale;
      }
    }
  },
  methods: {
    onclickQuantity(event, product) {
      let quantity = parseInt(event.target.value);
      this.$store.commit("changeQuantity", { product, quantity });
    },
    onchangeQuantity(event, product) {
      event = parseInt(event);
      let stockQuantity = parseInt(product.stockQuantity);
      if (event < 1) event = 1;
      if (event > stockQuantity) event = stockQuantity;
      let quantity = event;

      this.$store.commit("changeQuantity", { product, quantity });
    },
    openConfirm(product) {
      this.$vs.dialog({
        type: "confirm",
        color: "success",
        title: `Bạn chắc chắn muốn bỏ sản phẩm này?`,
        text: product.title,
        accept: this.acceptAlert,
        parameters: product
      });
    },
    acceptAlert(parameters) {
      this.$vs.notify({
        color: this.colorAlert,
        title: "Deleted successfully",
        text: ""
      });
      this.$store.commit("removeProduct", parameters);
    }
    // checkDiscount() {
    //   let check = this.discounts.find(
    //     dis => dis.name.toLowerCase() === this.discount.toLowerCase()
    //   );
    //   if (check === undefined) {
    //     this.sale = 0;
    //   } else {
    //     this.sale = check.sale;
    //   }
    //   console.log(this.sale);
    // }
  },
  filters: {
    moneyFilter: function(money = 0) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(money);
    }
  }
};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
.centered-input >>> .v-input__slot {
  width: 70px;
}
</style>
