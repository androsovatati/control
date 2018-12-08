<template lang="pug">
    .progress-bar
      .progress-bar__label(:style="progressPosition")
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    value: {
      type: Number,
      default: 70,
    }
  },
  computed: {
    progressPosition() {
      return `transform: translateX(-${100 - this.value}%)`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.progress-bar {
  position: relative;
  height: 20px;
  border-radius: 10px;
  background: $light-green;
  overflow: hidden;

  &__label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: $green;
    background-image: linear-gradient(135deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    background-size: 30px 30px;
    animation: stripes 3s linear infinite;
    transition: transform .3s ease;
  }

  @keyframes stripes {
    0% { background-position: 0 0 } 100% { background-position: 60px 0 }
  }
}
</style>
