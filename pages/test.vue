<template>
  <v-container class="trangchu" fluid>
    <div class="">
      <svg class="intro go" viewBox="0 0 200 86">
        <text
          text-anchor="start"
          x="30"
          y="30"
          class="text text-stroke"
          clip-path="url(#text1)"
        >
          The
        </text>
        <text
          text-anchor="start"
          x="30"
          y="50"
          class="text text-stroke"
          clip-path="url(#text2)"
        >
          Face
        </text>
        <text
          text-anchor="start"
          x="30"
          y="70"
          class="text text-stroke"
          clip-path="url(#text3)"
        >
          Shop
        </text>
        <text
          text-anchor="start"
          x="30"
          y="30"
          class="text text-stroke text-stroke-2"
          clip-path="url(#text1)"
        >
          The
        </text>
        <text
          text-anchor="start"
          x="30"
          y="50"
          class="text text-stroke text-stroke-2"
          clip-path="url(#text2)"
        >
          Face
        </text>
        <text
          text-anchor="start"
          x="30"
          y="70"
          class="text text-stroke text-stroke-2"
          clip-path="url(#text3)"
        >
          Shop
        </text>
        <defs>
          <clipPath id="text1">
            <text text-anchor="start" x="30" y="30" class="text">The</text>
          </clipPath>
          <clipPath id="text2">
            <text text-anchor="start" x="30" y="50" class="text">Face</text>
          </clipPath>
          <clipPath id="text3">
            <text text-anchor="start" x="30" y="70" class="text">Shop</text>
          </clipPath>
        </defs>
      </svg>
    </div>
    <div
      class="test animate__animated animate__bounceInDown animate__slower animate__delay-2s"
    >
      <kinesis-container>
        <kinesis-element :strength="10">
          <v-btn x-large text to="/" color="black" style="font-size: 2rem">
            <v-icon left>mdi-home</v-icon>
            Trang Chủ</v-btn
          >
        </kinesis-element>
      </kinesis-container>
    </div>

    <div
      class="test2 animate__animated animate__bounceInUp animate__slower animate__delay-2s"
    >
      <kinesis-container>
        <kinesis-element :strength="10">
          <v-btn
            @click="drawer = !drawer"
            class="custom"
            x-large
            text
            color="black"
            style="font-size: 2rem"
          >
            <v-icon left style="font-size:1rem"
              >mdi-format-list-bulleted-square</v-icon
            >
            Danh Mục</v-btn
          >
        </kinesis-element>
      </kinesis-container>
    </div>

    <v-navigation-drawer v-model="drawer" temporary app right>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTemrUGDUV8rIC3SJuxQJfpJ9QJi9zzaxm80UX3yd1G4m6YrXGB&usqp=CAU"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Danh Mục</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in categories" :key="item.type" link>
          <v-list-item-content @click="link(item.slug)">
            <v-list-item-title>{{ item.type }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    let response = await $axios.$get("/api/categories");
    return {
      categories: response.categories
    };
  },
  layout: "none2",
  data() {
    return {
      drawer: false
    };
  }
};
</script>

<style scoped lang="scss">
.mdi:before {
  font-size: 1rem;
}
.trangchu {
  height: 100vh;
  padding: 0;
  margin: 0;
  background: linear-gradient(135deg, #bed2db, #ffffff);
}

.test {
  position: absolute;
  top: 30%;
  left: 60%;
}
.test2 {
  position: absolute;
  top: 60%;
  left: 60%;
}
svg.intro {
  // background: linear-gradient(135deg, #BED2DB, #ffffff);
  // max-width: 800px;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // box-shadow: 0 30px 50px -20px rgb(46, 6, 66);

  .text {
    display: none;
  }
  &.go {
    .text {
      font-family: Arial, sans-serif;
      font-size: 20px;
      text-transform: uppercase;
      display: block;
    }
    .text-stroke {
      fill: none;
      stroke: #2375bf;
      stroke-width: 2.8px;
      stroke-dashoffset: -900;
      stroke-dasharray: 900;
      stroke-linecap: butt;
      stroke-linejoin: round;
      animation: dash 2.5s ease-in-out forwards;
    }
    .text-stroke:nth-child(2) {
      animation-delay: 0.3s;
    }
    .text-stroke:nth-child(3) {
      animation-delay: 0.9s;
    }
    .text-stroke-2 {
      stroke: #212121;
      animation-delay: 1.2s;
    }
    .text-stroke:nth-child(5) {
      animation-delay: 1.5s;
    }
    .text-stroke:nth-child(6) {
      animation-delay: 1.8s;
    }
  }
}

@keyframes dash {
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
