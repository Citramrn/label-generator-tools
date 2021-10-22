<template>
  <component :is="component"> </component>
</template>

<script>
import Sidebar from "./layouts/Sidebar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
  },
  computed: {
    component() {
      return Sidebar;
    },
  },
};
</script>
