<template lang="pug">
  #app
    sidebar.sidebar
    main-header.header
    router-view.content
</template>

<script>
import MainHeader from '@/components/blocks/Header';
import Sidebar from '@/components/blocks/Sidebar';

export default {
  components: {
    MainHeader,
    Sidebar,
  },
}
</script>


<style lang="scss">
#app {
  display: grid;
  grid-template-columns: 240px auto;
  grid-template-rows: 40px auto;
}
</style>
