<template lang="pug">
  .statistic
    .statistic__menu
      base-button(color="white").statistic__button Эффективность выездных проверок
      base-button(color="white").statistic__button Эффективность сотрудников
      base-button.statistic__button Рисковые зоны
    .statistic__map(ref="map")
</template>

<script>
import Button from '@/components/controls/Button.vue';
import "here-js-api/scripts/mapsjs-core";
import "here-js-api/scripts/mapsjs-service";
import "here-js-api/scripts/mapsjs-ui";
import "here-js-api/scripts/mapsjs-mapevents";
import "here-js-api/scripts/mapsjs-clustering";
import "here-js-api/styles/mapsjs-ui.css";

export default {
  name: 'Statistic',
  components: {
    BaseButton: Button,
  },
  mounted() {
    const platform = new H.service.Platform({
      app_id: "WrRxwrtpbzvxLHrOpHyw",
      app_code: "piJRCl5pH_GmE9birwhupg",
      ml: "rus",
      useHTTPS: true
    });

    const pixelRatio = window.devicePixelRatio || 1;
    const defaultLayers = platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320,
      lg: "RUS"
    });

    this.$refs.map.addEventListener('DOMNodeInserted', () => {
      clearTimeout(this.$options.timer);
      this.$options.timer = setTimeout(() => {
        this.isLoading = false;
      }, 100);
    });

    const map = new H.Map(
      this.$refs.map,
      defaultLayers.normal.map,
      {
        center: new H.geo.Point(55.75370903771494, 37.619813382625585),
        zoom: 6,
        pixelRatio: pixelRatio
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    map.setCenter({ lat: 55.75370903771494, lng: 37.619813382625585 });
    map.setZoom(10);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.statistic {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  &__menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__button:not(:last-child) {
    flex-grow: 1;
    margin-right: 27px;
  }
  &__map{
    margin-top: 30px;
    height: 100%;
  }
}
</style>

