<template lang="pug">
  .events-page
    event.events-page__item(:data="ev1")
    event.events-page__item(:data="ev2")
</template>

<script>
import Event from '@/components/blocks/Event.vue';

export default {
  name: 'Events',
  components: {
    Event,
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
