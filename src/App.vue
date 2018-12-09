<template lang="pug">
  #app
    sidebar.sidebar
    main-header.header
    .main
      router-view.main__content
      widget.main__widgets(v-if="isShowWidget")
        employee-efficiency
</template>

<script>
import MainHeader from "@/components/blocks/Header.vue";
import Sidebar from "@/components/blocks/Sidebar.vue";
import Widget from "@/components/elements/Widget.vue";
import EmployeeEfficiency from "@/components/forms/EmployeeEfficiency.vue";
import { mapState, mapActions } from 'vuex';
import * as feather from 'feather-icons';

export default {
  components: {
    MainHeader,
    Sidebar,
    Widget,
    EmployeeEfficiency
  },
  computed: {
    ...mapState({
      users: state => state.users,
    }),
    isShowWidget() {
      return this.$route.name === 'events' || this.$route.name === 'statistic'
    },
  },
  methods: {
    ...mapActions(['getUsers']),
  },
  mounted() {
    feather.replace();
  },
  async created() {
    await this.getUsers();
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
.sidebar {
  grid-area: sidebar;
}
.header {
  grid-area: header;
}
.main {
  display: flex;
  grid-area: main;
  padding: 0 40px 40px 40px;

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
