<template lang="pug">
  .events-page
    event
</template>

<script>
import Event from '@/components/blocks/Event.vue';

export default {
  name: 'Events',
  components: {
    Event,
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.events-page {
}
</style>
