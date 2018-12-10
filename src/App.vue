<template lang="pug">
  #app
    sidebar.sidebar
    main-header.header
    .main
      preloader.app__preloader(v-if="isLoading" :size="50" line-bg-color="#eaeaea" line-fg-color="#b12726")
      .content(v-else)
        router-view.main__content(:contracts="contracts")
        widget.main__widgets(v-if="isShowWidget")
          employee-efficiency
</template>

<script>
import MainHeader from "@/components/blocks/Header.vue";
import Sidebar from "@/components/blocks/Sidebar.vue";
import Widget from "@/components/elements/Widget.vue";
import EmployeeEfficiency from "@/components/forms/EmployeeEfficiency.vue";
import { mapState, mapActions, mapGetters } from 'vuex';
import * as feather from 'feather-icons';
import Preloader from 'vue-simple-spinner';

export default {
  components: {
    MainHeader,
    Sidebar,
    Widget,
    EmployeeEfficiency,
    Preloader
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
      users: state => state.users,
      combinations: state => state.combinations,
    }),
    ...mapGetters(['contracts']),
    isShowWidget() {
      return this.$route.name === 'events' || this.$route.name === 'statistic'
    },
  },
  methods: {
    ...mapActions(['getUsers', 'getCombinations']),
  },
  mounted() {
    feather.replace();
  },
  async created() {
    this.isLoading = true;
    await this.getUsers();
    await this.getCombinations();
    this.isLoading = false;

    this.$options.timer = setInterval(() => {
      this.getCombinations();
      console.log(1);
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.$options.timer);
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
  grid-template-areas: "sidebar header" "sidebar main";
  color: $primary-gray;
  background: $bg-gray;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
}
.app {
  &__preloader {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
}
.sidebar {
  grid-area: sidebar;
}
.header {
  grid-area: header;
}
.content {
  display: flex;
  width: 100%;
  padding: 0 40px 40px 40px;
}
.main {
  display: flex;
  grid-area: main;
  // padding: 0 40px 40px 40px;

  &__content {
    flex-grow: 1;
  }

  &__widgets {
    flex-grow: 0;
    flex-shrink: 0;
    margin-left: 40px;
    width: 250px;
  }
}
</style>
