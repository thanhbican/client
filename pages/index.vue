<template>
  <div>
    <v-card
      elevation="0"
      max-width="1050"
      class="mx-auto"
    >
      <v-skeleton-loader
        :loading="loading"
        class="skeletonMain mx-auto"
        max-width="1050"
        height="400"
        type="image"
      >
        <v-carousel
          height="409"
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          delimiter-icon="mdi-minus"
          interval="3000"
          progress-color="#EB7400"
          class="carousel"
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-skeleton-loader>
    </v-card>

    <v-container
      style="max-width: 1050px;"
      v-for="(category, index) in categories"
      :key="index"
    >
      <v-skeleton-loader
        :loading="loading"
        class="mx-auto skeleton"
        max-width="1050"
        height="600"
        type="image"
      >
        <v-card
          class="text-center rounded-xl"
          color="grey darken-4"
          max-width="200"
          outlined
        >
          <!-- type -->
          <v-btn
            text
            class="text-capitalize text-subtitle-2 white--text"
            :to="`/categories/${category._id[0].slug}`"
          >
            {{ category._id[0].type }}
          </v-btn>
        </v-card>

        <v-row>
          <!-- <v-col cols="3" class="d-flex align-stretch" style="max-height:600px">
            <v-img
              src="https://img.alicdn.com/tfs/TB1EBO.Cxn1gK0jSZKPXXXvUXXa-468-1236.png"
              aspect-ratio="1.7"
              style="border-radius: 25px"
            ></v-img>
          </v-col> -->
          <!-- col-12 -->
          <v-col cols="12">
            <swiper class="swiper" :options="swiperOption">
              <!-- swiper-slide -->
              <swiper-slide
                v-for="(product, index) in category.products.slice(0, 6)"
                :key="index"
              >
                <!-- hover-card -->
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
                              @click.stop="addProduct(product)"
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
      </v-skeleton-loader>
    </v-container>
  </div>
</template>
// script/////////////////////////////////////////////////////////
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  async asyncData({ $axios }) {
    try {
      const responses = await $axios.$get("/api/productOfCategory");
      return {
        categories: responses.products
      };
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      //skeleton
      loading: true,
      //swiper
      swiperOption: {
        slidesPerView: 4,
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
      items: [
        {
          src:
            "http://image.ethefaceshop.com/tfsshopWebSrc/upload/banner//202006/banner_20200616130371846.jpg"
        },
        {
          src:
            "http://image.ethefaceshop.com/tfsshopWebSrc/upload/banner//202006/banner_20200604122032400.jpg"
        },
        {
          src:
            "http://image.ethefaceshop.com/tfsshopWebSrc/upload/banner//202006/banner_20200604122094117.jpg"
        },
        {
          src:
            "http://image.ethefaceshop.com/tfsshopWebSrc/upload/banner//202006/banner_20200616130443211.jpg"
        }
      ]
    };
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
    this.loading = false;
  },
  methods: {
    ...mapActions(["addProductToCart"]),
    checkRoute(id, event) {
        this.$router.push(`/product/${id}`);
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
    }
  },
  computed: {
    ...mapGetters(["getCart"])
  }
};
</script>

<style scoped>
/* .rowSearch {
  border: 2px solid #ff1446;
  height: 40px;
}
.inputSearch {
  height: 40px;
  border-radius: 0;
}
.inputSearch >>> .v-text-field__slot input::placeholder {
  color: #66666b;
}
.inputSearch >>> .v-input__control {
  min-height: 36px;
}
.v-input--is-focused >>> .v-text-field__slot input::placeholder {
  color: #999;
}
.btnSearch {
  border-radius: 0;
  border: 0px solid #ff1446;
}
.myCustomCard >>> .v-responsive__content{
  border-radius: 250px;
} */
/* .myCustomCard::before {
  content: "";
  background-color: #e8e8e8;
  right: 1200px;
  height: 500px;
  width: 100%;
  position: absolute;
}
.myCustomCard::after {
  content: "";
  background-color: #e8e8e8;
  left: 1200px;
  height: 500px;
  bottom: 0px;
  width: 100%;
  position: absolute;
} */

/* .swiper-pagination{
  position: static;
} */
/* item */
.item-title {
  padding: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.cardCustom >>> .vs-card--content {
  font-size: 0.8rem;
  margin-bottom: 0px;
}
.carousel >>> .v-image__image.v-image__image--cover {
  background-size: contain;
}
.theme--light.v-sheet--outlined {
  border: none !important;
}
</style>
