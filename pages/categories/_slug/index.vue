<template>
  <div>
    <v-card class="mx-auto mt-5" :max-width="numberLength" elevation="0">
      <v-row>
        <v-btn class="text-h4" text disabled>{{categories.type}}</v-btn>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="10">
          <div class="d-flex">
            <v-btn disabled text>Hiển thị</v-btn>
            <v-btn text @click="forProduct" :class="{'red--text': selected}" >4</v-btn>
            <v-btn text @click="sixProduct" :class="{'red--text': !selected}">6</v-btn>
          </div>
        </v-col>
        <v-col cols="2">
          <v-select
            :items="items"
            label="Sắp xếp"
            item-value="name"
            item-text="name"
            filled
            @change="test"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-card elevation="0" width="100%" class="mx-auto">
          <v-row>
            <v-col
              :cols="numberProduct"
              v-for="(product, index) in products"
              :key="index"
            >
              <vs-card actionable>
                <v-card
                  class="text-center"
                  outlined
                  @click="checkRoute(product._id)"
                >
                  <v-img :src="product.photo" contain> </v-img>
                  <v-card class="rounded-xl ma-5" outlined color="">
                    <v-card-title
                      class="mt-4 item-title d-block text-subtitle-2"
                    >
                      {{ product.title }}
                    </v-card-title>
                    <!-- <v-card-subtitle
                        style="color:#CCC7FF"
                        class="text-subtitle-1 ml-5"
                      >
                        Grape Fruit
                      </v-card-subtitle> -->
                    <v-card-title class="">
                      <div style="width: 100%">
                        <div class="red--text ">
                          {{ product.price | moneyFilter }}
                        </div>
                        <div>
                          <v-btn
                            small
                            color="orange"
                            @click="addProduct(product)"
                          >
                            <v-icon small color="white">mdi-cart</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-card>
              </vs-card>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  async asyncData({ $axios, params }) {
    let categories = $axios.$get(`/api/categories/${params.slug}`);
    let products = $axios.$get(`/api/productOfCategory/${params.slug}`);
    const [categoriesResponse, productsResponse] = await Promise.all([
      categories,
      products
    ]);
    return {
      categories: categoriesResponse.categories,
      products: productsResponse.products
    };
  },
  data() {
    return {
      selected: true,
      numberLength: 1050,
      numberProduct: 3,
      loading: true,
      items: [
        { name: "Giá thấp dần", action: this.moneyA },
        { name: "Giá cao dần", action: this.moneyD },
        { name: "Bán chạy nhất", action: this.nameA }
      ],
      radios: ""
    };
  },
  methods: {
    ...mapActions(["addProductToCart"]),
    checkRoute(id) {
        this.$router.push(`/product/${id}`);
    },
    moneyA() {
      this.products.sort((a, b) => a.price - b.price);
    },
    moneyD() {
      this.products.sort((a, b) => b.price - a.price);
    },
    nameA() {
      this.products.sort((a, b) => {
        return a.title.localeCompare(b.title, "vi");
      });
    },
    nameD() {
      this.products.sort((a, b) => {
        return b.title.localeCompare(a.title, "vi");
      });
    },
    addProduct(product) {
      let prod = this.getCart.find(prod => prod._id === product._id);
      if (prod === undefined) {
        this.addProductToCart(product) &&
          this.$vs.notify({
            title: "Đã thêm",
            text: product.title,
            color: "success"
          });
      } else if (prod.quantity < prod.stockQuantity) {
        this.addProductToCart(product) &&
          this.$vs.notify({
            title: "Đã thêm",
            text: product.title,
            color: "success"
          });
      } else {
        this.addProductToCart(product) &&
          this.$vs.notify({
            title: "Lỗi",
            text: "Kho hàng của sản phẩm không đủ",
            color: "danger"
          });
      }
    },
    forProduct() {
      this.numberLength = 1050;
      this.numberProduct = 3;
      this.selected =! this.selected;
    },
    sixProduct() {
      this.numberLength = 1450;
      this.numberProduct = 2;
      this.selected =! this.selected;
    },
    test(a) {
      let item = this.items.find(item => item.name === a);
      item.action();
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
  computed: {
    ...mapGetters(["getCart"])
  },
  mounted() {
    this.loading = false;
  }
};
</script>

<style scoped>
/* item */
.item-title {
  padding: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cardCustom >>> .vs-card--content {
  font-size: 0.8rem;
  margin-bottom: 0px;
}
/* skeleton */
.skeleton >>> .v-skeleton-loader__image {
  height: 500px;
  border-radius: 0;
}
.skeletonMain >>> .v-skeleton-loader__image {
  height: 400px;
  border-radius: 0;
}
.theme--light.v-sheet--outlined {
  border: none !important;
}
.theme--light.v-btn.v-btn--disabled {
  color: black !important;
}
</style>
