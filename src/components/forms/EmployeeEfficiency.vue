<template lang="pug">
    .efficiency
      .efficiency__title Активность сотрудников
      progress-bar.efficiency__progress(:value="value")
      .efficiency__value {{ this.value }} %
</template>

<script>
import ProgressBar from '@/components/elements/ProgressBar.vue';

export default {
  name: "EmployeeEfficiency",
  components: {
    ProgressBar,
  },
  props: {
    value: {
      type: Number,
      default: 70,
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.efficiency {
  position: relative;
  z-index: 1;
  &__title {
    text-align: center;
    padding-bottom: 10px;
  }
  &__value {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 30px;
    margin: 30px auto 0;
    color: white;
    background-color: $blue;
    background-image: $blue-gradient;
    border-radius: 10px;
    font-weight: 700;
    &::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      border-bottom: 15px solid #4bacf7;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      width: 0;
      height: 0;
      transform: translateX(-50%);
      z-index: -1;
    }
  }
}
</style>
