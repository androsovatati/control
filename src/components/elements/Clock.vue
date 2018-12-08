<template lang="pug">
    .clock
        .clock__hours {{ hours }}
        .clock__divider :
        .clock__minutes {{ minutes }}
        .clock__timezone МСК
</template>

<script>
const getZeroPad = n => (parseInt(n, 10) >= 10 ? "" : "0") + n;

export default {
  name: "Clock",
  data() {
    return {
      hours: 0,
      minutes: 0
    };
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      this.hours = getZeroPad(now.getHours());
      this.minutes = getZeroPad(now.getMinutes());
    }
  },
  created() {
    this.updateDateTime();
    this.$options.interval = setInterval(this.updateDateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.$options.interval);
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.clock {
    display: flex;
    align-items: center;
    height: 26px;
    margin-left: 0;
    margin-right: auto;
    font-size: 26px;

    &__timezone {
        margin-left: 8px;
        align-self: flex-end;
        color: $light-gray;
        font-size: 12px;
    }
}
</style>
