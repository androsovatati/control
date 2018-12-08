<template lang="pug">
  .sidebar
    router-link.sidebar__logo(to="events")
    .sidebar__menu.sidebar-menu
      router-link.sidebar-menu__item.menu-item(
        to="events"
        :class="getLinkClass('events')"
      )
        i.menu-item__logo(data-feather="clipboard")
        .menu-item__text События
        .menu-item__notice 35
      router-link.sidebar-menu__item.menu-item(
        to="contracts"
        :class="getLinkClass('contracts')"
      )
        i.menu-item__logo(data-feather="file")
        .menu-item__text Контракты
        .menu-item__notice
      router-link.sidebar-menu__item.menu-item(
        to="map"
        :class="getLinkClass('map')"
      )
        i.menu-item__logo(data-feather="map")
        .menu-item__text Карта
        .menu-item__notice
      router-link.sidebar-menu__item.menu-item(
        to="statistic"
        :class="getLinkClass('statistic')"
      )
        i.menu-item__logo(data-feather="bar-chart")
        .menu-item__text Статистика
        .menu-item__notice
      router-link.sidebar-menu__item.menu-item(
        to="messages"
        :class="getLinkClass('messages')"
        disabled
      )
        i.menu-item__logo(data-feather="mail")
        .menu-item__text Сообщения
        .menu-item__notice
      router-link.sidebar-menu__item.menu-item(
        to="tasks"
        :class="getLinkClass('tasks')"
        disabled
      )
        i.menu-item__logo(data-feather="server")
        .menu-item__text Задачи
        .menu-item__notice
</template>

<script>
export default {
  name: "Sidebar",
  components: {
  },
  data() {
    return {
      disabledItems: ["messages", "tasks"]
    };
  },
  computed: {
    activeItem() {
      return this.$route.name;
    }
  },
  methods: {
    getLinkClass(name) {
      return {
        "menu-item_active": this.activeItem === name,
        "menu-item_disabled": this.disabledItems.includes(name)
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.sidebar {
  background: white;
  &__logo {
    display: block;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #dedede;
    background-image: url("~@/assets/logo.png");
    background-position: 30px 15px;
    background-repeat: no-repeat;
  }
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 15px 30px;
  color: $primary-gray;
  text-decoration: none;
  transition: color .2s ease, font-weight .2s ease;

  &:first-child {
    margin-top: 10px;
  }

  &:hover:not([disabled]) {
    color: $red;
    font-weight: 500;
  }

  &_active {
    font-weight: 500;

    .menu-item__logo {
      color: $red;
    }
  }

  &_disabled {
    color: $disabled-gray;
    cursor: default;
  }

  &__logo {
    width: 16px;
    height: 16px;
    margin-right: 11px;
  }

  &__text {
    margin-right: 10px;
  }

  &__notice {
    padding: 0 7px;
    color: white;
    background: $blue;
    border-radius: 7px;
    font-size: 10px;
    line-height: 14px;
  }
}
</style>
