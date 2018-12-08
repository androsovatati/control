<template lang="pug">
    .widget
      slot
</template>

<script>
export default {
  name: "Widget",
};
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.widget {
  height: max-content;
  padding: 30px 30px;
  background: white;
  border-radius: 10px;
}
</style>
