<template>
  <div class="main">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="6" lg="6" class="d-flex align-center">
          <v-btn
            style="font-size: 2rem; letter-spacing: 0.5px;"
            text
            color="#342868"
          >
            The Face Shop
          </v-btn>
        </v-col>
        <v-col cols="12" sm="3" md="3" lg="3" class="d-flex align-center">
          <v-text-field
            class="inputSearch mt-6"
            outlined
            placeholder="Search"
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="6" sm="1" md="1" lg="1" class="d-flex align-center">
          <v-btn text color="#342868">
            <v-icon large>mdi-shopping-outline</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="5" sm="1" md="1" lg="1" class="d-flex align-center">
          <v-btn text color="#342868">
            <v-icon large>mdi-widgets</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row style="height: 100px">
        <v-col cols="6" sm="4" md="4" lg="4" class="d-flex align-center ml-4">
          <div
            style="width: 100%; color: #473889; font-weight: bold;"
            class="text-h6 text-sm-h4 text-md-h3 text-lg-h2"
          >
            Best Sellers
          </div>
        </v-col>
        <v-col cols="5" sm="2" md="2" lg="2" class="d-flex align-center">
          <v-btn text color="#342868">
            <v-icon
              class="rounded-circle"
              style=" background-color: #fff; padding:10px"
              >filter_list</v-icon
            >
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="n in 5" :key="n">
              <v-card class="mx-auto rounded-xl " max-width="400" outlined>
                <v-img
                  src="https://res.cloudinary.com/s4md/image/upload/v1591352118/amazon/phqbsvgobcevtlsgjw51.jpg"
                  height="400px"
                ></v-img>
                <v-card class="rounded-xl ma-2" outlined color="#776FC4">
                  <v-card-title class="white--text text-h4 ml-5 mt-5">
                    Face Mask
                  </v-card-title>
                  <v-card-subtitle
                    style="color:#CCC7FF"
                    class="text-subtitle-1 ml-5"
                  >
                    Grape Fruit
                  </v-card-subtitle>
                  <v-card-text class="ml-5">
                    <div class="d-flex justify-space-between align-center">
                      <div class="text-subtitle-1 white--text">
                        $16,000
                      </div>
                      <div class="mr-5">
                        <v-btn
                          color="#574B97"
                          class="rounded-circle"
                          height="64"
                          width="64"
                          @click="addProduct(product)"
                        >
                          <v-icon large color="white ">add</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-card>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "swiper-example-centered-slides",
  title: "Centered slides",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  layout: "none",
  mounted() {
    console.log(this.$vuetify.breakpoint);
  }
};
</script>

<style scoped>
.main {
  height: 100%;
  background: linear-gradient(80deg, #e5f8ff 50%, #fff 80%);
  border-radius: 2%;
  margin: 15px;
}
.inputSearch >>> .v-input__slot {
  color: #342868;
  background-color: #fff;
  border-radius: 20px;
}
.inputSearch >>> input {
  color: #473889;
  font-weight: bold;
  font-size: 1.5rem;
}
.inputSearch >>> input::placeholder {
  color: #473889;
}
.inputSearch >>> .v-text-field__details {
  height: 0px !important;
  margin-bottom: 0;
}
.inputSearch >>> .mdi:before {
  color: #473889;
  font-size: 2rem !important;
}
.title {
  color: #473889;
  font-size: 5rem !important;
}
</style>
