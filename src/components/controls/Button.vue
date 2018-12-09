<template lang="pug">
    .button-container(@click="$emit('click')")
        .button-shadow(v-if="color === 'red'" :class="{ 'button-shadow_small': size === 'small'}")
        .button(:class="buttonClass")
            slot
</template>

<script>
export default {
  name: "Button",
  props: {
    color: {
      type: "red" | "white" | "gray",
      default: "red"
    },
    size: {
      type: "medium" | "small",
      default: "medium"
    }
  },
  computed: {
    buttonClass() {
      return {
        button_red: this.color === "red",
        button_white: this.color === "white",
        button_gray: this.color === "gray",
        button_small: this.size === "small"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.button-container {
  position: relative;
  font-size: 12px;
  z-index: 1;

  .button-shadow::before {
    content: "";
    position: absolute;
    top: 10px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.3);
    filter: blur(15px);
    z-index: -1;
    pointer-events: none;
  }

  .button-shadow_small::before {
    top: 10px;
    left: -3px;
    right: -3px;
    bottom: -5px;
    border-radius: 14px;
  }

  &:hover {
    .button-shadow::before {
      background: rgba($color: #e04342, $alpha: 0.3);
    }
  }
}

.button {
  position: relative;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  border-radius: 23px;
  line-height: 45px;
  text-align: center;
  cursor: pointer;

  &_white {
    background: white;
    &:hover {
        background: darken(white, 4%);
    }
  }

  &_gray {
    background: #e1e1e1;
    &:hover {
        background: lighten(#e1e1e1, 4%);
    }
  }

  &_red {
    position: relative;
    color: white;
    background-color: $dark-red;
    background-image: $red-gradient;

    &:hover {
      background-image: $red-gradient-reverse;
    }
  }

  &_small {
    padding: 0 20px;
    border-radius: 14px;
    line-height: 28px;
  }
}
</style>
