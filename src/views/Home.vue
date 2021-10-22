<template>
  <div>
    <v-toolbar dense color="#F0F7FF" dark extended extension-height="235" flat>
      <v-toolbar-title class="mx-auto" slot="extension">
        <v-layout row>
          <v-flex wrap xs12 sm6>
            <div class="text-jumbotron">
              <h3 class="header">Inskuship</h3>
              <p class="paragraph">
                Tool gratis untuk memudahkan bisnis <br />
                online anda
              </p>
            </div>
          </v-flex>
          <v-flex wrap xs12 sm6>
            <img
              class="mr-3"
              alt="orderinaja"
              src="../assets/img/1.webp"
              width="400"
            />
          </v-flex>
        </v-layout>
      </v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-layout row>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12 sm6 md6 lg4 v-for="item in links" :key="item.id">
              <v-card class="homes">
                <v-img aspect-ratio="1.75" :src="`${item.url}`" alt="inskuship">
                </v-img>
                <v-card-title primary-title class="card-title">
                  <div>
                    <p class="mb-1 text-card">{{ item.title }}</p>
                    <div class="text-cards">
                      {{ item.description }}
                    </div>
                  </div>
                </v-card-title>

                <router-link class="link-router" :to="item.routeUrl">
                  <v-btn depressed class="btn-find"> Find More </v-btn>
                </router-link>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          id: "1",
          url: require("../assets/img/4.webp"),
          alt: "sku",
          title: "SKU (Stock Keeping Unit)",
          description:
            "Buat SKU (Stock Keeping Units) untuk semua varian produk Anda dengan generator SKU.",
          routeUrl: "/sku",
        },
        {
          id: "2",
          url: require("../assets/img/3.webp"),
          alt: "shipping",
          title: "Shipping",
          description:
            "Tool gratis untuk membuat label pengiriman bаrаng dari реnjuаl kе alamat реmbеlі atau customer",
          routeUrl: "/shipping",
        },
        {
          id: "3",
          url: require("../assets/img/2.webp"),
          alt: "invoice",
          title: "Invoice",
          description:
            "Bukti dari transaksi pembelian yang berisi item dan jumlah pembayaran yang harus dibayar",
          routeUrl: "/invoice",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import "../styles/home.scss";
</style>
