<template>
  <div>
    <v-card
      elevation="0"
      max-width="1450"
      class="mt-12 mx-auto"
      style="border-radius: 50px"
    >
      <v-card-title>
        Shopping Cart
      </v-card-title>
      <div v-for="product in getCart" :key="product._id">
        <v-row justify="center">
          <v-col cols="2"
            ><v-img height="200" :src="product.photo"></v-img
          ></v-col>
          <v-col cols="3">{{ product.title }}</v-col>
          <v-col cols="3">{{ product.price | moneyFilter }}</v-col>
          <v-col cols="1">
            <v-text-field
              :value="product.quantity"
              type="number"
              class="centered-input"
              outlined
              min="1"
              :max="product.stockQuantity"
              @click="onclickQuantity($event, product)"
              @change="onchangeQuantity($event, product)"
            />
          </v-col>
          <v-col cols="1">{{
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
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      colorAlert: "success",
      activeConfirm: false
    };
  },
  computed: {
    ...mapGetters(["getCart"])
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
      this.$store.commit("removeProduct",parameters)
    }
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
</style>
