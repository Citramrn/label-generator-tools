<template>
  <v-app>
    <!-- sidebar menu  -->
    <v-navigation-drawer
      class="no-print"
      width="250"
      color="white"
      persistent
      :mini-variant="miniVariant"
      v-model="drawer"
      fixed
      app
    >
      <!-- toolbar menu = nama website dan burger menu-->
      <v-toolbar flat class="transparent no-print" dense>
        <v-list
          class="pa-0 mt-4"
          :class="{ 'list-border-bottom': miniVariant }"
        >
          <v-list-tile>
            <v-list-tile-content v-if="!miniVariant">
              <v-list-tile-title>
                <h2 v-text="appName" class="name-app"></h2>
              </v-list-tile-title>
            </v-list-tile-content>
            <span>
              <v-list-tile-action>
                <v-btn btn-menu icon @click.stop="miniVariant = !miniVariant">
                  <i class="fas fa-bars"></i>
                </v-btn>
              </v-list-tile-action>
            </span>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <div class="mt-4">
        <!-- list menu dashboard di sidebar -->
        <v-tooltip right :disabled="!miniVariant" class="coloring">
          <v-toolbar flat class="transparent" dense slot="activator">
            <v-list class="pa-0" :class="{ 'list-border-bottom': miniVariant }">
              <v-list-tile to="/" exact>
                <v-list-tile-action>
                  <i class="fas fa-chart-line"></i>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="icon-name"
                    >Dashboard</v-list-tile-title
                  >
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <span>Dashboard</span>
        </v-tooltip>

        <!-- list menu sku, shipping dan invoice -->
        <v-list subheader class="coloring">
          <template v-for="item in items">
            <v-tooltip right :disabled="!miniVariant" :key="item.id">
              <v-list-tile
                :key="item.icon"
                :to="item.link"
                exact
                slot="activator"
              >
                <v-list-tile-action>
                  <v-icon v-html="item.icon" class="icon-name"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <span v-text="item.title"></span>
            </v-tooltip>
          </template>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-toolbar-side-icon
      @click.stop="drawer = !drawer"
      class="hidden-lg-and-up icon-drawer no-print"
    />

    <!-- router view menu item -->
    <v-content>
      <router-view />
    </v-content>

    <v-divider class="no-print"></v-divider>
    <v-footer class="footer no-print">
      <v-spacer></v-spacer>
      <div class="text-footer">&copy; PKL UNU BLITAR 2021</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Sidebar", // => nama halaman
  data() {
    return {
      appName: "Inskuship", // String nama website
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      tabs: null,
      items: [
        {
          icon: "fas fa-box",
          title: "Shipping",
          link: "/shipping",
        },
        {
          icon: "far fa-credit-card",
          title: "SKU",
          link: "/sku",
        },
        {
          icon: "far fa-file",
          title: "Invoice",
          link: "/invoice",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.v-footer {
  padding: 30px;
  font-family: "Roboto", sans-serif !important;

  background: white !important;

  font-family: Roboto;
  font-weight: 400;
  color: #aeaeae;
}

.name-app {
  color: #6d6363;
  font-family: "Roboto", sans-serif;
}

.coloring {
  color: #c7c7c7;
  font-family: "Roboto", sans-serif;
  font-weight: 700;

  .icon-name {
    color: #c7c7c7;
  }
}

.fa-bars {
  color: #70a6e8;
  font-size: 20px;
}

.fa-chart-line {
  font-size: 20px;
  color: #c7c7c7;
}

.icon-drawer {
  font-size: 20px;
  color: #70a6e8;
}
</style>
