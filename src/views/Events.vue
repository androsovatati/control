<template lang="pug">
  .events-page
    event.events-page__item(v-for="event in events" :event="event")
</template>

<script>
import Event from "@/components/blocks/Event.vue";

export default {
  name: "Events",
  components: {
    Event
  },
  computed: {
    events() {
      return this.$store.state.events.sort(
        (first, second) => second.timestamp - first.timestamp
      );
    }
  },
  data() {
    return {
      ev1: {
        isValid: false
      },
      ev2: {
        isValid: true
      }
    };
  },
  async mounted() {
    await this.$store.dispatch("getEvents");
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.events-page {
  &__item:not(:first-child) {
    margin-top: 20px;
  }
}
</style>
