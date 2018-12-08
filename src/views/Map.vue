<template lang="pug">
  .map
    #map(style="width: 100%; height: 550px;")
</template>

<script>
import "here-js-api/scripts/mapsjs-core";
import "here-js-api/scripts/mapsjs-service";
import "here-js-api/scripts/mapsjs-ui";
import "here-js-api/scripts/mapsjs-mapevents";
import "here-js-api/scripts/mapsjs-clustering";

export default {
  name: "Map",
  created() {},
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
      lg: 'RUS',
    });

    const map = new H.Map(
      document.getElementById("map"),
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
};
</script>

<style lang="scss" scoped>
</style>

