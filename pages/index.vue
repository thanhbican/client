<template>
  <div >
    <v-card elevation="0" max-width="1200" class="mx-auto" style="border-radius: 50px">
      <v-carousel
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </v-card>

    <v-container
      style="max-width: 1200px;"
      v-for="(category, index) in categories"
      :key="index"
    >
      <v-card class="text-center" dark color="#00B262" max-width="280" outlined>
        <v-btn text class="text-capitalize">
          {{ category._id[0].type }}
        </v-btn>
      </v-card>
      <v-skeleton-loader
        :loading="loading"
        class="mx-auto skeleton"
        max-width="1200"
        height="500"
        type="image"
      >
        <v-row>
          <v-col cols="3" class="d-flex align-stretch" style="max-height:500px">
            <v-img
              src="https://img.alicdn.com/tfs/TB1EBO.Cxn1gK0jSZKPXXXvUXXa-468-1236.png"
              aspect-ratio="1.7"
              contain
            ></v-img>
          </v-col>
          <v-col cols="9">
            <swiper class="swiper" :options="swiperOption">
              <swiper-slide
                v-for="(product, index) in category.products"
                :key="index"
              >
                <v-card class="mx-auto" max-width="344" outlined color="">
                  <v-img
                    :src="product.photo"
                    width="90%"
                    class="mx-auto"
                  ></v-img>
                  <div class="item-title text-center">{{ product.title }}</div>
                  <div class="text-center">
                    <font color="#ff1446"
                      >{{ product.price | moneyFilter }} ₫</font
                    >
                    <font color="grey" style="text-decoration: line-through"
                      >500.000 ₫</font
                    >
                  </div>
                </v-card>
              </swiper-slide>
              <div
                class="swiper-pagination swiper-pagination"
                slot="pagination"
              ></div>
              <div
                class="swiper-button-prev swiper-button-black"
                slot="button-prev"
              ></div>
              <div
                class="swiper-button-next swiper-button-black"
                slot="button-next"
              ></div>
            </swiper>
          </v-col>
        </v-row>
      </v-skeleton-loader>
    </v-container>
  </div>
</template>

<script>
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
        slidesPerColumn: 2,
        spaceBetween: 45,
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
            "https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.0-9/60067965_2685199448161975_381952038633734144_o.jpg?_nc_cat=111&_nc_sid=dd9801&_nc_ohc=0j2pi7axTaIAX8eic4d&_nc_ht=scontent.fsgn5-3.fna&oh=13f70c8aa02b28477844c33445b361d1&oe=5EFE461A"
        },
        {
          src:
            "https://reviewsmoi.com/wp-content/uploads/2019/10/anhbanner-1021x490.png"
        },
        {
          src:
            "https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/p960x960/76612207_2374984722740729_7881253971568885760_o.jpg?_nc_cat=102&_nc_sid=dd9801&_nc_ohc=pCfJ2ngzatsAX8nJXg4&_nc_ht=scontent.fsgn5-4.fna&_nc_tp=6&oh=142bf418502dad96c6e18e46aeb86fb0&oe=5EFE5762"
        },
        {
          src:
            "https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-9/97095628_3515734558441789_4490935001470205952_n.jpg?_nc_cat=105&_nc_sid=110474&_nc_ohc=bsMdT5lsUkcAX9ulHrw&_nc_ht=scontent.fsgn5-2.fna&oh=fbcae5c1c0773e6753dce1efa917a3fb&oe=5EFC25BB"
        }
      ]
    };
  },
  filters: {
    moneyFilter: function(money = 0) {
      return money.toFixed(3);
    }
  },
  mounted() {
    this.loading = false;
  },
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
.swiper {
  height: 500px;
  margin-left: auto;
  margin-right: auto;
}
.swiper-slide {
  height: 200px;
}
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
</style>
