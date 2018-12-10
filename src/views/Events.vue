<template lang="pug">
  .events-page
    event.events-page__item(v-for="contract in contracts" :data="contract")
    //- event.events-page__item(v-for="comb in combinations[0].contracts" :data="comb")
</template>

<script>
import Event from '@/components/blocks/Event.vue';

export default {
  name: 'Events',
  components: {
    Event,
  },
  props: {
    contracts: {
      type: Array,
    }
  },
  data() {
    return {
      ev1: {
        isValid: false,
      },
      ev2: {
        isValid: true,
      },
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.events-page {
  &__item:not(:first-child) {
    margin-top: 20px;
  }
}
</style>
