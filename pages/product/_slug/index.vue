<template>
  <div>
    <v-card elevation="0" max-width="1050" class="mx-auto ">
      <v-row>
        <v-col
          :class="smAndDown ? 'colCustom-12' : ''"
          cols="12"
          sm=""
          md=""
          lg="4"
        >
          <!-- swiper1 -->
          <div class="thumb-example">
            <swiper
              class="swiper gallery-top"
              :options="swiperOptionTop"
              ref="swiperTop"
            >
              <swiper-slide
                v-for="(photo, index) in product.photo"
                :key="index"
              >
                <v-card class="text-center" outlined>
                  <v-img :src="photo" contain> </v-img>
                </v-card>
              </swiper-slide>
              <div
                class="swiper-button-next swiper-button-white"
                slot="button-next"
              ></div>
              <div
                class="swiper-button-prev swiper-button-white"
                slot="button-prev"
              ></div>
            </swiper>
            <!-- swiper2 Thumbs -->
            <swiper
              class="swiper gallery-thumbs"
              :options="swiperOptionThumbs"
              ref="swiperThumbs"
            >
              <swiper-slide
                v-for="(photo, index) in product.photo"
                :key="index"
              >
                <v-card class="text-center">
                  <v-img :src="photo" contain> </v-img>
                </v-card>
              </swiper-slide>
            </swiper>
          </div>
        </v-col>
        <v-col
          :class="smAndDown ? 'colCustom-12' : ''"
          cols="12"
          sm=""
          md=""
          lg="8"
        >
          <v-card class="" outlined color="">
            <v-card-title class="text-break">
              {{ product.title }}
            </v-card-title>
            <v-row align="center" :class="smAndDown ? '' : 'grey lighten-2'">
              <v-col cols="6" lg="3">
                <v-card-subtitle>
                  Giá
                </v-card-subtitle>
              </v-col>
              <v-col cols="6" lg="9">
                <div class="red--text text-h5">
                  {{ product.price | moneyFilter }}
                </div>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="6" lg="3">
                <v-card-subtitle>
                  Số lượng
                </v-card-subtitle>
              </v-col>
              <v-col cols="3" lg="2">
                <v-text-field
                  v-model="amount"
                  type="number"
                  class="centered-input"
                  outlined
                  min="1"
                  :max="product.stockQuantity"
                  :hint="`Kho: ${product.stockQuantity}`"
                  persistent-hint
                />
              </v-col>
            </v-row>
            <v-row align="center">
              <v-card-subtitle class="ml-3">
                <v-btn
                  class="grey lighten-2"
                  @click.stop="addProduct(product, parseInt(amount))"
                >
                  Thêm vào giỏ hàng
                  <v-icon small color="black">mdi-cart</v-icon>
                </v-btn>
              </v-card-subtitle>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <!-- products suggestions-->
      <v-row class="mt-5">
        <v-btn :class="smAndDown ? 'ml-2' : ''" text disabled
          >SẢN PHẨM THƯỜNG ĐƯỢC XEM CÙNG</v-btn
        >
        <v-col cols="12" :class="smAndDown ? 'colCustom-12' : ''">
          <swiper class="swiper" :options="swiperOption">
            <!-- swiper-slide -->
            <swiper-slide v-for="(product, index) in products" :key="index">
              <!-- hover-card -->
              <vs-card actionable>
                <v-card
                  class="text-center"
                  outlined
                  @click="checkRoute(product.slug)"
                >
                  <v-img :src="product.photo[0]" contain> </v-img>
                  <v-card class="rounded-xl" width="100%" outlined color="">
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
                            @click.stop="addProduct(product, 1)"
                          >
                            <v-icon small color="white">mdi-cart</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-card>
              </vs-card>
            </swiper-slide>
            <div
              class="swiper-pagination swiper-pagination"
              slot="pagination"
            ></div>
            <!-- <div
                class="swiper-button-prev swiper-button-black"
                slot="button-prev"
              ></div>
              <div
                class="swiper-button-next swiper-button-black"
                slot="button-next"
              ></div> -->
          </swiper>
        </v-col>
      </v-row>

      <v-row class="mt-5">
        <v-btn :class="smAndDown ? 'ml-2' : ''" text disabled
          >MÔ TẢ SẢN PHẨM</v-btn
        >
        <v-col cols="12" :class="smAndDown ? 'colCustom-12' : ''">
          <v-card elevation="0" width="100%" class="mx-auto">
            <v-textarea
              v-model="product.description"
              auto-grow
              filled
              readonly
            ></v-textarea>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  async asyncData({ $axios, params }) {
    let response = await $axios.$get(`/api/product/${params.slug}`);
    return {
      product: response.product,
      products: response.products
    };
  },
  components: {
    Swiper,
    SwiperSlide
  },
  filters: {
    moneyFilter: function(money = 0) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(money);
    }
  },
  data() {
    return {
      smAndDown: this.$vuetify.breakpoint.smAndDown,
      amount: 1,
      swiperOption: {
        slidesPerView: this.$vuetify.breakpoint.smAndDown ? 2 : 4,
        slidesPerColumn: 1,
        spaceBetween: 20,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOptionTop: {
        loop: false,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOptionThumbs: {
        loop: false,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },
  methods: {
    ...mapActions(["addProductToCart"]),
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
      if (event < 1) event = 1;
      if (event > stockQuantity) event = stockQuantity;
      let quantity = parseInt(event);
      this.$store.commit("changeQuantity", { product, quantity });
    },
    checkRoute(slug, event) {
      this.$router.push(`/product/${slug}`);
    },
    addProduct(product, amount) {
      let prod = this.getCart.find(prod => prod._id === product._id);
      if (prod === undefined) {
        if (amount <= this.product.stockQuantity) {
          this.addProductToCart({ product, amount }) &&
            this.$vs.notify({
              title: "Đã thêm",
              text: product.title,
              color: "teal"
            });
        } else {
          this.$vs.notify({
            title: "Lỗi",
            text: "Kho hàng của sản phẩm không đủ",
            color: "danger"
          });
        }
      } else if (prod.quantity + amount <= prod.stockQuantity) {
        this.addProductToCart({ product, amount }) &&
          this.$vs.notify({
            title: "Đã thêm",
            text: product.title,
            color: "teal"
          });
      } else {
        this.$vs.notify({
          title: "Lỗi",
          text: "Kho hàng của sản phẩm không đủ",
          color: "danger"
        });
      }
    }
  },
  computed: {
    ...mapGetters(["getCart", "getTotal", "getCartLength", "getTotalSave"])
  },
  head() {
    return {
      title: this.product.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  }
};
</script>

<style scoped>
.colCustom-12 {
  margin-left: 12px;
}
.row {
  width: 100%;
}
.centered-input >>> input {
  text-align: center;
}
.item-title {
  line-height: 1.5em;
  height: 4em;
  overflow: hidden;
  padding: 0.8rem;
}

.item-title::before {
  content: "...";
  float: right;
  margin-top: 1.5em;
}
.theme--light.v-sheet--outlined {
  border: none !important;
}
.theme--light.v-btn.v-btn--disabled {
  color: black !important;
}
</style>
<style lang="scss" scoped>
.thumb-example {
  background-color: #fff;
}

.swiper {
  &.gallery-top {
    height: 80%;
    width: 100%;
  }
  &.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 0;
  }
  &.gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  &.gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
}
</style>
