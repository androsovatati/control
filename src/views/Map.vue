<template lang="pug">
  .map
    .map__container#map(style="width: 100%; height: 580px;")
    .map__employees.employees
      .employee(v-for="(user, i) in users")
        .employee__avatar
          img(:src="user.avatar")
        .employee__name {{ `${user.lastName} ${user.firstName} ${user.patronymic}` }}
        .employee__marker(v-html="markers[i]")
</template>

<script>
import { mapState } from "vuex";
import "here-js-api/scripts/mapsjs-core";
import "here-js-api/scripts/mapsjs-service";
import "here-js-api/scripts/mapsjs-ui";
import "here-js-api/scripts/mapsjs-mapevents";
import "here-js-api/scripts/mapsjs-clustering";
import * as feather from "feather-icons";

export default {
  name: "Map",
  data() {
    return {
      colors: ["#23b2f4", "#c69326", "#de4241", "#75b45c", "#8215e7"]
    };
  },
  computed: {
    ...mapState({
      users: state => state.users
    }),
    markers() {
      return this.colors.map(color =>
        feather.icons["map-pin"].toSvg({ color })
      );
    }
  },
  async mounted() {
    await this.$store.dispatch("getCombinations");

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

    const markers = [];

    this.$store.state.combinations.forEach((combination, idx) => {
      const icon = feather.icons["map-pin"].toSvg({ color: this.colors[idx] });

      combination.contracts.forEach(contract => {
        markers.push(
          new H.map.Marker(
            {
              lat: parseFloat(contract.latitude),
              lng: parseFloat(contract.longitude)
            },
            {
              icon: new H.map.Icon(icon)
            }
          )
        );
      });
    });

    markers.forEach(marker => {
      map.addObject(marker);
    });
  }
};
</script>

<style lang="scss" scoped>
.map {
  display: flex;
  justify-content: space-between;

  &__container {
    flex-grow: 1;
  }

  &__employees {
    margin-left: 40px;
    width: 330px;
  }

  .employees {
    flex-shrink: 0;
    background: white;
    padding: 10px 30px;
    border-radius: 10px;
  }
}
.employee {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #dedede;
  &:last-child {
    border-bottom: none;
  }
  &__avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
    }
  }
  &__marker {
    margin-left: auto;
    margin-right: 0;
  }
}
</style>
