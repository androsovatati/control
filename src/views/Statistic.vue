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
import "@/lib/here-data.js";
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Statistic',
  components: {
    BaseButton: Button,
  },
  computed: {
    ...mapGetters(['contracts']),
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
    ppi: pixelRatio === 1 ? undefined : 320
    });
    const map = new H.Map(this.$refs.map,
    defaultLayers.normal.basenight, {pixelRatio: pixelRatio});
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // this.$refs.map.addEventListener('DOMNodeInserted', () => {
    //   clearTimeout(this.$options.timer);
    //   this.$options.timer = setTimeout(() => {
    //     this.isLoading = false;
    //   }, 100);
    // });

    // map.setCenter({ lat: 55.75370903771494, lng: 37.619813382625585 });
    // map.setZoom(10);

    console.log(H);

    const heatmapProvider = new H.data.heatmap.Provider({
        colors: new H.data.heatmap.Colors({
        '0': 'blue',
        '0.5': 'yellow',
        '1': 'red'
        }, true),
        assumeValues: true
    });

    const markers = [];
    this.contracts.forEach(contract => {
        markers.push(
          new H.map.Marker(
            {
              lat: parseFloat(contract.latitude),
              lng: parseFloat(contract.longitude)
            }
          )
        );
    });

    heatmapProvider.addData(markers);

    const heatmapLayer = new H.map.layer.TileLayer(heatmapProvider, {
      opacity: 0.6
      });
    map.addLayer(heatmapLayer);

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

