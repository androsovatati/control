<template lang="pug">
  #app
    sidebar.sidebar
    main-header.header
    router-view.content
</template>

<script>
import MainHeader from "@/components/blocks/Header.vue";
import Sidebar from "@/components/blocks/Sidebar.vue";
import * as feather from 'feather-icons';

export default {
  components: {
    MainHeader,
    Sidebar
  },
  mounted() {
    feather.replace();
  }
};
</script>

<style lang="scss">
@import 'reset-css';
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
@import '@/styles/colors.scss';

#app {
  display: grid;
  grid-template-columns: 240px auto;
  grid-template-rows: 80px auto;
  grid-template-areas: "sidebar header" "sidebar content";
  color: $primary-gray;
  background: $bg-gray;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
}
.sidebar {
  grid-area: sidebar;
}
.header {
  grid-area: header;
}
.content {
  grid-area: content;
}
</style>
