<template lang="pug">
  .statistic
    .statistic__menu
      base-button.statistic__button Эффективность выездных проверок
      base-button(color="white").statistic__button Эффективность сотрудников
      base-button(color="white").statistic__button Рисковые зоны
    .statistic__chart
</template>

<script>
import Button from '@/components/controls/Button.vue';

export default {
  name: 'Statistic',
  components: {
    BaseButton: Button,
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.statistic {
  margin-top: 10px;
  &__menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__button:not(:last-child) {
    flex-grow: 1;
    margin-right: 27px;
  }
  &__chart {
    margin-top: 30px;
    padding: 25px;
    background: white;
    border-radius: 10px;
  }
}
</style>

