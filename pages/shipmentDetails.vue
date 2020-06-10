<template>
  <div>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="6">
        <v-card
          elevation="0"
          max-width="1450"
          class="mx-auto"
          style="border-radius: 50px"
        >
          <v-card-title>
            Shipment Details
          </v-card-title>

          <v-row justify="center" align="center">
            <v-col cols="5">
              <v-text-field label="Name" v-model="name" outlined></v-text-field>
            </v-col>
            <v-col cols="7">
              <v-text-field
                label="Phone Number"
                v-model="phoneNumber"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="12">
              <v-text-field
                label="Adress"
                v-model="adress"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="6">
              <v-select
                :items="cities"
                item-text="name"
                v-model="city"
                label="City"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-select label="District" :items="district" outlined></v-select>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
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
      adress: "",
      city: null,
      district: null
    };
  },
  watch: {
    async city() {
      let response = await this.$axios.$get(`/api/address/${this.city}`);
      this.district = response.district
    }
  }
};
</script>

<style scoped></style>
