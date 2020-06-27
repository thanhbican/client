<template>
  <div>
    <v-card class="mx-auto" :class="smAndDown?'mt-8':'mt-16'" max-width="1050" elevation="0">
      <v-row>
        <v-breadcrumbs
          disabled
          :items="[
            {
              text: 'Cart',
              disabled: false,
              to: '/cart'
            },
            {
              text: 'Checkout',
              disabled: this.getCartLength <= 0 ? true : false,
              to: '/shipmentDetails'
            }
          ]"
        ></v-breadcrumbs>
      </v-row>
      <v-row>
        <v-card elevation="0" max-width="100%" class="mx-auto">
          <v-card-title>
            Shopping Cart
          </v-card-title>
          <div v-for="product in getCart" :key="product._id">
            <v-row justify="center" align="center" :class="smAndDown?'ml-3':''">
              <v-col cols="6" lg="2">
                <v-img height="" :src="product.photo[0]" contain></v-img>
              </v-col>
              <v-col cols="6" lg="3">{{ product.title }}</v-col>
              <v-col cols="6" lg="2">{{ product.price | moneyFilter }}</v-col>
              <v-col cols="6" lg="2">
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
                  @keyup="onchangeQuantity($event, product)"
                />
              </v-col>
              <v-col cols="6" lg="2">{{
                (product.price * product.quantity) | moneyFilter
              }}</v-col>

              <v-col cols="6" lg="1">
                <vs-button
                  @click="openConfirm(product)"
                  color="warning"
                  type="gradient"
                  >X</vs-button
                >
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
        </v-card>
      </v-row>
    </v-card>
    <!-- navigation -->
    <v-footer max-width="1050" :width="this.$vuetify.breakpoint.lgAndUp?1050:''" class="mx-auto" padless>
      <v-card class="mx-auto text-right" width="1050" elevation="0">
        <div class="text--primary">
          <v-row justify="center" align="center" style="height: 80px">
            <v-col cols="3" lg="7"></v-col>
            <v-col cols="7" lg="4">
              <v-text-field
                v-model="discount"
                placeholder="Nhập mã giảm giá ở đây"
                :hint="`${sale * 100}%`"
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="2" lg="1" style="height:80px">
              <v-icon v-if="sale !== 0" color="teal" dark
                >mdi-checkbox-marked-circle</v-icon
              >
              <v-icon v-else color="red darken-2" dark right>mdi-cancel</v-icon>
            </v-col>
          </v-row>
        </div>
        <!-- <v-row>
            <v-col cols="7"></v-col>
            <v-col cols="5"><v-divider inset></v-divider></v-col>
          </v-row> -->
        <v-card-text class="text--primary">
          <v-row justify="center" align="center">
            <v-col cols="7" v-if="!smAndDown"></v-col>
            <v-col cols="6" lg="2">
              <div>Tổng ({{ getCartLength }} sản phẩm):</div>
            </v-col>
            <v-col cols="6" lg="3">
              <div v-if="sale == 0" style="font-size: 1.5rem">
                {{ (getTotal * (1 - sale)) | moneyFilter }}
              </div>
              <div v-else style="font-size: 1.5rem">
                <div
                  class="text-decoration-line-through"
                  style="font-size: 1rem"
                >
                  {{ getTotal | moneyFilter }}
                </div>
                {{ (getTotal * (1 - sale)) | moneyFilter }}
              </div>
            </v-col>
          </v-row>

          <v-row justify="center" align="center">
            <v-col cols="12">
              <v-btn
                to="/shipmentDetails"
                :disabled="getCartLength <= 0"
                x-large
                color="teal white--text"
                >Go to Checkout</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "none",
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
      smAndDown: this.$vuetify.breakpoint.smAndDown,
      bottomNav: true,
      //skeleton
      loading: true,
      //notify
      colorAlert: "teal",
      activeConfirm: false,
      //discount
      discount: "",
      sale: 0,
      //breadcrumbs
    };
  },
  computed: {
    ...mapGetters(["getCart", "getTotal", "getCartLength", "getTotalSave"])
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
      this.$store.commit("changeTotalSave", this.sale);
    }
  },
  methods: {
    onclickQuantity(event, product) {
      let stockQuantity = parseInt(product.stockQuantity);
      if (event.target.value < 1) event.target.value = 1;
      if (event.target.value > stockQuantity)
        event.target.value = stockQuantity;
      let quantity = parseInt(event.target.value);
      this.$store.commit("changeQuantity", { product, quantity });
    },
    onchangeQuantity(event, product) {
      let stockQuantity = parseInt(product.stockQuantity);
      if (event.target.value < 1) event.target.value = 0;
      if (event.target.value > stockQuantity)
        event.target.value = stockQuantity;
      let quantity = parseInt(event.target.value);
      this.$store.commit("changeQuantity", { product, quantity });
    },
    openConfirm(product) {
      this.$vs.dialog({
        type: "confirm",
        color: "orange",
        title: `Bạn chắc chắn muốn bỏ sản phẩm này?`,
        text: product.title,
        accept: this.acceptAlert,
        parameters: product
      });
    },
    acceptAlert(parameters) {
      this.$vs.notify({
        color: this.colorAlert,
        title: "Đã xóa thành công",
        text: ""
      });
      this.$store.commit("removeProduct", parameters);
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
  mounted() {
    this.$store.commit("changeTotalSave", 0);
    this.loading = false;
  }
};
</script>

<style scoped>
.row{
  width: 100%
}
.centered-input >>> input {
  text-align: center;
}
.centered-input >>> .v-input__slot {
  width: 70px;
}
.skeletonMain >>> .v-skeleton-loader__image {
  height: 400px;
  border-radius: 0;
}
</style>
