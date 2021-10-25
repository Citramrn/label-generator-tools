<template>
  <component :is="component"> </component>
</template>

<script>
import Sidebar from "./layouts/Sidebar.vue";
import VueBarcode from "vue-barcode";

export default {
  name: "App",
  components: {
    Sidebar,
    barcode: VueBarcode,
  },
  computed: {
    component() {
      return Sidebar;
    },
  },
};
</script>
